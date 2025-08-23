const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: String,
  preferences: { inApp: { type: Boolean, default: true } }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
