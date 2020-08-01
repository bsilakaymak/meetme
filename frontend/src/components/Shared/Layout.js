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
  }};
  margin: 1rem auto;
  background: ${(props) => props.bg && props.bg};
  display: flex;
  flex-direction: ${(props) => (props.flexRow ? "row" : "column")};
  justify-content: ${(props) => props.centeredFlex && "center"};
  align-items: ${(props) => props.centeredFlex && "center"};
  @media (min-width: 768px) {
    width: ${(props) => {
      if (props.fullWidth) {
        return `100%`;
      } else if (props.big) {
        return `90%`;
      } else {
        return `75%`;
      }
    }};
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: ${(props) => (props.color ? props.color : "#206a5d")};
`;

export const Icon = styled.i`
  font-size: ${(props) => {
    if (props.big) {
      return `2.5rem`;
    } else if (props.medium) {
      return `2rem`;
    } else {
      return `1.5rem`;
    }
  }};
  color: ${(props) => (props.color ? props.color : "#206a5d")};
`;
