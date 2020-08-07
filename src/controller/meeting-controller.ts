import { validationResult } from "express-validator";
import { Response, Request } from "express";
import Meeting from "../models/Meeting";
import { IMeeting } from "../models/types/meeting";

const createMeeting: (
  req: Request,
  res: Response
) => Promise<Response<any> | undefined> = async (
  req: Request,
  res: Response
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, start, end } = req.body;

  const meeting: IMeeting = new Meeting({
    title,
    description,
    start: new Date(start),
    end: new Date(end),
    creator: req.userId,
    participants: [req.userId],
  });
  console.log(meeting);
  await meeting.save();
  res.json(meeting).status(201);
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
};

const getAllMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetings: IMeeting[] = await Meeting.find({
      creator: req.userId,
    }).sort("createdAt -1");

    res.json(meetings).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
};

const getMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: string = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId);
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
    }

    res.json(meeting).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
};

const inviteToMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: string = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId);
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
    }
    const newParticipants = [...meeting.participants, req.body.participants];
    meeting.participants = [...new Set(newParticipants)];
    // somewhere here we would call the function to send email to the relevant users via sendgrid or some other library
    // again somewhere here we need to establish a relationship between users and meetings, so we would make sure each user invited would have
    // this meeting on their meetings list
    await meeting.save();
    res.json({ msg: `Users are invited to the meeting` }).status(200);
  } catch (error) {
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
};

const deleteMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: string = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId);
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
    }
    await meeting.remove();

    res.json({ msg: `${meeting.title} meeting deleted` }).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
};

export {
  createMeeting,
  getAllMeetings,
  deleteMeeting,
  getMeeting,
  inviteToMeeting,
};
