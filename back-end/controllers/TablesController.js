const Table = require('../models/Table');

exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.find({});
    res.status(200).json(tables);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    res.status(200).json(table);
  } catch (err) {
    res.status(400).json({ message: 'Not found table' });
  }
};

exports.createTable = async (req, res) => {
  try {
    const { name } = req.body;
    const table = await Table.create({ name });
    res.status(200).json(table);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateTable = async (req, res) => {
  try {
    let table = await Table.findById(req.params.id);
    if (!table) {
      res.status(400).json({ message: 'Not found table' });
    }
    table = await Table.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(table);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteTable = async (req, res) => {
  try {
    let table = await Table.findById(req.params.id);
    if (!table) {
      res.status(400).json({ message: 'Not found table' });
    }

    await table.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
