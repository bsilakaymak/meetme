import { createContext } from "react";
import { INote } from "./NoteState";
const noteContext = createContext<INote | any>(undefined);

export default noteContext;
