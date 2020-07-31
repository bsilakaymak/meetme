import styled from "styled-components";

export const Container = styled.div`
  width: ${(props) => {
    if (props.sm) {
      return `50%`;
    } else if (props.md) {
      return `75%`;
    } else {
      return `100%`;
    }
  }}
  margin:auto;
  display: flex;
  justify-content: ${(props) => props.centeredFlex && "center"};
  align-items: ${(props) => props.centeredFlex && "center"};
  @media (min-width: 768px) {
   width:${(props) => {
     if (props.fullWidth) {
       return `100%`;
     } else if (props.big) {
       return `90%`;
     } else {
       return `75%`;
     }
   }}
  }
`;
