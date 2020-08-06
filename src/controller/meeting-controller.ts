import { validationResult } from 'express-validator';
import { Response, Request } from 'express';
import Meeting from '../models/Meeting';
import { IMeeting } from '../models/types/meeting';

const createMeeting: (req: Request, res: Response) => Promise<Response<any> | undefined> = async (
  req: Request,
  res: Response,
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
  });
  await meeting.save();
  res.json(meeting);
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: 'Server Error!' } });
  }
};

const getAllMeetings = async (req: Request, res: Response): Promise<void> => {
  try {
    const meetings: IMeeting[] = await Meeting.find({
      creator: req.userId,
    }).sort('createdAt -1');

    res.json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: 'Server Error!' } });
  }
};

const getMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: string = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId);
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: 'There is no meeting' }] });
    }

    res.json(meeting);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: 'Server Error!' } });
  }
};

const deleteMeeting = async (req: Request, res: Response): Promise<any> => {
  const mId: string = req.params.mId;
  try {
    const meeting: IMeeting | null = await Meeting.findById(mId);
    if (!meeting) {
      return res.status(404).json({ errors: [{ msg: 'There is no meeting' }] });
    }
    await meeting.remove();

    res.json({ msg: `${meeting.title} meeting deleted` });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: 'Server Error!' } });
  }
};

export { createMeeting, getAllMeetings, deleteMeeting, getMeeting };
