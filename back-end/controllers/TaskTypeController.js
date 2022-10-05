const TaskType = require('../models/TaskType');

exports.getAllTaskTypes = async (req, res) => {
  try {
    const taskTypes = await TaskType.find({});
    res.status(200).json(taskTypes);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getTaskType = async (req, res) => {
  try {
    const taskType = await TaskType.findById(req.params.id);
    res.status(200).json(taskType);
  } catch (err) {
    res.status(400).json({ message: 'Not found taskType' });
  }
};

exports.createTaskType = async (req, res) => {
  try {
    const { name, access } = req.body;
    const taskType = await TaskType.create({ name, access });
    res.status(200).json(taskType);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateTaskType = async (req, res) => {
  try {
    let taskType = await TaskType.findById(req.params.id);
    if (!taskType) {
      res.status(400).json({ message: 'Not found taskType' });
    }
    taskType = await TaskType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(taskType);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteTaskType = async (req, res) => {
  try {
    let taskType = await TaskType.findById(req.params.id);
    if (!taskType) {
      res.status(400).json({ message: 'Not found taskType' });
    }

    await taskType.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
