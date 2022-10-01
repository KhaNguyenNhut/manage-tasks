const Role = require('../models/Role');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json(roles);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ message: 'Not found role' });
  }
};

exports.createRole = async (req, res) => {
  try {
    const { name, access } = req.body;
    const role = await Role.create({ name, access });
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.updateRole = async (req, res) => {
  try {
    let role = await Role.findById(req.params.id);
    if (!role) {
      res.status(400).json({ message: 'Not found role' });
    }
    role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(role);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    let role = await Role.findById(req.params.id);
    if (!role) {
      res.status(400).json({ message: 'Not found role' });
    }

    await role.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
