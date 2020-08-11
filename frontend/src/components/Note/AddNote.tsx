import React, { useState, useContext } from "react";

import { SmallContainer, Title, Icon } from "../Shared/Layout";
import { Input, TextArea, Form, Button, Label } from "../Shared/FormElements";
import { useParams } from "react-router-dom";

import NoteContext from "../../context/noteContext/noteContext";
const AddNote = () => {
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
  };
  const { title, description } = noteInput;

  return (
    <SmallContainer
      border="4px solid #84A9AC"
      background="#f0f0f0"
      padding="10px 0 10px 60px "
      margin="50px auto"
      width="80%"
      borderRadius="7px"
    >
      <SmallContainer textAlign="right" padding="10px 40px">
        <Icon
          fontSize="2.2rem"
          color="#3B6978"
          fontWeight="700"
          fontStyle="normal"
          onClick={() => {
            history.push(`/meeting-details/${mId}`);
          }}
        >
          X
        </Icon>
      </SmallContainer>

      <Title textAlign="center" color="#3b6978">
        Add Notes
      </Title>
      <Form align="start" onSubmit={onSubmitNoteHandler}>
        <Label> Title </Label>
        <Input
          height="2rem"
          placeholder="Title"
          name="title"
          value={title}
          onChange={notInputOnChangeHandler}
        />
        <Label> Notes </Label>
        <TextArea
          placeholder="Notes"
          name="description"
          value={description}
          onChange={notInputOnChangeHandler}
          width="70%"
        />
        <Button light disabled={title === "" && description === ""}>
          ADD
        </Button>
      </Form>
    </SmallContainer>
  );
};

export default AddNote;
