import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  companyName: string;
  meeting: string;
  avatar: string;
}
