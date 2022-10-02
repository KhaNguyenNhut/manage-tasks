var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
  createdAt: { type: Date, default: new Date() },
  lastModified: { type: Date, default: new Date() },
  content: { type: String, required: true},
});

module.exports = mongoose.model('Discussion', DiscussionSchema);