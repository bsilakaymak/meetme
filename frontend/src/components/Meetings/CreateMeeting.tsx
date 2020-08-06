import React from "react";
import { Container, Card } from "../Shared/Layout";
import {
  Input,
  Form,
  Label,
  LabelAndInputHolder,
  Button,
  TextArea,
} from "../Shared/FormElements";

interface Props {}

const CreateMeeting = (props: Props) => {
  return (
    <Container>
      <Card light borderedCard roundBorder height="80%" padding="0 2.5rem">
        <Form align="flex-start">
          <LabelAndInputHolder>
            <Label absolute> Title</Label>
            <Input width="40%" />
          </LabelAndInputHolder>

          <LabelAndInputHolder>
            <Label absolute> Description</Label>
            <TextArea width="70%" />
          </LabelAndInputHolder>

          <LabelAndInputHolder>
            <Label absolute> Time</Label>
            <Input width="40%" />
          </LabelAndInputHolder>
          <Label>Beginning</Label>
          <Input width="30%" type="date" />
          <Label>End</Label>
          <Input width="30%" type="date" />

          <Button roundBorder bold>
            CREATE
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateMeeting;
