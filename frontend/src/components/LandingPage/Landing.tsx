
import React, { useState } from "react";
import LandingSquares from "./LandingSquare";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import { Container, Card } from "../Shared/Layout";
import styled from "styled-components";
import { Button } from "components/Shared/FormElements";
interface Props {}

const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Landing = (props: Props) => {
  const [loginMode, setLoginMode] = useState(false);
  return (
    <Container sm>
      <LandingSquares />

      <Card
        threeSideBorder
        light
        padding="0"
        justify="space-between"
        column
        width="25%"
        height="40vh"
        position="relative"
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
