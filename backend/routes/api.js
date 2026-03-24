const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const portfolioController = require('../controllers/portfolioController');

// Public routes
router.get('/profile', portfolioController.getProfile);
router.get('/projects', portfolioController.getProjects);
router.get('/skills', portfolioController.getSkills);

// Contact message with validation
router.post('/contact', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('message').trim().notEmpty().withMessage('Message is required')
], portfolioController.submitContact);

// Admin routes
router.post('/admin/projects', portfolioController.addProject);
router.post('/admin/skills', portfolioController.addSkill);
router.post('/admin/profile', portfolioController.seedProfile);

module.exports = router;
