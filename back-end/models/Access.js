var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AccessSchema = new Schema({
  name: {type: String, required: true}
});

module.exports = mongoose.model('Access', AccessSchema);
