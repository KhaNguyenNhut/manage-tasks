var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StaffSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  username: { type: String, required: true},
  password: { type: String, required: true},
  createdAt: { type: Date, default: new Date() },
  ID: { type: String, required: true},
  birthday: { type: Date},
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role'}
});

module.exports = mongoose.model('Staff', StaffSchema);
