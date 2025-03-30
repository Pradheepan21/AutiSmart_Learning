const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  age: String,
  contact: String,
  email: String,
  profilePicUrl: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);
