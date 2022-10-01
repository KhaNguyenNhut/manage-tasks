const router = require('express').Router();

const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/CategoriesController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAllCategories);
router.get('/:id', verifyToken, getCategory);
router.post('/', verifyToken, createCategory);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

module.exports = router;
