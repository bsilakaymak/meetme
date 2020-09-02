import React, { useReducer, useCallback, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NoteReducer from "./noteReducer";
import NoteContext from "./noteContext";
import AlertContext from "../alert/alertContext";
import { ADD_NOTE, GET_NOTES, DELETE_NOTE, CLEAR_NOTES } from "../types";

export interface INote {
  notes: [
    {
      _id: string;
      title: string;
      description: string;
    }
  ];
  loading: boolean;
  addNote?: (data: noteFormTypes, mId: string) => Promise<void> | undefined;
  getNotes?: (mId: string) => Promise<void> | undefined;
  deleteNote?: (mId: string, nId: string) => Promise<void>;
  clearNotes?: () => void;
}

type noteFormTypes = {
  title: string;
  description: string;
};

const NoteState = (props: any) => {
  const { setAlert } = useContext(AlertContext);

  const history = useHistory();

  const initialState = {
    notes: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(NoteReducer, initialState);

  const addNote = async (noteForm: noteFormTypes, mId: string) => {
    const config = {
      headers: {
        "Type-Content": "application/json",
      },
    };
    try {
      const data = await axios.post(
        `http://localhost:5000/api/notes/meetings/${mId}`,
        noteForm,
        config
      );
      dispatch({
        type: ADD_NOTE,
        payload: data.data,
      });
      setAlert("Note added successfully!", "success");
      history.push(`/meeting-details/${mId}`);
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(({ msg }) => setAlert(msg, "danger"));
      }
    }
  };

  const getNotes = useCallback(
    async (mId: string) => {
      try {
        const data = await axios.get(
          `http://localhost:5000/api/notes/meetings/${mId}`
        );
        dispatch({
          type: GET_NOTES,
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

  const deleteNote = async (mId: string, nId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/notes/${nId}/meetings/${mId}`
      );
      dispatch({
        type: DELETE_NOTE,
        payload: nId,
      });
      setAlert("Note deleted successfully!", "success");
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach(({ msg }) => setAlert(msg, "danger"));
      }
    }
  };

  const clearNotes = () => dispatch({ type: CLEAR_NOTES });

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        loading: state.loading,
        addNote,
        getNotes,
        deleteNote,
        clearNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
