import React, { useContext } from "react";

import { useHistory } from "react-router-dom";
import { useForm } from "../Shared/hooks/useForm";
import { Container, Card } from "../Shared/Layout";
import {
  Input,
  Form,
  Label,
  LabelAndInputHolder,
  Button,
  TextArea,
} from "../Shared/FormElements";
import MeetingContext from "../../context/meetingContext/meetingContext";
import AlertContext from "../../context/alert/alertContext";

const CreateMeeting = () => {

  const { addMeeting } = useContext(MeetingContext);
  const { setAlert } = useContext(AlertContext);
  
  const initialInputs = {
    title: { value: "", isValid: false },
    description: { value: "", isValid: false },
    start: { value: "", isValid: false },
    end: { value: "", isValid: false },
    address: { value: "", isValid: false },
  };
  const [formState, inputHandler] = useForm(initialInputs, false);
  let history = useHistory();
  const OnChangeHandler = (e) => {
    const { value, name } = e.target;
    value.length > 0
      ? inputHandler(name, value, true)
      : inputHandler(name, value, false);
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, description, start, end, address } = formState.inputs;
    const formData = {
      title: title.value,
      description: description.value,
      start: start.value,
      end: end.value,
      address: address.value,
    };
    addMeeting(formData);

    setAlert("Meeting sent successfully!", "success");

    history.push("/meeting-overview");

  };

  return (
    <Container>
      <Card light borderedCard roundBorder height="80%" padding="0 2.5rem">
        <Form align="flex-start" onSubmit={formSubmitHandler}>
          <LabelAndInputHolder>
            <Label absolute> Title</Label>
            <Input name="title" width="40%" onChange={OnChangeHandler} />
          </LabelAndInputHolder>

          <LabelAndInputHolder>
            <Label absolute> Description</Label>
            <TextArea
              name="description"
              width="70%"
              onChange={OnChangeHandler}
            />
          </LabelAndInputHolder>
          <LabelAndInputHolder>
            <Label absolute> Address</Label>
            <Input name="address" width="40%" onChange={OnChangeHandler} />
          </LabelAndInputHolder>
          <Label>Beginning</Label>
          <Input
            name="start"
            width="30%"
            type="datetime-local"
            onChange={OnChangeHandler}
          />
          <Label>End</Label>
          <Input
            name="end"
            width="30%"
            type="datetime-local"
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
