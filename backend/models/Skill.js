const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String }, // e.g., 'fab fa-react' or a URL
  category: { type: String, default: 'Other' },
  proficiency: { type: Number, min: 0, max: 100 }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
