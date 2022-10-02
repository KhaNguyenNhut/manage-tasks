var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
});

CategorySchema.virtual('foods', {
  ref: 'Food',
  localField: '_id',
  foreignField: 'category',
});

CategorySchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Category', CategorySchema);
