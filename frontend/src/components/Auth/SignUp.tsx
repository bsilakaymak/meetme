import React, { useContext, useState } from "react";
import { Input, Button, Form, Span } from "../Shared/FormElements";
import { useForm } from "../Shared/hooks/useForm";
import AuthContext from "../../context/authContext/authContext";
import Validate from "react-validate-form";

const SignUp = () => {
  const [showError, setShowError] = useState(false);
  const [match, setMatch] = useState(true);
  const { register, error } = useContext(AuthContext);
  const initialInputs = {
    name: { value: "", isValid: false },
    company: { value: "", isValid: false },
    email: { value: "", isValid: false },
    password: { value: "", isValid: false },
    confirmPassword: { value: "", isValid: false },
  };
  const [formState, inputHandler] = useForm(initialInputs, false);
  const validations = {
    name: ["required"],
    company: ["required"],
    email: ["email"],
    password: ["min:6", "max:15"],
    confirmPassword: ["min:6", "max:15"],
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const {
      name,
      company,
      email,
      password,
      confirmPassword,
    } = formState.inputs;
    if (password.value !== confirmPassword.value) {
      setMatch(false);
    } else {
      const formData = {
        name: name.value,
        company: company.value,
        email: email.value,
        password: password.value,
      };
      register(formData);
    }
    setShowError(true);
  };
  const InputChangeHandler = (e) => {
    const { value, name } = e.target;
    setMatch(true);
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
              name="name"
              type="text"
              placeholder="name"
              value={formState.inputs.name && formState.inputs.name.value}
              onChange={InputChangeHandler}
              onBlur={validate}
            />
            <Span> {errorMessages.name} </Span>
            <Input
              name="company"
              type="text"
              placeholder="company"
              value={formState.inputs.company && formState.inputs.company.value}
              onChange={InputChangeHandler}
              onBlur={validate}
            />
            <Span> {errorMessages.company} </Span>
            <Input
              name="email"
              type="email"
              placeholder="email"
              value={formState.inputs.email && formState.inputs.email.value}
              onChange={InputChangeHandler}
              onBlur={validate}
            />
            <Span> {errorMessages.email} </Span>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={
                formState.inputs.password && formState.inputs.password.value
              }
              onChange={InputChangeHandler}
              onBlur={validate}
            />
            <Span> {errorMessages.password} </Span>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={
                formState.inputs.confirmPassword &&
                formState.inputs.confirmPassword.value
              }
              onChange={InputChangeHandler}
              onBlur={validate}
            />
            <Span> {errorMessages.confirmPassword} </Span>
            <Span> {showError && error.errors && error.errors[0].msg} </Span>
            <Span> {!match && "Password is not match!"} </Span>
            <Button
              type="submit"
              light
              roundBorder
              disabled={!formState.isValid}
            >
              SIGN UP
            </Button>
          </>
        )}
      </Validate>
    </Form>
  );
};

export default SignUp;
