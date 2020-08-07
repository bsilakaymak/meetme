import React, { useContext, useState } from "react";
import { Input, Button, Form, Span } from "../Shared/FormElements";
import { useForm } from "../Shared/hooks/useForm";
import AuthContext from "../../context/authContext/authContext";
import Validate from "react-validate-form";

const Login = () => {
  const [showError, setShowError] = useState(false);
  const { login, error } = useContext(AuthContext);
  if (error.length !== 0) {
    console.log(error);
  }
  const validations = {
    email: ["email"],
    password: ["min:6", "max:15"],
  };
  const initialInputs = {
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
  };
  const [formState, inputHandler] = useForm(initialInputs, false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };
    login(formData);
    setShowError(true);
  };
  const InputChangeHandler = (e) => {
    const { value, name } = e.target;
    if (value.length > 0) {
      inputHandler(name, value, true);
    } else inputHandler(name, value, false);
    setShowError(false);
  };
  return (
    <Form onSubmit={formSubmitHandler}>
      <Validate validations={validations}>
        {({ validate, errorMessages }) => (
          <>
            <Input
              name="email"
              type="email"
              value={formState.inputs.email && formState.inputs.email.value}
              placeholder="email"
              onChange={InputChangeHandler}
              onBlur={validate}
            />
            <Span> {errorMessages.email} </Span>
            <Input
              name="password"
              type="password"
              value={
                formState.inputs.password && formState.inputs.password.value
              }
              placeholder="password"
              onChange={InputChangeHandler}
              onBlur={validate}
            />
            <Span> {errorMessages.password} </Span>
            <Span> {showError && error.errors && error.errors[0].msg} </Span>
            <Button
              type="submit"
              light
              roundBorder
              disabled={!formState.isValid}
            >
              LOGIN
            </Button>
          </>
        )}
      </Validate>
    </Form>
  );
};

export default Login;
