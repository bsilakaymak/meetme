import { Schema, model, Types } from "mongoose";
import { INote } from "./types/note";
const NoteSchema = new Schema(
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
    creator: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    meeting: {
      type: Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<INote>("Note", NoteSchema);
