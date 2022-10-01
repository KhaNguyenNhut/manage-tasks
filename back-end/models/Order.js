var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  foods: [],
  totalPrice: Number,
  status: {type: String, default: 'Waiting for confirmation from the chef...'},
  table: { type: mongoose.Schema.ObjectId, ref: 'Table' },
  notes: String,
});

module.exports = mongoose.model('Order', OrderSchema);
