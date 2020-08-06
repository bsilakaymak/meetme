import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Input, Button, Form } from "../Shared/FormElements";
import AuthContext from "../../context/authContext/authContext";

// TODO: Control Login button
// add validity to form data
// Add Error model if the user not found
const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  const { email, password } = formData;

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    login(formData);
    history.push("/meeting-overview");
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
        value={email}
        placeholder="email"
        onChange={InputChangeHandler}
        required
      />
      <Input
        name="password"
        type="password"
        value={password}
        placeholder="password"
        onChange={InputChangeHandler}
        required
      />
      <Button type="submit" light roundBorder>
        LOGIN
      </Button>
    </Form>
  );
};

export default Login;
