const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

const {
  getAllRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/RolesController');

router.get('/', verifyToken, getAllRoles);
router.get('/:id', verifyToken, getRole);
router.post('/', verifyToken, createRole);
router.put('/:id', verifyToken, updateRole);
router.delete('/:id', verifyToken, deleteRole);

module.exports = router;
