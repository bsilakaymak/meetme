import express from "express";
import { check } from "express-validator";
import auth from "../../middleware/auth";

import {
  createMeeting,
  getAllMeetings,
  deleteMeeting,
  getMeeting,
  inviteToMeeting,
  updateMeeting,
} from "../../controller/meeting-controller";

const router = express.Router();

// @route    POST api/meeting
// @desc     Create meeting
// @access   Private

router.post(
  "/",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start is required").not().isEmpty(),
    check("end", "End is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    // check("creator", "creator is required").not().isEmpty(),
    // NOTE : creator extracted from req.userId ???
  ],
  createMeeting
);
router.patch(
  "/:mId",
  auth,
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start is required").not().isEmpty(),
    check("end", "End is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    // check("creator", "creator is required").not().isEmpty(),
    // NOTE : creator extracted from req.userId ???
  ],
  updateMeeting
);
router.put("/:mId", auth, inviteToMeeting);
router.get("/", auth, getAllMeetings);
router.get("/:mId", auth, getMeeting);
router.delete("/:mId", auth, deleteMeeting);
module.exports = router;
