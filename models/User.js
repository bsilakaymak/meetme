const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  meetings: {
    type: mongoose.Types.ObjectId,
    ref: 'Meeting',
  },
});
module.exports = User = mongoose.model('User', userSchema);
