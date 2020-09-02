import React, { useState, useContext } from "react";
import { useLocation, Redirect } from "react-router-dom";
import LandingSquares from "./LandingSquare";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import { Container, Card } from "../Shared/Layout";
import styled from "styled-components";
import { Button } from "components/Shared/FormElements";
import AuthContext from "../../context/authContext/authContext";

const Div = styled.div`
  background: #3b6978;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Landing = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const { pathname } = useLocation();

  const [loginMode, setLoginMode] = useState(false);

  if (isAuthenticated && pathname === "/") {
    return <Redirect to="/meeting-overview" />;
  }

  return (
    <Container sm height="80vh" mobileFlexDirection="column-reverse">
      <LandingSquares />
      <Card
        threeSideBorder
        light
        padding="0"
        justify="space-between"
        column
        width="25%"
        height="26rem"
        position="relative"
        mHeight="46rem"
      >
        {" "}
        <Div>
          <Button
            authButton
            width="50%"
            margin="0"
            onClick={() => setLoginMode(true)}
          >
            LOGIN
          </Button>{" "}
          <Button
            authButton
            width="50%"
            margin="0"
            lightBlue
            onClick={() => setLoginMode(false)}
          >
            SIGN UP
          </Button>
        </Div>
        {loginMode ? <Login /> : <SignUp />}
      </Card>
    </Container>
  );
};

export default Landing;
