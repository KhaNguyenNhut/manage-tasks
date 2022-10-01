const Bill = require('../models/Bill');
const Table = require('../models/Table');
const Order = require('../models/Order');
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();

function daysInCurrentMonth() {
  return new Date(currentYear, currentMonth + 1, 0).getDate();
}

function daysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).populate('table').sort({ createAt: -1 });
    res.status(200).json(bills);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.status(200).json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Not found bill' });
  }
};

exports.getBillByTable = async (req, res) => {
  try {
    const bill = await Bill.find({ table: req.params.id });
    res.status(200).json(bill);
  } catch (err) {
    res.status(400).json({ message: 'Not found bill' });
  }
};

exports.createBill = async (data) => {
  try {
    await Order.deleteMany({ "table": data.table?._id })

    const bill = await Bill.create(data);
    await Table.findByIdAndUpdate(data.table?._id, { status: 'Empty', customerName: '' });
    return bill;
  } catch (err) {
    return 'Have something wrong!';
  }
};

exports.updateBill = async (req, res) => {
  try {
    let bill = await Bill.findById(req.params.id);
    if (!bill) {
      res.status(400).json({ message: 'Not found bill' });
    }
    bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(bill);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    let bill = await Bill.findById(req.params.id);
    if (!bill) {
      res.status(400).json({ message: 'Not found bill' });
    }

    await bill.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getBillByMonth = async (req, res) => {
  try {
    const bills = await Bill.find({ "$expr": { "$eq": [{ "$month": "$createAt" }, currentMonth + 1] } });
    res.status(200).json(bills);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getSalesByDay = async (req, res) => {
  try {
    const salesDay = [];
    const startDate = new Date(currentYear, currentMonth, 2);
    const endDate = new Date(currentYear, currentMonth, daysInMonth(currentYear, currentMonth + 1) + 1);
    const bills = await Bill.find({
      $and: [
        { "createAt": { $gte: startDate } },
        { "createAt": { $lt: endDate } }
      ]
    });

    for (let index = 1; index <= daysInCurrentMonth(); index += 1) {
      const date = new Date(currentYear, currentMonth, index).setHours(0,0,0,0);
      const soldFoods = bills.filter(each => each.createAt.setHours(0,0,0,0) === date).map(each => each.foods).flat();
      let totalSales = 0;

      soldFoods.forEach(food => {
        totalSales += food.price * food.quantity;
      });
      salesDay.push(totalSales);
    }
    res.status(200).json(salesDay);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.getSalesByMonth = async (req, res) => {
  try {
    const salesMonth = [];
    for (let index = 1; index <= 12; index += 1) {
      const startDate = new Date(currentYear, index - 1, 2);
      const endDate = new Date(currentYear, index - 1, daysInMonth(currentYear, index) + 1);

      const bills = await Bill.find({
        $and: [
          { "createAt": { $gte: startDate } },
          { "createAt": { $lt: endDate } }
        ]
      });
      const soldFoods = bills.map(each => each.foods).flat();
      let totalSales = 0;
      soldFoods.forEach(food => {
        totalSales += food.price * food.quantity;
      });

      salesMonth.push({
        label: `Month ${index}`,
        value: totalSales
      });
    }
    res.status(200).json(salesMonth);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};