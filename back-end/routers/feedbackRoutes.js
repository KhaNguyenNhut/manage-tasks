const router = require('express').Router();

const {
  getAllFeedbacks,
  getFeedbackByDishId,
  createFeedback,
  deleteFeedback,
} = require('../controllers/FeedBacksController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAllFeedbacks);
router.get('/dish/:id', verifyToken, getFeedbackByDishId);
router.post('/', verifyToken, createFeedback);
router.delete('/:id', verifyToken, deleteFeedback);

module.exports = router;
