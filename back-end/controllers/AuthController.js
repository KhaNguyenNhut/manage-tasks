const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, username, password, ID, birthday, role } = req.body;
    // Hash passwords 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const staff = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: hashedPassword,
      ID: ID,
      birthday: birthday,
      role: role,
    }

    const response = await Staff.create(staff);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.login = async (req, res) => {
  let step = 0;
  try {
    const { username, password } = req.body;
    if(!username || !password) {
      return res.status(404).json({ message: "Username or Password is required !" });
    }
    step = 1
    const staff = await Staff.findOne({ username: username }).populate('role');
    step = staff || 2
    if (!staff) {
      return res.status(404).json({ message: "Username or Password is wrong !" });
    }
    
    const validPassword = await bcrypt.compare(password, staff.password);
    if (!validPassword) {
      return res.status(404).json({ message: "Username or Password is wrong !" });
    }
    step = 3
    const token = await jwt.sign({_id: staff._id}, process.env.ACCESS_TOKEN_SECRET);
    return  res.header('auth-token', token).send({token: token, staff: staff});
    
  } catch (err) {
    return res.status(400).json({ message: err, body: req.body, step: step });
  }
};

exports.getAccount = async (req, res) => {
  const staff = await Staff.findOne({ _id: req.params.id }).populate('role');
  if (!staff) {
    return res.status(404).json({ message: "Not Found !" });
  }

  return res.status(200).json(staff);
}