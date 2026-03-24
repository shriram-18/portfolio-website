const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = isLocalhost ? 'http://localhost:5000/api' : '/api';

document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const loader = document.getElementById('loader');
    const appContent = document.getElementById('app-content');
    const themeToggle = document.getElementById('theme-toggle');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Theme Toggle Logic
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Mobile Menu Toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });

    // Header scroll background
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fetch Data
    async function fetchPortfolioData() {
        try {
            const [profileRes, projectsRes, skillsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/profile`),
                fetch(`${API_BASE_URL}/projects`),
                fetch(`${API_BASE_URL}/skills`)
            ]);

            if (!profileRes.ok || !projectsRes.ok || !skillsRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const profile = await profileRes.json();
            const projects = await projectsRes.json();
            const skills = await skillsRes.json();

            renderProfile(profile);
            renderSkills(skills);
            renderProjects(projects);

            // Hide loader, show app
            loader.style.display = 'none';
            appContent.style.display = 'block';

            // Observe sections after DOM insertion
            document.querySelectorAll('.fade-in-section').forEach(section => {
                observer.observe(section);
            });

        } catch (error) {
            console.error('Error loading portfolio:', error);
            loader.innerHTML = '<p>Error loading portfolio data. Please try again later.</p>';
        }
    }

    // Render logic
    function renderProfile(profile) {
        if (Object.keys(profile).length === 0) return;

        document.title = `${profile.name} - Portfolio`;
        document.getElementById('hero-name').textContent = profile.name;
        document.getElementById('hero-title').textContent = profile.title;
        document.getElementById('about-bio').textContent = profile.bio;
        document.getElementById('footer-name').textContent = profile.name;
        document.getElementById('nav-logo').textContent = profile.name.split(' ')[0];
        document.getElementById('year').textContent = new Date().getFullYear();

        // Social links
        const socialLinksContainer = document.getElementById('social-links');
        let socialHtml = '';
        if (profile.github) {
            socialHtml += `<a href="${profile.github}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>`;
        }
        if (profile.linkedin) {
            socialHtml += `<a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>`;
        }
        if (profile.email) {
            socialHtml += `<a href="mailto:${profile.email}"><i class="fas fa-envelope"></i></a>`;
        }
        if (profile.resumeLink) {
            socialHtml += `<a href="${profile.resumeLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size: 1rem; padding: 0.5rem 1rem;">View Resume</a>`;
        }
        socialLinksContainer.innerHTML = socialHtml;
    }

    function renderSkills(skills) {
        const skillsGrid = document.getElementById('skills-grid');
        if (skills.length === 0) {
            skillsGrid.innerHTML = '<p>No skills found.</p>';
            return;
        }

        // Group skills by category
        const categories = {};
        skills.forEach(skill => {
            const cat = skill.category || 'Other';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(skill);
        });

        let html = '';
        for (const [category, catSkills] of Object.entries(categories)) {
            html += `<div class="skill-category" style="margin-bottom: 3rem; width: 100%">
                        <h3 style="text-align: center; margin-bottom: 2rem; color: var(--primary); font-size: 1.5rem;">${category}</h3>
                        <div class="skills-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 2rem;">`;
            catSkills.forEach(skill => {
                html += `
                    <div class="skill-card">
                        <div class="skill-icon">
                            ${skill.icon && skill.icon.startsWith('fa') ? `<i class="${skill.icon}"></i>` : `<img src="${skill.icon || 'https://via.placeholder.com/50'}" alt="${skill.name}" style="width:50px">`}
                        </div>
                        <div class="skill-name">${skill.name}</div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }
        
        // Remove the default grid class so the per-category grids take over naturally
        skillsGrid.className = 'skills-categories-container'; 
        skillsGrid.innerHTML = html;
    }

    function renderProjects(projects) {
        const projectsGrid = document.getElementById('projects-grid');
        if (projects.length === 0) {
            projectsGrid.innerHTML = '<p>No projects found.</p>';
            return;
        }

        let html = '';
        projects.forEach(project => {
            const techBadges = project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('');
            
            html += `
                <div class="project-card">
                    <img src="${project.image || 'https://via.placeholder.com/400x200'}" alt="${project.title}" class="project-img">
                    <div class="project-info">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-desc">${project.description}</p>
                        <div class="tech-stack">${techBadges}</div>
                        <div class="project-links">
                            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" title="GitHub Repo"><i class="fab fa-github"></i></a>` : ''}
                            ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" title="Live Demo"><i class="fas fa-external-link-alt"></i></a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        projectsGrid.innerHTML = html;
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // UI Feedback
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        try {
            const res = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.classList.add('status-success');
                contactForm.reset();
            } else {
                throw new Error(data.message || data.errors?.[0]?.msg || 'Failed to send message');
            }
        } catch (error) {
            formStatus.textContent = error.message;
            formStatus.classList.add('status-error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        }
    });

    // Start App
    fetchPortfolioData();
});
