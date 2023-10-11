const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: {
    type: String,
  },
  name:{
    type:String
  },
  email:{
    type:String
  },
  clinicName:{
    type:String
  },
  password: {
    type: String,
  },
  location: {
    type: String,

  },
  mapsURL:{
    type:String,
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
