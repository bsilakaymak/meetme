import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, Form } from '../Shared/FormElements';

interface Props {}
// TODO: Control Login button
// add validity to form data
// Add Error model if the user not found
const Login = (props: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  let history = useHistory();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // TODO: make a call to backend to send form Data
      // call login function
      // Sending user to meeting overview page for now this should be in login function.
      history.push('/meeting-overview');
      console.log(formData);
    } catch (e) {}
  };
  const InputChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Input
        name="email"
        type="email"
        value={formData.email}
        placeholder="email"
        onChange={InputChangeHandler}
      />
      <Input
        name="password"
        type="password"
        value={formData.password}
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
