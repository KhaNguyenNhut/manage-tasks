const Task = require('../models/Task');
const {
  createNotification,
  getNotification,
} = require('./NotificationsController');

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

    //add notification
    const data = {
      task: task._id,
      assigner: req.body.user,
      supervisor: req.body.supervisor,
      notifyType: 'CreateTask',
    };
    const notification = await createNotification(data);

    res.status(200).json(await getNotification(notification));
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
    //add notification
    const data = {
      task: task._id,
      assigner: req.body.user,
      supervisor: req.body.supervisor,
      notifyType: 'UpdateTask',
    };
    const notification = await createNotification(data);
    res.status(200).json(await getNotification(notification));
  } catch (err) {
    console.log(err);
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

exports.updateProgress = async (req, res) => {
  try {
    const { id, progress } = req.body;
    let task = await Task.findById(id);
    if (!task) {
      res.status(400).json({ message: 'Not found task' });
    }

    task.progress = progress;

    await task.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
