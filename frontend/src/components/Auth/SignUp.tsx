import React from "react";
import { Input, Button, Form } from "../Shared/FormElements";

interface Props {}

const SignUp = (props: Props) => {
  return (
      <Form>
        <Input placeholder="name" />
        <Input placeholder="company" />
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Input placeholder="confirm password" />
        <Button light roundBorder>
          SIGN UP
        </Button>
      </Form>
  );
};

export default SignUp;
