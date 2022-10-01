const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  createAt: {type: Date, default: new Date()},
  feedback: {type: String, default: ''},
  star: {type: Number, required: true},
  food: {type: ObjectId, ref: 'Food'}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
