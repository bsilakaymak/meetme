import { Schema, model, Types } from "mongoose";
import { IMeeting } from "./types/meeting";
import { type } from "os";
const MeetingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    creator: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    participants: [{ type: Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

export default model<IMeeting>("Meeting", MeetingSchema);
