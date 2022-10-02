var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BillSchema = new Schema({
  foods: [],
  totalPrice: Number,
  table: { type: mongoose.Schema.ObjectId, ref: 'Table' },
  createAt: {type: Date, default: new Date() },
  createBy: {type: String, default: 'Admin'},
  updateAt: {type: Date, default: null },
  updateBy: {type: String, default: null},
});

module.exports = mongoose.model('Bill', BillSchema);
