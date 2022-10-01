const router = require('express').Router();

const {
  getAllTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
} = require('../controllers/TablesController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAllTables);
router.get('/:id', verifyToken, getTable);
router.post('/', verifyToken, createTable);
router.put('/:id', verifyToken, updateTable);
router.delete('/:id', verifyToken, deleteTable);

module.exports = router;
