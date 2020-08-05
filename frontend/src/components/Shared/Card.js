import styled from "styled-components";

export const Card = styled.div`
  width: ${(props) => (props.width ? props.width : "50%")};
  display: ${(props) => (props.display ? props.display : "flex")};
  flex-direction: ${(props) => (props.fd ? props.fd : "column")};
  align-items: ${(props) => props.centeredFlex && "center"};
  justify-content: ${(props) => props.centeredFlex && "center"};
  background-color: ${(props) => (props.bgColor ? props.bgColor : "##ffffff")};
  border: 1px solid #f2f2f2;
  box-shadow: 2px 2px 2px 1px #ebecf1;
  min-height: 5rem;
  margin: 1rem auto;
  padding: 0.25rem;
`;
