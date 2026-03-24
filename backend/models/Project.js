const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  techStack: [{ type: String }],
  liveLink: { type: String },
  githubLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
