import React, { useState, useContext, useEffect } from "react";

import MeetingContext from "../../context/meetingContext/meetingContext";
import { SmallContainer, Title } from "../Shared/Layout";
import { Input, TextArea, Form, Button, Label } from "../Shared/FormElements";
import { useParams } from "react-router-dom";
export type dataType = {
  title: string;
  description: string;
  address: string;
  start: string;
  end: string;
};

const UpdateMeeting = () => {
  const { mId } = useParams();

  const { meeting, updateMeeting, getMeeting } = useContext(MeetingContext);

  const [updateForm, setUpdateForm] = useState({
    title: meeting.title || "",
    description: meeting.description || "",
    address: meeting.address || "",
    start: meeting.start || "",
    end: meeting.end || "",
  });

  const OnChangeHandler = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const { title, description, start, end, address } = updateForm;

  const onSubmitHandler = (e) => {
    e.preventDefault();

    updateMeeting(updateForm, meeting._id);
  };

  useEffect(() => {
    getMeeting(mId);
  }, [mId, getMeeting]);

  return (
    <SmallContainer light width="100%">
      <Title color="#3b6978" textAlign="center">
        Update Meeting
      </Title>
      <Form onSubmit={onSubmitHandler}>
        <Input
          light
          height="2rem"
          name="title"
          placeholder="Title"
          onChange={OnChangeHandler}
          value={title}
        />
        <Input
          light
          height="2rem"
          name="address"
          placeholder="Address"
          onChange={OnChangeHandler}
          value={address}
        />
        <TextArea
          light
          placeholder="Description"
          name="description"
          onChange={OnChangeHandler}
          value={description}
        />
        <Label>Beginning</Label>
        <Input
          light
          name="start"
          width="30%"
          type="datetime-local"
          onChange={OnChangeHandler}
          value={start}
        />
        <Label>End</Label>
        <Input
          light
          name="end"
          width="30%"
          type="datetime-local"
          onChange={OnChangeHandler}
          value={end}
        />
        <Button light>UPDATE</Button>
      </Form>
    </SmallContainer>
  );
};

export default UpdateMeeting;
