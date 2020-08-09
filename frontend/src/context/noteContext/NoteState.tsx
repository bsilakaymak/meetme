import React, { useReducer, useCallback } from "react";
import axios from "axios";
import NoteReducer from "./noteReducer";
import NoteContext from "./noteContext";
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
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = useCallback(async (mId: string) => {
    try {
      const data = await axios.get(
        `http://localhost:5000/api/notes/meetings/${mId}`
      );
      dispatch({
        type: GET_NOTES,
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteNote = async (mId: string, nId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/notes/${nId}/meetings/${mId}`
      );
      dispatch({
        type: DELETE_NOTE,
        payload: nId,
      });
    } catch (error) {
      console.log(error);
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
