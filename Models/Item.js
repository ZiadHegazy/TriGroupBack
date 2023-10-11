const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity:{
    type:Number,
  },
  category:{
    type:String
  },
  pack:{
    type:String
  },
  info:{
    type:[String]
  },
  image:{
    data: Buffer,
    contentType: String,
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
