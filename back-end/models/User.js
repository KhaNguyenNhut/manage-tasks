var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  avatar: { type: String, required: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  officerCode: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  birthday: { type: Date },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
});

module.exports = mongoose.model('User', UserSchema);
