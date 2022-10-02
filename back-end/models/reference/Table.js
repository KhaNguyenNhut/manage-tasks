const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
  name: { type: String },
  status: { type: String, default: 'empty' },
  customerName: { type: String },
});

module.exports = mongoose.model('Table', TableSchema);
