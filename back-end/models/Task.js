var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  taskType: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskType' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topic: { type: String, required: true },
  content: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, default: 'Đang chờ thực hiện' },
  timeG: { type: Number, required: true },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: { type: String },
  progress: { type: Number, required: true },
  createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.model('Task', TaskSchema);
