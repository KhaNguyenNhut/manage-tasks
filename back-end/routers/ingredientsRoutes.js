const router = require('express').Router();

const {
  getAllIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require('../controllers/IngredientsController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, getAllIngredients);
router.get('/:id', verifyToken, getIngredient);
router.post('/', verifyToken, createIngredient);
router.put('/:id', verifyToken, updateIngredient);
router.delete('/:id', verifyToken, deleteIngredient);

module.exports = router;
