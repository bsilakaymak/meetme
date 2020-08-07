import React, { useReducer } from "react";
import axios from "axios";
import MeetingContext from "./meetingContext";
import MeetingReducer from "./meetingReducer";
import {
  CREATE_MEETING,
  DELETE_MEETING,
  GET_ALL_MEETINGS,
  GET_MEETING,
} from "../types";

type meetingFormType = {
  title: string;
  description: string;
  start: string;
  end: string;
};

export interface MeetingStateTypes {
  meetings: [];
  meeting: {};
  loading: boolean;
  addMeeting?: (meetingForm: meetingFormType) => Promise<void>;
}

const MeetingState = (props: any) => {
  const initialState = {
    meetings: [],
    meeting: {},
    loading: true,
  };
  const [state, dispatch] = useReducer(MeetingReducer, initialState);
  const addMeeting = async (meetingForm: meetingFormType) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await axios.post(
        "http://localhost:5000/api/meeting",
        meetingForm,
        config
      );
      dispatch({
        type: CREATE_MEETING,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MeetingContext.Provider
      value={{
        meetings: state.meetings,
        meeting: state.meeting,
        loading: state.loading,
        addMeeting,
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
