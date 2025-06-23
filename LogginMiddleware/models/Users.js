 
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileno: String,
  githubUsername: String,
  rollno: String,
  collegeName: String,
  accessCode: String,
});

module.exports = mongoose.model('User', UserSchema);
