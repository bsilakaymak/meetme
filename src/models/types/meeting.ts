import { Document, Types } from "mongoose";

export interface IMeeting extends Document {
  title: string;
  description: string;
  start: Date;
  end: Date;
  creator: Types.ObjectId;
  participants: Types.ObjectId[];
  address: string;
}
