const router = require('express').Router();

const {
  getAllOrders,
  getOrder,
  getOrderByTable,
  updateOrder,
  deleteOrder,
} = require('../controllers/OrdersController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAllOrders);
router.get('/:id', verifyToken, getOrder);
router.get('/table/:id', verifyToken, getOrderByTable);
router.put('/:id', verifyToken, updateOrder);
router.delete('/:id', verifyToken, deleteOrder);

module.exports = router;
