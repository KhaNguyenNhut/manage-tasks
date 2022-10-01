const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: 'foods',
      match: {$or: [{ isDeleted: false }, { isDeleted: {$exists: false} }]}
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: 'Not found category' });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400).json({ message: 'Not found category' });
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      res.status(400).json({ message: 'Not found category' });
    }

    await category.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
