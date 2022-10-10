var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
  assigner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  supervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
  commentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  subtask: { type: mongoose.Schema.Types.ObjectId, ref: 'SubTask' },
  message: { type: String },
  createdAt: { type: Date, default: new Date() },
  notifyType: { type: String, required: true },
  isRead: { type: Boolean, default: false },
});

module.exports = mongoose.model('Notification', NotificationSchema);
