import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  padding: 2%;
  @media (max-width: 528px) {
    font-size: 1.5rem;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
const Navigation = (props: Props) => {
  return (
    <Nav>
      <Div>
        <StyledLink to="/">
          <Logo>MeetMe</Logo>
        </StyledLink>
        <StyledLink to="/create-meeting">
          <svg
            fill="#3B6978"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="4rem"
            height="4rem"
            strokeWidth="10"
          >
            <path
              fillRule="evenodd"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
            />
          </svg>{' '}
        </StyledLink>
      </Div>
    </Nav>
  );
};

export default Navigation;
