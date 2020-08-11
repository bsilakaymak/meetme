import React, { useState, useContext, useEffect } from "react";

import MeetingContext from "../../context/meetingContext/meetingContext";
import { SmallContainer, Title, Icon } from "../Shared/Layout";
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
    <SmallContainer
      border="4px solid #84A9AC"
      background="#f0f0f0"
      padding="20px 50px"
      margin="50px auto"
      width="80%"
      borderRadius="7px"
    >
      <SmallContainer textAlign="right" padding="0px">
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
      <Title color="#3b6978" textAlign="center">
        Update Meeting
      </Title>
      <Form align="start" padding="20px" onSubmit={onSubmitHandler}>
        <Label>Title</Label>
        <Input
          height="2rem"
          name="title"
          placeholder="Title"
          onChange={OnChangeHandler}
          value={title}
        />
        <Label>Address</Label>
        <Input
          height="2rem"
          name="address"
          placeholder="Address"
          onChange={OnChangeHandler}
          value={address}
        />
        <Label>Description</Label>
        <TextArea
          placeholder="Description"
          name="description"
          width="70%"
          onChange={OnChangeHandler}
          value={description}
        />
        <Label>Beginning</Label>
        <Input
          name="start"
          width="30%"
          type="datetime-local"
          onChange={OnChangeHandler}
          value={start}
        />
        <Label>End</Label>
        <Input
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
