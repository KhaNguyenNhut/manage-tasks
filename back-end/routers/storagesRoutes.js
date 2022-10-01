const router = require('express').Router();

const {
  getAllStorages,
  getStorage,
  createStorage,
  updateStorage,
  deleteStorage,
} = require('../controllers/StoragesController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAllStorages);
router.get('/:id', verifyToken, getStorage);
router.post('/', verifyToken, createStorage);
router.put('/:id', verifyToken, updateStorage);
router.delete('/:id', verifyToken, deleteStorage);

module.exports = router;
