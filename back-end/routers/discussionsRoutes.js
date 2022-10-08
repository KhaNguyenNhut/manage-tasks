const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getAllDiscussions,
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  getDiscussionByTask,
} = require('../controllers/DiscussionsController');

router.get('/', verifyToken, getAllDiscussions);
router.get('/:id', verifyToken, getDiscussion);
router.get('/task/:id', verifyToken, getDiscussionByTask);
router.post('/', verifyToken, createDiscussion);
router.put('/:id', verifyToken, updateDiscussion);
router.delete('/:id', verifyToken, deleteDiscussion);

module.exports = router;
