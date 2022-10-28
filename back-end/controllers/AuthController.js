const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      avatar,
      fullName,
      username,
      password,
      email,
      phoneNumber,
      createdAt,
      officerCode,
      birthday,
      role,
      degree,
    } = req.body;
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      avatar: avatar,
      fullName: fullName,
      username: username,
      password: hashedPassword,
      email: email,
      phoneNumber: phoneNumber,
      createdAt: createdAt,
      officerCode: officerCode,
      birthday: birthday,
      role: role,
      degree: degree,
    };

    const response = await User.create(user);
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(404)
        .json({ message: "Username or Password is required !" });
    }
    const user = await User.findOne({ username: username }).populate("role");
    if (!user || user.isDeleted) {
      return res
        .status(404)
        .json({ message: "Username or Password is wrong !" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(404)
        .json({ message: "Username or Password is wrong !" });
    }
    const token = await jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.header("auth-token", token).send({ token: token, user: user });
  } catch (err) {
    return res.status(400).json({ message: err, body: req.body });
  }
};

exports.getAccount = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id }).populate("role");
  if (!user) {
    return res.status(404).json({ message: "Not Found !" });
  }

  return res.status(200).json(user);
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, id } = req.body;
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const user = await User.findById(id);
    var isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Mật khẩu cũ không đúng!" });
    }
    if (isValid) {
      user.password = hashedNewPassword;
      await user.save();
      res.status(200).json({ message: "Success" });
    }
  } catch (err) {
    //Do nothing
  }
};
