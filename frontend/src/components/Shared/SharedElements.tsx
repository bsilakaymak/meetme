import React from "react";

import {
  Button,
  Input,
  TextArea,
  Label,
  LabelAndInputHolder,
  Form,
} from "./FormElements";
import { Divider, Card } from "./Layout";

//This file is for demonstration purposes
const SharedElements = () => {
  return (
    <div>
      <h3>Button styles</h3>
      <Button>Default Button</Button>
      <Button bold>Bold Button</Button>
      <Button roundBorder>Round bordered Button</Button>
      <Button lightBlue roundBorder>
        Light Blue Button
      </Button>
      <Button light roundBorder>
        Light Button
      </Button>
      <Button sm light>
        Smaller Button
      </Button>{" "}
      <Divider marginBottom="3rem" />
      <h3>Input styles</h3>
      <LabelAndInputHolder>
        <Label absolute top="-10px" left="10px">
          It is a label
        </Label>
        <Input />
      </LabelAndInputHolder>
      <Divider marginBottom="3rem" />
      <Input light />
      <Divider marginBottom="3rem" />
      <h3>Input and text area wrapped in Form</h3>
      <Form>
        <Input /> <TextArea />
      </Form>
      <Divider marginTop="3rem" />
      <Card light>Hello</Card>
      <Card lightBlue></Card>
      <Card></Card>
    </div>
  );
};

export default SharedElements;
