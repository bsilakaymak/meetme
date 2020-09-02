import React, { useContext } from "react";

import { useForm } from "../Shared/hooks/useForm";
import { Container, Card, Title } from "../Shared/Layout";
import {
  Input,
  Form,
  Label,
  LabelAndInputHolder,
  Button,
  TextArea,
} from "../Shared/FormElements";
import MeetingContext from "../../context/meetingContext/meetingContext";

const CreateMeeting = () => {
  const { addMeeting } = useContext(MeetingContext);

  const initialInputs = {
    title: { value: "", isValid: false },
    description: { value: "", isValid: false },
    start: { value: "", isValid: false },
    end: { value: "", isValid: false },
    address: { value: "", isValid: false },
  };
  const [formState, inputHandler] = useForm(initialInputs, false);

  const OnChangeHandler = (e) => {
    const { value, name } = e.target;
    value.length > 0
      ? inputHandler(name, value, true)
      : inputHandler(name, value, false);
  };
  const { title, description, start, end, address } = formState.inputs;
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = {
      title: title.value,
      description: description.value,
      start: start.value,
      end: end.value,
      address: address.value,
    };

    addMeeting(formData);
  };

  return (
    <Container margin="20px auto">
      <Card
        light
        borderedCard
        roundBorder
        height="700px"
        padding="10px 2.5rem"
        overflowY="scroll"
        column
      >
        <Title textAlign="center" color="#3b6978">
          Create Meeting
        </Title>
        <Form align="flex-start" onSubmit={formSubmitHandler}>
          <LabelAndInputHolder>
            <Label absolute top="-15px">
              Title
            </Label>
            <Input
              name="title"
              width="40%"
              margin="2rem 0"
              onChange={OnChangeHandler}
            />
          </LabelAndInputHolder>

          <LabelAndInputHolder>
            <Label absolute top="-15px">
              Description
            </Label>
            <TextArea
              name="description"
              width="70%"
              margin="2rem 0"
              onChange={OnChangeHandler}
            />
          </LabelAndInputHolder>
          <LabelAndInputHolder>
            <Label absolute top="-15px">
              Address
            </Label>
            <Input
              name="address"
              width="40%"
              margin="2rem 0"
              onChange={OnChangeHandler}
            />
          </LabelAndInputHolder>
          <Label>Beginning</Label>
          <Input
            name="start"
            width="30%"
            type="datetime-local"
            placeholder="YYYY-MM-DDT00:00"
            margin="1rem 0"
            pattern="\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d"
            onChange={OnChangeHandler}
          />
          <Label>End</Label>
          <Input
            name="end"
            width="30%"
            type="datetime-local"
            placeholder="YYYY-MM-DDT00:00"
            pattern="\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d"
            margin="1rem 0"
            onChange={OnChangeHandler}
          />

          <Button type="submit" roundBorder bold disabled={!formState.isValid}>
            CREATE
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateMeeting;
