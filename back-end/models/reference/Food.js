var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FoodSchema = new Schema({
  name: { type: String, required: true },
  materials: String,
  price: { type: String, required: true },
  image: String,
  description: String,
  category: { type: mongoose.Schema.ObjectId, ref: 'Category' },
  isDeleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('Food', FoodSchema);
