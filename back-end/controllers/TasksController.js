const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .sort({ createdAt: -1 })
      .populate('user taskType supervisor');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'user taskType supervisor'
    );
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Not found task' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      res.status(400).json({ message: 'Not found task' });
    }
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      res.status(400).json({ message: 'Not found task' });
    }

    await task.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getTaskByUser = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.id })
      .sort({ createdAt: -1 })
      .populate('user taskType supervisor');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
