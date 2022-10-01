const router = require('express').Router();

const {
  register,
  login,
  getAccount
} = require('../controllers/AuthController');

router.post('/register', register);
router.post('/login', login);
router.get('/account/:id', getAccount);

module.exports = router;
