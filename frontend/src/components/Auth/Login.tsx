import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, Form } from '../Shared/FormElements';
import { useForm } from '../Shared/hooks/useForm';

interface Props {}
// TODO: Control Login button
// add validity to form data
// Add Error model if the user not found
const Login = (props: Props) => {
  const initialInputs = {
    email: { value: '', isValid: false },
    password: { value: '', isValid: false },
  };
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);
  let history = useHistory();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // TODO: make a call to backend to send form Data
      // call login function
      // Sending user to meeting overview page for now this should be in login function.
      history.push('/meeting-overview');
    } catch (e) {}
  };
  const InputChangeHandler = (e) => {
    const { value, name } = e.target;
    inputHandler(name, value, true);
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Input
        name="email"
        type="email"
        value={formState.inputs.email && formState.inputs.email.value}
        placeholder="email"
        onChange={InputChangeHandler}
      />
      <Input
        name="password"
        type="password"
        value={formState.inputs.password && formState.inputs.password.value}
        placeholder="password"
        onChange={InputChangeHandler}
      />
      <Button type="submit" light roundBorder>
        LOGIN
      </Button>
    </Form>
  );
};

export default Login;
