const Storage = require('../models/Storage');

exports.getAllStorages = async (req, res) => {
  try {
    const storages = await Storage.find({}).populate('ingredient');
    res.status(200).json(storages);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getStorage = async (req, res) => {
  try {
    const storage = await Storage.findById(req.params.id);
    res.status(200).json(storage);
  } catch (err) {
    res.status(400).json({ message: 'Not found storage' });
  }
};

exports.createStorage = async (req, res) => {
  try {
    const data = {
      ingredient: req.body.ingredient,
      amount: req.body.amount,
    }
    const storageCurrent = await Storage.findOne({ ingredient: req.body.ingredient }).populate('ingredient');
    if (storageCurrent) {
      storageCurrent.amount += data.amount;
      storageCurrent.updateAt = new Date();
      await Storage.findByIdAndUpdate(storageCurrent._id, storageCurrent, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(storageCurrent);
    } else {
      const response = await Storage.create(data);
      const storage = await Storage.findById(response._id).populate('ingredient');
      res.status(200).json(storage);
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateStorage = async (req, res) => {
  try {
    let storage = await Storage.findById(req.params.id);
    if (!storage) {
      res.status(400).json({ message: 'Not found storage' });
    }
    const data = {
      ingredient: req.body.ingredient,
      amount: req.body.amount,
      updateAt: new Date()
    }

    storage = await Storage.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(storage);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteStorage = async (req, res) => {
  try {
    let storage = await Storage.findById(req.params.id);
    if (!storage) {
      res.status(400).json({ message: 'Not found storage' });
    }

    await storage.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
