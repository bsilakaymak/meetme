import { validationResult } from "express-validator";
import { Response, Request } from "express";
import Meeting from "../models/Meeting";
import User from "../models/User";
import { IMeeting } from "../models/types/meeting";
import { IUser } from "../models/types/user";
import { invitationNotificationEmail } from "../emails/account";
import { Types } from "mongoose";

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
  const { title, description, start, end, address } = req.body as IMeeting;

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
  const user = await User.findById(req.userId);
  user?.meetings.push(meeting._id);
  await user?.save();
  await meeting.save();
  res.status(201).json(meeting);
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
  }
};

const getAllMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetings: IMeeting[] = await Meeting.find({
      $or: [{ creator: req.userId }, { participants: req.userId }],
    })
      .populate({
        path: "participants",
        select: "name email avatar _id",
      })
      .sort({ createdAt: -1 });

    res.status(200).json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
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

    res.status(200).json(meeting);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
    }
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
  }
};

const inviteToMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: any = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId);

    const sender: IUser | null = await User.findById(req.userId);
    if (
      sender &&
      meeting &&
      sender._id.toString() !== meeting.creator.toString()
    ) {
      return res.status(401).json({
        errors: [{ msg: "Only the creator can send an invitation " }],
      });
    }

    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
    }

    req.body.participants.map(async (participant: string) => {
      const user: IUser | null = await User.findOne({ email: participant });
      if (!user) {
        return res.status(400).json({
          errors: [
            { msg: `The user with this ${participant} email does not exist ` },
          ],
        });
      }
      if (user !== null && sender !== null) {
        if (
          meeting.participants.includes(user._id) &&
          user.meetings.includes(mId) &&
          sender.meetings.includes(mId)
        ) {
          res.status(400).json({
            errors: [
              { msg: `The user with this ${user.email} is already invited!` },
            ],
          });
        } else {
          meeting.participants.push(user._id);
          user.meetings.push(mId);

          await meeting.save();
          await user.save();

          res.status(201).json(meeting.participants);
        }
      }
    });

    if (sender !== null) {
      invitationNotificationEmail(
        meeting.title,
        req.body.participants,
        sender.name
      );
    }
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
    }
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
  }
};

const deleteMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: any = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId);
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: "There is no meeting" }] });
    }

    meeting.participants.forEach(async (p) => {
      const user = await User.findById(p);
      if (user !== null) {
        const removeIndex: any = user?.meetings
          .map((meeting) => meeting)
          .indexOf(mId);
        user.meetings.splice(removeIndex, 1);
        await user.save();
      }
    });
    await meeting.remove();

    res.status(202).json({ msg: `${meeting.title} meeting deleted` });
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
    }
    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
  }
};

const updateMeeting = async (req: Request, res: Response): Promise<any> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
    res.status(201).json(meeting);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(500).json({ errors: [{ msg: "You provide a wrong id" }] });
    }

    res.status(500).json({ errors: [{ msg: "Server Error!" }] });
    console.error(error.message);
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
