import React, { useReducer, useCallback, useContext } from "react";
import axios from "axios";
import MeetingContext from "./meetingContext";
import MeetingReducer from "./meetingReducer";
import { useHistory } from "react-router-dom";
import {
  CREATE_MEETING,
  DELETE_MEETING,
  GET_ALL_MEETINGS,
  GET_MEETING,
  UPDATE_MEETING,
  INVITE_TO_MEETING,
  CLEAR_CURRENT_MEETING,
  CLEAR_MEETINGS,
} from "../types";
import AlertContext from "../alert/alertContext";
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
  meeting: {} | null;

  loading: boolean;
  addMeeting?: (meetingForm: meetingFormType) => Promise<void>;
  updateMeeting?: (meetingForm: meetingFormType) => Promise<void>;
  getAllMeeting?: () => Promise<void>;
  getMeeting?: (id: string) => Promise<void>;
  deleteMeeting?: (mId: string) => Promise<void>;
  clearCurrentMeeting?: () => void;
  clearMeetings?: () => void;
  inviteToMeeting?: (
    participants: string[],
    meetingId: string
  ) => Promise<void>;
}

const MeetingState = (props: any) => {
  const { setAlert } = useContext(AlertContext);

  const history = useHistory();

  const initialState = {
    meetings: null,
    meeting: null,
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

      setAlert("Meeting sent successfully!", "success");

      history.push("/meeting-overview");
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(({ msg }) => setAlert(msg, "danger"));
      }
    }
  };

  const inviteToMeeting = async (participants, meetingId) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      participants,
    };

    try {
      const data = await axios.put(
        `http://localhost:5000/api/meeting/${meetingId}/participants`,
        formData,
        config
      );
      dispatch({
        type: INVITE_TO_MEETING,
        payload: data.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(({ msg }) => setAlert(msg, "danger"));
      }
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
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(({ msg }) => setAlert(msg, "danger"));
      }
    }
  }, [setAlert]);

  const getMeeting = useCallback(
    async (id: string) => {
      try {
        const data = await axios.get(`http://localhost:5000/api/meeting/${id}`);
        dispatch({
          type: GET_MEETING,
          payload: data.data,
        });
      } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
          errors.forEach(({ msg }) => setAlert(msg, "danger"));
        }
      }
    },
    [setAlert]
  );

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

      history.push("/meeting-overview");

      setAlert("Meeting updated successfully!", "success");
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(({ msg }) => setAlert(msg, "danger"));
      }
    }
  };

  const deleteMeeting = async (mId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/meeting/${mId}`);
      dispatch({
        type: DELETE_MEETING,
        payload: mId,
      });
      history.push("/meeting-overview");
      setAlert("Meeting deleted successfully!", "success");
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(({ msg }) => setAlert(msg, "danger"));
      }
    }
  };

  const clearMeetings = () => dispatch({ type: CLEAR_MEETINGS });
  const clearCurrentMeeting = () => dispatch({ type: CLEAR_CURRENT_MEETING });

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
        inviteToMeeting,
        clearMeetings,
        clearCurrentMeeting,
      }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};

export default MeetingState;
