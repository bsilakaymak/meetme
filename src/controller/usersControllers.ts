import { Request, Response } from 'express';

import User from '../models/User';
import { IUser } from '../models/types/user';

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find().select('-password');

    if (!users) {
      return res.status(422).json({
        errors: [{ msg: 'No Users Found' }],
      });
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
  console.log('Test');
};

// Get user by Id
const getUserById = async (req: Request, res: Response) => {
  const user_id: string = req.params.user_id;

  try {
    const user: IUser | null = await User.findById(user_id).select('-password');
    res.json(user);
    if (!user) return res.status(400).json({ msg: 'Profile not found' });
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// Delete User
const deleteUser = async (req: Request, res: Response) => {
  const user_id: string = req.params.user_id;

  try {
    const user: IUser | null = await User.findOneAndDelete({
      user_id,
    });
    if (!user) return res.status(400).json({ msg: 'Profile not found' });

    res.json({ msg: 'User Deleted' });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

export { getUsers, getUserById, deleteUser };
