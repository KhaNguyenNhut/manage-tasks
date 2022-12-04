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

    res.status(200).json(await parseNotifications(notifications));
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

const parseNotifications = async (notifications) => {
  for (let index = 0; index < notifications.length; index++) {
    if (
      notifications[index].notifyType === 'UpdateSubtask' ||
      notifications[index].notifyType === 'CreateSubtask'
    ) {
      notifications[index].assigner = await User.findById(
        notifications[index].assigner
      );
      notifications[index].supervisor = await User.findById(
        notifications[index].supervisor
      );
      notifications[index].task = await Task.findById(
        notifications[index].task
      );
      notifications[index].subtask = await SubTask.findById(
        notifications[index].subtask
      );
    }
    if (
      notifications[index].notifyType === 'CreateTask' ||
      notifications[index].notifyType === 'UpdateTask'
    ) {
      notifications[index].assigner = await User.findById(
        notifications[index].assigner
      );
      notifications[index].supervisor = await User.findById(
        notifications[index].supervisor
      );
      notifications[index].task = await Task.findById(
        notifications[index].task
      );
    }
  }
  return notifications;
};

exports.createNotification = async (data) => {
  try {
    const notification = await Notification.create(data);
    return notification;
  } catch (err) {
    console.log(err);
  }
};

exports.getNotification = async (notification) => {
  if (
    notification.notifyType === 'UpdateSubtask' ||
    notification.notifyType === 'CreateSubtask'
  ) {
    notification.assigner = await User.findById(notification.assigner);
    notification.supervisor = await User.findById(notification.supervisor);
    notification.task = await Task.findById(notification.task);
    notification.subtask = await SubTask.findById(notification.subtask);
  }
  if (
    notification.notifyType === 'CreateTask' ||
    notification.notifyType === 'UpdateTask'
  ) {
    notification.assigner = await User.findById(notification.assigner);
    notification.supervisor = await User.findById(notification.supervisor);
    notification.task = await Task.findById(notification.task);
  }
  return notification;
};

exports.markAsRead = async (req, res) => {
  try {
    req.body.forEach(async (notifyId) => {
      await Notification.findOneAndUpdate({ _id: notifyId }, { isRead: true });
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteNotificationByTaskId = async (taskId) => {
  await Notification.deleteMany({ task: taskId });
};

exports.deleteNotificationBySubTaskId = async (subtaskId) => {
  await Notification.deleteMany({ subtask: subtaskId });
};
