import React from "react";
import styled from "styled-components";
import { Text } from "../Shared/Layout";
interface Props {}
interface BoxPropTypes {
  width?: string;
  darkBlue?: boolean;
  blue?: boolean;
  lightBlue?: boolean;
  top: string;
  left: string;
  paddingTop: string;
  height: string;
}

const Div = styled.div`
  width: 35%;
  height: 90%;
  position: relative;
  margin: 0 3rem;
  @media (max-width: 530px) {
    width: 95%;
    margin: 2rem;
  }
  @media (min-width: 530px) and (max-width: 800px) {
    width: 75%;
    margin: 2rem;
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    width: 50%;
    margin: 2rem;
  }
`;

const Box: any = styled.div<BoxPropTypes>`
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};
  background: ${(props) => {
    if (props.darkBlue) {
      return `#204051;`;
    } else if (props.blue) {
      return `#3b6978;`;
    } else if (props.lightBlue) {
      return `#84a9ac;`;
    } else {
      return `#FFFFFF;`;
    }
  }};
  position: absolute;
  left: ${(props) => props.left && props.left};
  top: ${(props) => props.top && props.top};
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  padding: 1rem;
  padding-top: ${(props) => props.paddingTop && props.paddingTop};
  @media (max-width: 530px) {
    width: ${(props) => props.blue && `80%`};
  }
`;

const LandingSquares = (props: Props) => {
  return (
    <Div>
      <Box
        darkBlue
        width="83%"
        height="15rem"
        top="0"
        left="0"
        paddingTop="15%"
      >
        <Text color="#FFFFFF" fontSize="1.75rem" fontWeight="600">
          Create Meetings
        </Text>
      </Box>
      <Box
        blue
        width="90%"
        height="18rem"
        top="180px"
        left="60px"
        paddingTop="20%"
      >
        {" "}
        <Text color="#FFFFFF" fontSize="2.25rem">
          Invite your coworkers
        </Text>
      </Box>
      <Box
        lightBlue
        width="75%"
        height="15rem"
        top="419px"
        left="20px"
        paddingTop="20%"
      >
        <Text color="#204051" fontSize="2rem">
          Share meeting notes
        </Text>
      </Box>
    </Div>
  );
};

export default LandingSquares;
