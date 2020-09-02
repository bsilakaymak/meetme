import { createContext } from "react";
import { MeetingStateTypes } from "./MeetingState";
const meetingContext = createContext<MeetingStateTypes | any>(undefined);

export default meetingContext;
