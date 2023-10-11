const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type:String
  },
  password: {
    type: String,
  },
});
const Admin = mongoose.model('Admin', userSchema);

module.exports = Admin;
