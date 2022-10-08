const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskByUser,
} = require('../controllers/TasksController');

router.get('/', verifyToken, getAllTasks);
router.get('/:id', verifyToken, getTask);
router.get('/user/:id', verifyToken, getTaskByUser);
router.post('/', verifyToken, createTask);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
