import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Form } from "../Shared/FormElements";
import AuthContext from "../../context/authContext/authContext";
interface Props {}
// TODO: Control SignUp button
// add validity to form data
// Add Error message under the inputs (like incase password doesn't match)
const SignUp = (props: Props) => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useHistory();
  const { name, company, password, confirmPassword, email } = formData;
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password is not match");
    } else {
      register(formData);
      history.push("/meeting-overview");
    }
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
        value={name}
        onChange={InputChangeHandler}
      />
      <Input
        name="company"
        type="text"
        placeholder="company"
        value={company}
        onChange={InputChangeHandler}
      />
      <Input
        name="email"
        type="email"
        placeholder="email"
        value={email}
        onChange={InputChangeHandler}
      />
      <Input
        name="password"
        type="password"
        placeholder="password"
        value={password}
        onChange={InputChangeHandler}
      />
      <Input
        name="confirmPassword"
        type="password"
        placeholder="confirm password"
        value={confirmPassword}
        onChange={InputChangeHandler}
      />
      <Button type="submit" light roundBorder>
        SIGN UP
      </Button>
    </Form>
  );
};

export default SignUp;
