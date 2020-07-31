import styled from "styled-components";

export const Button = styled.button`
  ${(props) => {
    if (props.light) {
      return `background : #ebecf1;
        color:black;
        border: 1px solid black
        `;
    } else if (props.green) {
      return `background : #206a5d;
        color:white;
        border: 1px solid white;
        `;
    } else if (props.dark) {
      return `background : #1b1c25;
        color:white;
        border: 1px solid white;
        `;
    }
  }};
  width: ${(props) => (props.width ? props.width : "3rem")};
  height: ${(props) => (props.height ? props.height : "1.5rem")};
  border-radius: 5px;
  &:hover {
    opacity: 0.5;
  }
`;

export const Input = styled.input`
  min-width: 30%;
  height: 2rem;
  background: white;
  border: 1px solid #bcc2cc;
  margin: 0.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 40%;
  min-height: 5rem;
  align-items: center;
  display-content: center;
  padding: 1rem;
`;

export const Label = styled.label`
  font-weight: 400;
  color: ${(props) => props.color && props.color};
`;


