import express from "express";
import { check } from "express-validator";
import auth from "../../middleware/auth";
import {
  getNotes,
  addNote,
  deleteNote,
} from "../../controller/note-controller";

const router = express.Router();

router.get("/meetings/:mId", auth, getNotes);
router.delete("/:nId/meetings/:mId", auth, deleteNote);

router.post(
  "/meetings/:mId",
  auth,
  [check("title", "Title is required").not().isEmpty()],
  addNote
);

module.exports = router;
