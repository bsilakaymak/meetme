import { Document } from "mongoose";

export interface IMeeting extends Document {
  title: string;
  description: string;
  start: Date;
  end: Date;
  creator: string;
  participants: string[];
  address: string;
}
