import styled, { createGlobalStyle } from "styled-components";

interface LayoutProps {
  background?: string;
  marginTop?: string;
  marginBottom?: string;
  width?: string;
  lightBlue?: boolean;
  light?: boolean;
  height?: string;
  marginTopBottom?: string;
  padding?: string;
  borderedCard?: boolean;
  roundBorder?: boolean;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  position?: string;
  sm?: boolean;
  column?: boolean;
  justify?: string;
  threeSideBorder?: boolean;
}

//Global style
export const GlobalStyle = createGlobalStyle`
body{
  background: #E3E3E3;
  font-family:Arial;
  height:100%;
  width:100%;

}
`;

//Page separator
export const Divider = styled.div<LayoutProps>`
  width: 95%;
  margin: auto;
  height: 2px;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "1rem")};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "1rem"};
  background-color: ${(props) =>
    props.background ? props.background : "#84A9AC"};
`;

//Card
export const Card = styled.div<LayoutProps>`
  width: ${(props) => (props.width ? props.width : "80%")};
  height: ${(props) => (props.height ? props.height : "5rem")};
  padding: ${(props) => (props.padding ? props.padding : "1rem")};
  margin: ${(props) =>
    props.marginTopBottom ? `${props.marginTopBottom} auto` : `auto`};
  background: ${(props) => {
    if (props.lightBlue) {
      return `#84A9AC;`;
    } else if (props.light) {
      return `#F0F0F0;`;
    } else if (props.background) {
      return `${props.background};`;
    } else {
      return `#FFFFFF`;
    }
  }};
  position: ${(props) => props.position && props.position};
  ${(props) => {
    if (props.borderedCard) {
      return `border: 4px solid #84A9AC;`;
    } else if (props.threeSideBorder) {
      return `
          border-bottom:4px solid #84A9AC;
          border-right:4px solid #84A9AC;
          border-left: 4px solid #84A9AC; 
          `;
    } else {
      return `border:none;`;
    }
  }};
  border-top: ${(props) => props.threeSideBorder && "none"}
  border-radius: ${(props) => (props.roundBorder ? "7px" : "0")};
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: center;
  justify-content: ${(props) => props.justify && props.justify};
  @media (max-width: 800px) {
    margin-top: 6%;
    width: 70%;
  }
`;

//Text
export const Text = styled.p<LayoutProps>`
  margin: 0;
  padding: 0;
  color: ${(props) => props.color && props.color};
  font-size: ${(props) => props.fontSize && props.fontSize};
  font-weight: ${(props) => props.fontWeight && props.fontWeight};
`;

//Container
export const Container = styled.div<LayoutProps>`
  width: 95%;
  margin:auto;
  height: ${(props) => (props.height ? props.height : "100vh")};
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing;border-box;
  justify-content: center;
  @media  (max-width: 800px) {
    flex-direction: column;
    height:${(props) => props.sm && "65rem"}
  }
`;
