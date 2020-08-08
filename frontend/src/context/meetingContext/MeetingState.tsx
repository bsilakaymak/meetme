import React, { useReducer, useCallback } from "react";
import axios from "axios";
import MeetingContext from "./meetingContext";
import MeetingReducer from "./meetingReducer";
import {
  CREATE_MEETING,
  DELETE_MEETING,
  GET_ALL_MEETINGS,
  GET_MEETING,
  UPDATE_MEETING,
} from "../types";

type meetingFormType = {
  title: string;
  description: string;
  start: string;
  end: string;
  address: string;
};

export interface MeetingStateTypes {
  meetings: [
    {
      address: string;
      creator: string;
      description: string;
      end: string;
      participants: [
        {
          email: string;
          name: string;
          _id: string;
          avatar: string;
        }
      ];
      start: string;
      title: string;
      _id: string;
    }
  ];
  meeting: {};
  loading: boolean;
  addMeeting?: (meetingForm: meetingFormType) => Promise<void>;
  updateMeeting?: (meetingForm: meetingFormType) => Promise<void>;
  getAllMeeting?: () => Promise<void>;
  getMeeting?: (id: string) => Promise<void>;
  deleteMeeting?: (mId: string) => Promise<void>;
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
  const getAllMeeting = useCallback(async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/meeting");

      dispatch({
        type: GET_ALL_MEETINGS,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }, []);

  const getMeeting = useCallback(async (id: string) => {
    try {
      const data = await axios.get(`http://localhost:5000/api/meeting/${id}`);
      dispatch({
        type: GET_MEETING,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }, []);

  const updateMeeting = async (meetingForm: meetingFormType, mId: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const data = await axios.patch(
        `http://localhost:5000/api/meeting/${mId}`,
        meetingForm,
        config
      );
      dispatch({
        type: UPDATE_MEETING,
        payload: data.data,
      });
    } catch (error) {
      console.log(error.response.data.errors);
    }
  };

  const deleteMeeting = async (mId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/meeting/${mId}`);
      dispatch({
        type: DELETE_MEETING,
        payload: mId,
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
        deleteMeeting,
        updateMeeting,
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
