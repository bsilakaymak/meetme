import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// const config = require('config');

const User = require('../models/User');

import dotenv from 'dotenv';
dotenv.config();
const secretJWT = process.env.jsonwebtoken!;

// Register
const register = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    // If user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'UserAlready exists' }] });
    }

    // create user
    user = new User({
      name,
      email,
      password,
    });

    // encrypt password
    const slat = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, slat);

    await user.save();

    // return JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, secretJWT, { expiresIn: '10d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error!');
  }
};

// login
const login = async (req: any, res: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    // See if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // If there is a user check his hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // Return JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, secretJWT, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;

      res.json({ token });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// get current user
const getCurrentUser = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

export { login, register, getCurrentUser };
