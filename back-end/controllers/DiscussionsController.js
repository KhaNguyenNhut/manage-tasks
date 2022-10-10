const Discussion = require('../models/Discussion');
const Task = require('../models/Task');
const SubTask = require('../models/SubTask');
const { createNotification } = require('./NotificationsController');

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

exports.getDiscussionBySubtask = async (req, res) => {
  try {
    const discussions = await Discussion.find({
      subtask: req.params.id,
    }).populate('user');
    res.status(200).json(discussions);
  } catch (err) {
    res.status(400).json({ message: 'Not found discussions' });
  }
};

exports.createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create(req.body);
    // //add notification
    // const data = {
    //   task: req.body.task,
    //   subtask: req.body.subtask,
    //   commentBy: req.body.user,
    //   notifyType: 'Comment',
    //   message: req.body.content,
    // };
    // if (req.body.task) {
    //   const task = await Task.findById(req.body.task);
    //   data.assigner = task.user;
    //   data.supervisor = task.supervisor;
    //   await createNotification(data);
    // } else {
    //   const subtask = await SubTask.findById(req.body.subtask);
    //   data.assigner = subtask.user;
    //   data.supervisor = subtask.supervisor;
    //   await createNotification(data);
    // }

    res.status(200).json(discussion);
  } catch (err) {
    console.log(err);
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
