const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StorageSchema = new Schema({
  ingredient: { type: ObjectId, ref: 'Ingredient' },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
  updateAt: { type: Date, default: null }
});

module.exports = mongoose.model('Storage', StorageSchema);