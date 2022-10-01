const Order = require('../models/Order');
const Table = require('../models/Table');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Not found order' });
  }
};

exports.getOrderByTable = async (req, res) => {
  try {
    const order = await Order.find({ table: req.params.id });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: 'Not found order' });
  }
};

exports.createOrder = async (data) => {
  try {
    const order = await Order.create(data);
    order.table = await Table.findOne({ _id: data.table });
    await Table.findByIdAndUpdate(data.table , {status: 'The table is already occupied'});
    return order;
  } catch (err) {
    return 'Have something wrong!';
  }
};

exports.updateStatusOrder = async (data) => {
  try {
    await Order.findOneAndUpdate({ _id: data._id }, { status: data.status });
  } catch (err) {
    return 'Have something wrong!';
  }
};

exports.updateOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      res.status(400).json({ message: 'Not found order' });
    }
    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);
    if (!order) {
      res.status(400).json({ message: 'Not found order' });
    }

    await order.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
