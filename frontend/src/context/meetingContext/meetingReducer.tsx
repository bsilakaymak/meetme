import {
  GET_ALL_MEETINGS,
  GET_MEETING,
  DELETE_MEETING,
  CREATE_MEETING,
  UPDATE_MEETING,
  INVITE_TO_MEETING,
  CLEAR_CURRENT_MEETING,
  CLEAR_MEETINGS,
} from "../types";
import { MeetingStateTypes } from "./MeetingState";

export default (state: MeetingStateTypes, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MEETINGS:
      return {
        ...state,
        meetings: payload,
        loading: false,
      };

    case GET_MEETING:
      return {
        ...state,
        meeting: payload,
        loading: false,
      };

    case CREATE_MEETING:
      return {
        ...state,
        meetings: [payload, ...state.meetings],
        loading: false,
      };

    case UPDATE_MEETING:
      return {
        ...state,
        meetings: state.meetings.map((meeting) =>
          meeting._id === payload._id ? payload : meeting
        ),
        loading: false,
      };

    case DELETE_MEETING:
      return {
        ...state,
        meetings: state.meetings.filter((meeting) => meeting._id !== payload),
        loading: false,
      };

    case INVITE_TO_MEETING:
      return {
        ...state,
        meeting: { ...state.meeting, participants: payload },
        loading: false,
      };

    case CLEAR_MEETINGS:
      return {
        ...state,
        meetings: null,
        loading: false,
      };

    case CLEAR_CURRENT_MEETING:
      return {
        ...state,
        meeting: null,
        loading: false,
      };

    default:
      return state;
  }
};
