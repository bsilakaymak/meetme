import { validationResult } from "express-validator";
import { Response, Request } from "express";
import Meeting from "../models/Meeting";
import { IMeeting } from "../models/types/meeting";
import User from "../models/User";
import { IUser } from "../models/types/user";

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
  const { title, description, start, end, address } = req.body;

  const meeting: IMeeting = new Meeting({
    title,
    description,
    start: new Date(start),
    end: new Date(end),
    creator: req.userId,
    participants: [req.userId],
    address,
  }).populate({
    path: "participants",
    select: "name email avatar _id",
  });

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
    })
      .populate({
        path: "participants",
        select: "name email avatar _id",
      })
      .sort({ createdAt: -1 });

    res.json(meetings).status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
};

const getMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: string = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId).populate({
      path: "participants",
      select: "name email avatar _id",
    });
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
    const user: IUser | null = await User.findById(req.userId);
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
    }
    req.body.participants.map(async (participant: string) => {
      const user: IUser | null = await User.findOne({ email: participant });
      if (user !== null) {
        user.meetings.push(mId);
        meeting.participants.push(user._id);
        await meeting.save();
        await user.save();
      }
    });

    // somewhere here we would call the function to send email to the relevant users via sendgrid or some other library
    // if (user !== null) {
    //   invitationNotificationEmail(
    //     meeting.title,
    //     req.body.participants,
    //     user.name
    //   );
    // }
    res.json(meeting.participants).status(200);
  } catch (error) {
    res.status(500).json(error);
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

const updateMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: string = req.params.mId;
  const updates: string[] = Object.keys(req.body);
  try {
    const meeting: IMeeting | any = await Meeting.findById(mId).populate({
      path: "participants",
      select: "name email avatar _id",
    });
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
    }
    updates.forEach((update) => (meeting[update] = req.body[update]));
    await meeting.save();
    res.json(meeting);
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
  updateMeeting,
};
