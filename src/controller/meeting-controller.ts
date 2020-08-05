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
    start,
    end,
    creator: req.userId,
  });
  await meeting.save();
  try {
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ errors: { msg: "Server Error!" } });
  }
};

export { createMeeting };
