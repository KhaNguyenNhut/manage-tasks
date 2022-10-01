const Access = require('../models/Access');

exports.getAllAccesses = async (req, res) => {
  try {
    const accesses = await Access.find({});
    res.status(200).json(accesses);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getAccess = async (req, res) => {
  try {
    const access = await Access.findById(req.params.id);
    res.status(200).json(access);
  } catch (err) {
    res.status(400).json({ message: 'Not found access' });
  }
};

exports.createAccess = async (req, res) => {
  try {
    const { name } = req.body;
    const access = await Access.create({ name });
    res.status(200).json(access);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateAccess = async (req, res) => {
  try {
    let access = await Access.findById(req.params.id);
    if (!access) {
      res.status(400).json({ message: 'Not found access' });
    }
    access = await Access.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(access);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteAccess = async (req, res) => {
  try {
    let access = await Access.findById(req.params.id);
    if (!access) {
      res.status(400).json({ message: 'Not found access' });
    }

    await access.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
