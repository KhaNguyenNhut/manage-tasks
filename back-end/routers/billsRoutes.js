const router = require('express').Router();

const {
  getAllBills,
  getBill,
  getBillByTable,
  updateBill,
  deleteBill,
  getBillByMonth,
  getSalesByDay,
  getSalesByMonth
} = require('../controllers/BillsController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/by-month', verifyToken, getBillByMonth);
router.get('/chart-by-day', verifyToken, getSalesByDay);
router.get('/chart-by-month', verifyToken, getSalesByMonth);
router.get('/', verifyToken, getAllBills);
router.get('/:id', verifyToken, getBill);
router.get('/table/:id', verifyToken, getBillByTable);
router.put('/:id', verifyToken, updateBill);
router.delete('/:id', verifyToken, deleteBill);

module.exports = router;
