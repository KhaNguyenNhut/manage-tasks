const router = require('express').Router();

const {
  getAllAccesses,
  getAccess,
  createAccess,
  updateAccess,
  deleteAccess,
} = require('../controllers/AccessesController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAllAccesses);
router.get('/:id', verifyToken, getAccess);
router.post('/', verifyToken, createAccess);
router.put('/:id', verifyToken, updateAccess);
router.delete('/:id', verifyToken, deleteAccess);

module.exports = router;
