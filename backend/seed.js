require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();
  
  try {
    // Clear existing data
    await Profile.deleteMany();
    await Skill.deleteMany();
    await Project.deleteMany();

    // 1. Profile Data
    const profileData = {
      name: 'Shriram Patil',
      title: 'Java Backend Developer | Full-Stack Learner',
      bio: 'I am a Computer Science student focused on backend development using Java technologies. Currently learning JDBC, Servlets, JSP, and Spring Boot while building full-stack projects. I enjoy solving real-world problems and improving my development skills.',
      email: 'patilshriram93@gmail.com',
      github: 'https://github.com/shriram-18',
      linkedin: 'https://linkedin.com/in/shriram-patil-87a414377',
      resumeLink: './assets/resume.pdf',
      location: 'Pune, Maharashtra, India',
      tagline: 'Building scalable backend systems and learning full-stack development.'
    };

    // 2. Skills Data
    const skillsData = [
      { name: 'HTML', icon: 'fab fa-html5', category: 'Frontend' },
      { name: 'CSS', icon: 'fab fa-css3-alt', category: 'Frontend' },
      { name: 'JavaScript', icon: 'fab fa-js', category: 'Frontend' },
      { name: 'Java', icon: 'fab fa-java', category: 'Backend' },
      { name: 'JDBC', icon: 'fas fa-database', category: 'Backend' },
      { name: 'Servlets', icon: 'fas fa-server', category: 'Backend' },
      { name: 'JSP', icon: 'fas fa-code', category: 'Backend' },
      { name: 'Spring Boot (Learning)', icon: 'fas fa-leaf', category: 'Backend' },
      { name: 'MySQL', icon: 'fas fa-database', category: 'Database' },
      { name: 'MongoDB', icon: 'fas fa-database', category: 'Database' },
      { name: 'Git', icon: 'fab fa-git-alt', category: 'Tools' },
      { name: 'Maven', icon: 'fas fa-tools', category: 'Tools' },
      { name: 'VS Code', icon: 'fas fa-code', category: 'Tools' },
      { name: 'Postman', icon: 'fas fa-paper-plane', category: 'Tools' },
      { name: 'REST APIs', icon: 'fas fa-network-wired', category: 'Concepts' },
      { name: 'MVC Architecture', icon: 'fas fa-cubes', category: 'Concepts' },
      { name: 'OOP', icon: 'fas fa-object-group', category: 'Concepts' }
    ];

    // 3. Projects Data (Only one mapped directly)
    const projectData = {
      title: 'Weather App',
      description: 'A web application that fetches real-time weather data using an external API and displays it in a user-friendly interface.\n\nFeatures:\n- Search weather by city\n- Real-time data fetching using API\n- Dynamic UI updates\n- Error handling for invalid cities',
      image: './assets/weather_app_mockup.png',
      techStack: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://winter-sepia.vercel.app/',
      githubLink: 'https://github.com/shriram-18/Advanced-Weather-Dashboard'
    };

    // Insert to DB
    await Profile.create(profileData);
    await Skill.insertMany(skillsData);
    await Project.create(projectData);

    console.log('Seed data successfully generated and inserted into MongoDB!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
