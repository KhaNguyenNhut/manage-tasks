const router = require('express').Router();

let multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single('files');

const {
  getAllFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
} = require('../controllers/FoodsController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/upload-img', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end('Error uploading file.');
    }
    res.end('File is uploaded');
  });
});

router.get('/', getAllFoods);
router.get('/:id', verifyToken, getFood);
router.post('/', verifyToken, createFood);
router.put('/:id', verifyToken, updateFood);
router.delete('/:id', verifyToken, deleteFood);

module.exports = router;
