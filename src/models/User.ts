import { Schema, model, Types } from "mongoose";
import { IUser } from "./types/user";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    unique: true,
  },
  meetings: [
    {
      type: Types.ObjectId,
      ref: "Meeting",
    },
  ],
  avatar: {
    type: String,
  },
});

export default model<IUser>("User", userSchema);
