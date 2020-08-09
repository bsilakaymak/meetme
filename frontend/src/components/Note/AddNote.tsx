import React, { useState, useContext } from "react";
import { SmallContainer, Title } from "../Shared/Layout";
import { Input, TextArea, Form, Button } from "../Shared/FormElements";
import { useParams, useHistory } from "react-router-dom";
import NoteContext from "../../context/noteContext/noteContext";
const AddNote = () => {
  const history = useHistory();
  const { mId } = useParams();

  const [noteInput, setNoteInput] = useState({
    title: "",
    description: "",
  });
  const { addNote } = useContext(NoteContext);

  const notInputOnChangeHandler = (e) => {
    setNoteInput({ ...noteInput, [e.target.name]: e.target.value });
  };

  const onSubmitNoteHandler = (e) => {
    e.preventDefault();
    addNote(noteInput, mId);

    history.push(`/meeting-details/${mId}`);
  };
  const { title, description } = noteInput;

  return (
    <SmallContainer>
      <Title textAlign="center" color="#3b6978">
        Add Notes
      </Title>
      <Form onSubmit={onSubmitNoteHandler}>
        <Input
          light
          height="2rem"
          placeholder="Title"
          name="title"
          value={title}
          onChange={notInputOnChangeHandler}
        />
        <TextArea
          light
          placeholder="Notes"
          name="description"
          value={description}
          onChange={notInputOnChangeHandler}
        />
        <Button light>ADD</Button>
      </Form>
    </SmallContainer>
  );
};

export default AddNote;
