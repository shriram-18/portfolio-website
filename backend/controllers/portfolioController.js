const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Message = require('../models/Message');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.submitContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, email, message } = req.body;
  
  try {
    // Save to database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send email via Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // or whatever service or SMTP host
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to self
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email send error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addProject = async (req, res) => {
  // Simple admin logic. For production, add JWT auth.
  const { adminkey } = req.headers;
  if (!adminkey || adminkey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { title, description, image, techStack, liveLink, githubLink } = req.body;
  try {
    const project = new Project({ title, description, image, techStack, liveLink, githubLink });
    await project.save();
    res.status(201).json({ message: 'Project added successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.addSkill = async (req, res) => {
  const { adminkey } = req.headers;
  if (!adminkey || adminkey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { name, icon, category, proficiency } = req.body;
  try {
    const skill = new Skill({ name, icon, category, proficiency });
    await skill.save();
    res.status(201).json({ message: 'Skill added successfully', skill });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.seedProfile = async (req, res) => {
  const { adminkey } = req.headers;
  if (!adminkey || adminkey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    await Profile.deleteMany({});
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ message: 'Profile seeded successfully', profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
