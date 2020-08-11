import React, { useContext } from "react";
import styled from "styled-components";

import { StyledLink, SmallContainer } from "./Layout";
import { Button } from "./FormElements";
import AuthContext from "../../context/authContext/authContext";
import MeetingContext from "context/meetingContext/meetingContext";
import NoteContext from "context/noteContext/noteContext";

interface Props {}
const Div = styled.div`
  height: 100%;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 7%;
  box-sizing: border-box;
  margin: auto;
`;
const Nav = styled.div`
  background-color: #f0f0f0;
  height: 8rem;
  width: 100%;
`;
const Logo = styled.div`
  color: #84a9ac;
  font-size: 24px;
  min-width: 15%;
  height: 4rem;
  font-style: normal;
  font-weight: 500;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #3b6978;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 1rem;
  @media (max-width: 528px) {
    font-size: 1.5rem;
  }
`;

const Navigation = (props: Props) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { clearMeetings, clearCurrentMeeting } = useContext(MeetingContext);
  const { clearNotes } = useContext(NoteContext);

  const handleLogout = () => {
    logout();
    clearMeetings();
    clearCurrentMeeting();
    clearNotes();
  };

  return (
    <Nav>
      <Div>
        <StyledLink color="#3b6978" fontSize="8rem" to="/meeting-overview">
          <Logo>MeetMe</Logo>
        </StyledLink>
        {isAuthenticated && (
          <SmallContainer
            display="flex"
            width="8rem"
            align="center"
            justify="center"
          >
            <StyledLink
              color="#3b6978"
              fontSize="8rem"
              to="/create-meeting"
              mFont="4rem"
            >
              +
            </StyledLink>
            <Button
              onClick={() => handleLogout()}
              background="none"
              color="#84A9AC"
              fontSize="3rem"
              mFont='2rem'
            >
              <i className="fas fa-sign-out-alt"></i>
            </Button>
          </SmallContainer>
        )}
      </Div>
    </Nav>
  );
};

export default Navigation;
