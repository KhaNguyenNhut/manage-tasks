var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var IngredientSchema = new Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  isDeleted: {type: Boolean, default: false},
});

module.exports = mongoose.model('Ingredient', IngredientSchema);
