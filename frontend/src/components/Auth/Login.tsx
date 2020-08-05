import React from "react";
import { Input, Button, Form } from "../Shared/FormElements";

interface Props {}

const Login = (props: Props) => {
  return (
      <Form>
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Button light roundBorder>
          LOGIN
        </Button>
      </Form>
  );
};

export default Login;
