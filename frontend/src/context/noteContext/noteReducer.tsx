import { ADD_NOTE, GET_NOTES, DELETE_NOTE, CLEAR_NOTES } from "../types";
import { INote } from "./NoteState";
export default (state: INote, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: { payload, ...state },
        loading: false,
      };

    case GET_NOTES:
      return {
        ...state,
        notes: payload,
        loading: false,
      };

    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== payload),
        loading: false,
      };

    case CLEAR_NOTES:
      return {
        // ...state,
        notes: null,
        loading: true,
      };

    default:
      return state;
  }
};
