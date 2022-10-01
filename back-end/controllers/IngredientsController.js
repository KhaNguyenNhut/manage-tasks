const Ingredient = require('../models/Ingredient');
const Storage = require('../models/Storage');

exports.getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    res.status(200).json(ingredient);
  } catch (err) {
    res.status(400).json({ message: 'Not found ingredient' });
  }
};

exports.createIngredient = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      unit: req.body.unit,
      ingredient: req.body.ingredient
    }
    const ingredient = await Ingredient.create(data);
    
    const dataStorage = {
      ingredient: ingredient._id,
      amount: 0,
    }
    const response = await Storage.create(dataStorage);
    const storage = await Storage.findById(response._id).populate('ingredient');
    res.status(200).json(storage);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateIngredient = async (req, res) => {
  try {
    let ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      res.status(400).json({ message: 'Not found ingredient' });
    }
    const data = {
      name: req.body.name,
      unit: req.body.unit
    };

    ingredient = await Ingredient.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(ingredient);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteIngredient = async (req, res) => {
  try {
    let ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) {
      res.status(400).json({ message: 'Not found ingredient' });
    }

    await ingredient.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
