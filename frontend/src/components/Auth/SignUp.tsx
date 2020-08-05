import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, Form } from '../Shared/FormElements';

interface Props {}
// TODO: Control SignUp button
// add validity to form data
// Add Error message under the inputs (like incase password doesn't match)
const SignUp = (props: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  let history = useHistory();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // TODO: make a call to backend to send form Data
      // call signUp function
      // Sending user to meeting overview page for now this should be in signUp function.
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
        name="name"
        type="text"
        placeholder="name"
        value={formData.name}
        onChange={InputChangeHandler}
      />
      <Input
        name="company"
        type="text"
        placeholder="company"
        value={formData.company}
        onChange={InputChangeHandler}
      />
      <Input
        name="email"
        type="email"
        placeholder="email"
        value={formData.email}
        onChange={InputChangeHandler}
      />
      <Input
        name="password"
        type="password"
        placeholder="password"
        value={formData.password}
        onChange={InputChangeHandler}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="confirm password"
        value={formData.confirmPassword}
        onChange={InputChangeHandler}
      />
      <Button type="submit" light roundBorder>
        SIGN UP
      </Button>
    </Form>
  );
};

export default SignUp;
