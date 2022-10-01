const Feedback = require('../models/Feedback');

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('food').sort({ createAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getFeedbackByDishId = async (req, res) => {
  try {

    const feedbacks = await Feedback.find({food: req.params.id});
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.createFeedback = async (req, res) => {
  try {
    const data = {
      feedback: req.body.feedback,
      star: req.body.star,
      food: req.body.dishId,
    };
    const feedback = await Feedback.create(data);
    res.status(200).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteFeedback = async (req, res) => {
  try {
    let feedback = await Feedback.findById(req.params.id);
    
    if (!feedback) {
      res.status(400).json({ message: 'Not found feedback' });
    }

    await feedback.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
