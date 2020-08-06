import { Schema, model, Types } from "mongoose";
import { IMeeting } from "./types/meeting";
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
    creator: {
      type: Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IMeeting>("Meeting", MeetingSchema);
