import { Document } from "mongoose";

export interface INote extends Document {
  title: string;
  description: string;
  creator: string;
  meeting: string;
}
