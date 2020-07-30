import styled from "styled-components";

export const Card = styled.div`
width: ${(props) => (props.width ? props.width : "50%")};
display:${(props) => (props.display ? props.display : "flex")};
flex-direction: ${(props) => (props.fd ? props.fd : "row")};
align-items: ${(props) => (props.centeredFlex && 'center')};
justify-content: ${(props) => (props.centeredFlex && 'center')};
background-color: ${(props) => (props.bgColor ? props.bgColor : "#ebecf1")};
border: 1px solid #206a5d;
min-height: 5rem;
margin:1rem auto;
`;
