const Food = require('../models/Food');

exports.getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find({isDeleted: false}).populate('category');
    res.status(200).json(foods);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    res.status(200).json(food);
  } catch (err) {
    res.status(400).json({ message: 'Not found food' });
  }
};

exports.createFood = async (req, res) => {
  try {
    const { name, materials, price, image, description, category } = req.body;
    const data = {
      name: name,
      materials: materials,
      price: price,
      image: image,
      description: description,
      category: category,
    };

    const food = await Food.create(data);
    res.status(200).json(food);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateFood = async (req, res) => {
  try {
    let food = await Food.findById(req.params.id);
    if (!food) {
      res.status(400).json({ message: 'Not found food' });
    }
    const { name, materials, price, image, description, category } = req.body;
    const data = {
      name: name,
      materials: materials,
      price: price,
      image: image,
      description: description,
      category: category,
    };

    food = await Food.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(food);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    let food = await Food.findOne({ _id: req.params.id });
    if (!food) {
      res.status(400).json({ message: 'Not found food' });
    }

    food.isDeleted = true;
    await food.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
