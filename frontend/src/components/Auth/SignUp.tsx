import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, Form } from '../Shared/FormElements';
import { useForm } from '../Shared/hooks/useForm';
import AuthContext from '../../context/authContext/authContext';

// TODO: Control SignUp button
// add validity to form data
// Add Error message under the inputs (like incase password doesn't match)
const SignUp = () => {
  const { register } = useContext(AuthContext);
  const initialInputs = {
    name: { value: '', isValid: false },
    company: { value: '', isValid: false },
    email: { value: '', isValid: false },
    password: { value: '', isValid: false },
    confirmPassword: { value: '', isValid: false },
  };
  const [formState, inputHandler, setFormData] = useForm(initialInputs, false);
  let history = useHistory();
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // TODO: make a call to backend to send form Data
      // call signUp function
      // Sending user to meeting overview page for now this should be in signUp function.
      if (formState.inputs.password !== formState.inputs.confirmPassword) {
        alert('Password is not match');
      } else {
        await register(formState);
        history.push('/meeting-overview');
      }
    } catch (e) {}
  };
  const InputChangeHandler = (e) => {
    const { value, name } = e.target;
    inputHandler(name, value, true);
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Input
        name="name"
        type="text"
        placeholder="name"
        value={formState.inputs.name && formState.inputs.name.value}
        onChange={InputChangeHandler}
      />
      <Input
        name="company"
        type="text"
        placeholder="company"
        value={formState.inputs.company && formState.inputs.company.value}
        onChange={InputChangeHandler}
      />
      <Input
        name="email"
        type="email"
        placeholder="email"
        value={formState.inputs.email && formState.inputs.email.value}
        onChange={InputChangeHandler}
      />
      <Input
        name="password"
        type="password"
        placeholder="password"
        value={formState.inputs.password && formState.inputs.password.value}
        onChange={InputChangeHandler}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="confirm password"
        value={formState.inputs.confirmPassword && formState.inputs.confirmPassword.value}
        onChange={InputChangeHandler}
      />
      <Button type="submit" light roundBorder>
        SIGN UP
      </Button>
    </Form>
  );
};

export default SignUp;
