const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getNotificationByUser,
} = require('../controllers/NotificationsController');

router.get('/user/:id', verifyToken, getNotificationByUser);

module.exports = router;
