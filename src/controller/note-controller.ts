import { validationResult } from "express-validator";
import { Response, Request } from "express";
import { Document } from "mongoose";
import Note from "../models/Note";

export interface INote extends Document {
  title: string;
  description: string;
  creator: string;
  meeting: string;
}

const getNotes = async (req: Request, res: Response): Promise<any> => {
  const { mId } = req.params;
  try {
    const notes = await Note.find({ meeting: mId })
      .populate({
        path: "creator",
        select: "name email avatar _id",
      })
      .sort({ createdAt: -1 });

    if (!notes) {
      return res.status(404).json({ errors: [{ msg: "there is no notes" }] });
    }
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
    }
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
  }
};

const addNote = async (req: Request, res: Response): Promise<any> => {
  const { mId } = req.params;
  const { title, description } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const note: INote = new Note({
      title,
      description,
      creator: req.userId,
      meeting: mId,
    }).populate({
      path: "creator",
      select: "name email avatar _id",
    });

    await note.save();
    res.json(note);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
    }
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
  }
};

const deleteNote = async (req: Request, res: Response): Promise<any> => {
  const { mId, nId } = req.params;

  try {
    const note = await Note.findOne({ meeting: mId, _id: nId });
    if (!note) {
      return res.status(404).json({ errors: [{ msg: "there is no notes" }] });
    }
    if (note.creator.toString() !== req.userId) {
      return res.status(401).json({ errors: [{ msg: "User not authorized" }] });
    }
    await note.remove();

    res.json({ msg: "Note deleted" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
    }
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
  }
};
export { getNotes, addNote, deleteNote };
