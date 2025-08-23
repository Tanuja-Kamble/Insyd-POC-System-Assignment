const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  type: { type: String, required: true },
  sourceUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  data: Object
}, { timestamps: true });
module.exports = mongoose.model('Event', eventSchema);
