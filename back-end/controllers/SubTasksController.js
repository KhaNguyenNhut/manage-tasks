const SubTask = require('../models/SubTask');
const {
  createNotification,
  getNotification,
} = require('./NotificationsController');

exports.getAllSubTasks = async (req, res) => {
  try {
    const subtasks = await SubTask.find()
      .sort({ createdAt: -1 })
      .populate('user taskType supervisor');
    res.status(200).json(subtasks);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getSubTask = async (req, res) => {
  try {
    const subtask = await SubTask.findById(req.params.id).populate(
      'user taskType supervisor'
    );
    res.status(200).json(subtask);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Not found subtask' });
  }
};

exports.createSubTask = async (req, res) => {
  try {
    const subtask = await SubTask.create(req.body);

    //add notification
    const data = {
      task: req.body.task,
      subtask: subtask._id,
      assigner: req.body.user,
      supervisor: req.body.supervisor,
      notifyType: 'CreateSubtask',
    };
    const notification = await createNotification(data);

    res.status(200).json(await getNotification(notification));
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateSubTask = async (req, res) => {
  try {
    let subtask = await SubTask.findById(req.params.id);
    if (!subtask) {
      res.status(400).json({ message: 'Not found subtask' });
    }
    subtask = await SubTask.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    //add notification
    const data = {
      task: req.body.task,
      subtask: subtask._id,
      assigner: req.body.user,
      supervisor: req.body.supervisor,
      notifyType: 'UpdateSubtask',
    };
    const notification = await createNotification(data);

    res.status(200).json(await getNotification(notification));
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteSubTask = async (req, res) => {
  try {
    let subtask = await SubTask.findById(req.params.id);
    if (!subtask) {
      res.status(400).json({ message: 'Not found subtask' });
    }

    await subtask.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getSubtasksByTask = async (req, res) => {
  try {
    const subtasks = await SubTask.find({ task: req.params.id })
      .sort({ createdAt: -1 })
      .populate('user taskType supervisor');
    res.status(200).json(subtasks);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
