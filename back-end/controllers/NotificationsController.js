const Notification = require('../models/Notification');
const User = require('../models/User');
const Task = require('../models/Task');
const SubTask = require('../models/SubTask');

exports.getNotificationByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const notifications = await Notification.find({
      $or: [{ assigner: userId }, { supervisor: userId }],
    });

    notifications.forEach(async (each, index) => {
      if (
        each.notifyType === 'UpdateSubtask' ||
        each.notifyType === 'CreateSubtask'
      ) {
        notifications[index].assigner = await User.findById(each.assigner);
        notifications[index].supervisor = await User.findById(each.supervisor);
        notifications[index].task = await Task.findById(each.task);
        notifications[index].subtask = await SubTask.findById(each.subtask);
      }
      if (
        each.notifyType === 'CreateTask' ||
        each.notifyType === 'UpdateTask'
      ) {
        notifications[index].assigner = await User.findById(each.assigner);
        notifications[index].supervisor = await User.findById(each.supervisor);
        notifications[index].task = await Task.findById(each.task);
      }

      // if (each.notifyType === 'Comment') {
      //   if (notifications[index].task) {
      //     notifications[index].task = await Task.findById(each.task);
      //   }

      //   if (notifications[index].subtask) {
      //     notifications[index].subtask = await SubTask.findById(each.subtask);
      //   }
      //   notifications[index].assigner = await User.findById(each.assigner);
      //   notifications[index].supervisor = await User.findById(each.supervisor);
      // }

      if (notifications.length - 1 === index) {
        res.status(200).json(notifications);
      }
    });
    if (notifications.length === 0) {
      res.status(200).json(notifications);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

exports.createNotification = async (data) => {
  try {
    const notification = await Notification.create(data);
  } catch (err) {
    console.log(err);
  }
};
