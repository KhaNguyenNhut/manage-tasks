var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskTypeSchema = new Schema({
  name: { type: String, required: true}
});

module.exports = mongoose.model('TaskType', TaskTypeSchema);