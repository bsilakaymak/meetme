import React, { useReducer } from "react";
import axios from "axios";
import MeetingContext from "./meetingContext";
import MeetingReducer from "./meetingReducer";
import {
  CREATE_MEETING,
  DELETE_MEETING,
  GET_ALL_MEETINGS,
  GET_MEETING,
  INVITE_TO_MEETING,
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
  getAllMeeting?: () => Promise<void>;
  getMeeting?: (id: string) => Promise<void>;
  inviteToMeeting?: (participants : string[], meetingId:string) => Promise<void>;
}

const MeetingState = (props: any) => {
  const initialState = {
    meetings: null,
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
      console.log(error.response.data.errors);
    }
  };

  const inviteToMeeting = async (participants, meetingId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const data = await axios.put(
        `http://localhost:5000/api/meeting/${meetingId}`,
        participants,
        config
      );
      dispatch({
        type: INVITE_TO_MEETING,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  const getAllMeeting = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/meeting");

      dispatch({
        type: GET_ALL_MEETINGS,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  const getMeeting = async (id: string) => {
    try {
      const data = await axios.get(`http://localhost:5000/api/meeting/${id}`);
      dispatch({
        type: GET_MEETING,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  return (
    <MeetingContext.Provider
      value={{
        meetings: state.meetings,
        meeting: state.meeting,
        loading: state.loading,
        addMeeting,
        getAllMeeting,
        getMeeting,
        inviteToMeeting
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
