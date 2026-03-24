const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  github: { type: String },
  linkedin: { type: String },
  resumeLink: { type: String },
  location: { type: String },
  tagline: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
