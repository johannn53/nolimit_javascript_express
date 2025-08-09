const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields are required' });

    // REGEX EMAIL FORMAT
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // VALIDASI FORMAT EMAIL
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: 102,
        message: 'Not a valid email format.',
      });
    }

    // VALIDASI PASSWORD LENGTH
    if (password.length < 8) {
      return res.status(400).json({
        status: 103,
        message: 'Password must be 8 length characaters.',
      });
    }

    // CHECK EMAIL REGISTERED
    const checkUserExist = await User.findOne({
      where: { email },
    });
    if (checkUserExist) {
      return res.status(400).json({
        message: 'Email already registered.',
      });
    }

    // INSERT USER INTO DB
    await User.create({ name, email, password });

    return res.status(200).json({
      status: 0,
      message: 'Registration Success.',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields are required' });

    // GET USER DATA
    const userData = await User.findOne({
      where: { email },
    });
    // THROW ERROR IF USER NOT FOUND
    if (!userData)
      return res.status(404).json({
        message: 'Invalid credentials',
      });

    const isPasswordMatch = await bcrypt.compare(password, userData.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        status: 103,
        message: 'Invalid credentials',
        data: null,
      });
    }

    const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      status: 0,
      message: 'Login Success',
      data: { token },
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
  }
};
