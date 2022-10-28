const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getAllSubTasks,
  getSubTask,
  createSubTask,
  updateSubTask,
  deleteSubTask,
  getSubtasksByTask,
  updateProgress,
} = require('../controllers/SubTasksController');

router.get('/', verifyToken, getAllSubTasks);
router.get('/:id', verifyToken, getSubTask);
router.get('/task/:id', verifyToken, getSubtasksByTask);
router.post('/', verifyToken, createSubTask);
router.post('/update-progress', verifyToken, updateProgress);
router.put('/:id', verifyToken, updateSubTask);
router.delete('/:id', verifyToken, deleteSubTask);

module.exports = router;
