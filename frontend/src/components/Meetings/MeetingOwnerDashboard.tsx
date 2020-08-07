import React from "react";
import { SmallContainer, Title } from "../Shared/Layout";
import { Input, TextArea, Form, Button, Label } from "../Shared/FormElements";

interface Props {}

const MeetingOwnerDashboard = (props: Props) => {
  return (
    <SmallContainer light width="100%">
      <Title color="#3b6978" textAlign="center">
        Update Meeting
      </Title>
      <Form>
        <Input light height="2rem" placeholder="Title" />
        <TextArea light placeholder="Description" />
        <Label>Beginning</Label>
        <Input light  name="start" width="30%" type="datetime-local" />
        <Label>End</Label>
        <Input light name="end" width="30%" type="datetime-local" />
        <Button light>UPDATE</Button>
      </Form>
      <Title textAlign="center" color="#3b6978">
        Add Notes
      </Title>
      <Form>
        <Input light  height="2rem" placeholder="Title" />
        <TextArea light placeholder="Notes" />
        <Button light>ADD</Button>
      </Form>
      <Button>DELETE MEETING</Button>
    </SmallContainer>
  );
};

export default MeetingOwnerDashboard;
