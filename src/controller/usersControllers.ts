import { Request, Response } from "express";

import User from "../models/User";
import { IUser } from "../models/types/user";
import Meeting from "../models/Meeting";

// Get all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find().select("-password");

    if (!users) {
      return res.status(404).json({
        errors: [{ msg: "No Users Found" }],
      });
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

// Get user by Id
const getUserById = async (req: Request, res: Response) => {
  const user_id: string = req.params.user_id;

  try {
    const user: IUser | null = await User.findById(user_id).select("-password");
    if (!user) return res.status(404).json({ msg: "Profile not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

export { getUsers, getUserById };
