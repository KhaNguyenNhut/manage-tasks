const Discussion = require('../models/Discussion');

exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('user');
    res.status(200).json(discussions);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ message: 'Not found discussion' });
  }
};

exports.getDiscussionByTask = async (req, res) => {
  try {
    const discussions = await Discussion.find({ task: req.params.id }).populate(
      'user'
    );
    res.status(200).json(discussions);
  } catch (err) {
    res.status(400).json({ message: 'Not found discussions' });
  }
};

exports.createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create(req.body);
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    let discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      res.status(400).json({ message: 'Not found discussion' });
    }
    discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(discussion);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    let discussion = await Discussion.findById(req.params.id);
    if (!discussion) {
      res.status(400).json({ message: 'Not found discussion' });
    }

    await discussion.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
