const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getAllTaskTypes,
  getTaskType,
  createTaskType,
  updateTaskType,
  deleteTaskType,
} = require('../controllers/TaskTypeController');

router.get('/', verifyToken, getAllTaskTypes);
router.get('/:id', verifyToken, getTaskType);
router.post('/', verifyToken, createTaskType);
router.put('/:id', verifyToken, updateTaskType);
router.delete('/:id', verifyToken, deleteTaskType);

module.exports = router;
