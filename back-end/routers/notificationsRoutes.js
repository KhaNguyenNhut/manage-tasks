const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getNotificationByUser,
  markAsRead,
} = require('../controllers/NotificationsController');

router.get('/user/:id', verifyToken, getNotificationByUser);
router.post('/mark-read', verifyToken, markAsRead);

module.exports = router;
