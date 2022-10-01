var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  name: {type: String, required: true},
  access: [{type: mongoose.Schema.Types.ObjectId, ref: 'Access'}]
});

RoleSchema.virtual('staff', {
  ref: 'Staff',
  localField: '_id',
  foreignField: 'staff',
});

RoleSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Role', RoleSchema);
