var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  name: {type: String, required: true},
  //1. Full-Access: full quyền
  //2. Edit: Xem và chỉnh sửa
  //3. Read-Only: chỉ xem
  access: {type: String, default: "Read-Only"},
});

RoleSchema.virtual('user', {
  ref: 'User',
  localField: '_id',
  foreignField: 'user',
});

RoleSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Role', RoleSchema);
