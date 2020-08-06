import { validationResult } from 'express-validator';
import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

import dotenv from 'dotenv';
import { IUser } from '../models/types/user';
import Meeting from '../models/Meeting';
dotenv.config();
const secretJWT: string = process.env.jwtSecret!;

type payloadType = {
  id: string;
};

// Register
const register = async (req: Request, res: Response): Promise<any> => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // If user exists
    const emailEx: IUser | null = await User.findOne({ email });
    if (emailEx) {
      return res.status(400).json({ errors: [{ msg: 'UserAlready exists' }] });
    }

    // create user
    const user: IUser = new User({
      name,
      email,
      password,
    });

    // encrypt password
    const slat: string = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, slat);

    await user.save();

    // return JWT
    const payload: payloadType = {
      id: user.id,
    };
    jwt.sign(payload, secretJWT, { expiresIn: '10d' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: [{ msg: 'Server Error!' }] });
  }
};

// login
const login = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    // See if user exists
    let user: IUser | null = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // If there is a user check his hashed password
    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    // Return JWT

    const payload: payloadType = {
      id: user.id,
    };

    jwt.sign(payload, secretJWT, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;

      res.json({ token });
      console.log(token);
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// get current user
const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  // console.log(req);
  try {
    const user = await User.findById(req.userId).select('-password');
    // console.log(req);
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// Delete User
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await User.findOneAndDelete({ _id: req.userId });
    await Meeting.deleteMany({ creator: req.userId });

    res.json({ msg: 'User Deleted' });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

export { login, register, getCurrentUser, deleteUser };
