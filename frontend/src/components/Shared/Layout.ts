import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

interface LayoutProps {
  background?: string;
  marginTop?: string;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
  width?: string;
  lightBlue?: boolean;
  light?: boolean;
  height?: string;
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
  angled?: boolean;
  display?: string;
  align?: string;
  margin?: string;
  textAlign?: string;
  mHeight?: string;
  mWidth?: string;
  mColumn?: boolean;
  mobileFlexDirection?: string;
  src?: string;
  alt?: string;
  mFont?: string;
  mr?: string;
  ml?: string;
  mt?: string;
  mb?: string;
  size?: string;
  float?: string;
  zIndex?: string;
  right?: string;
  top?: string;
  overflowY?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  fontStyle?: string;
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
  width: ${(props) => (props.width ? props.width : "100%")};
  margin: auto;
  height: ${(props) => (props.height ? props.height : "2px")};
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
  margin: ${(props) => (props.margin ? props.margin : `auto`)};
  z-index: ${({ zIndex }) => zIndex};
  overflow-y: ${(props) => (props.overflowY ? props.overflowY : `none`)};
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
  border-top: ${(props) => props.threeSideBorder && "none"};
  border-radius: ${(props) => (props.roundBorder ? "7px" : "0")};
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  justify-content: ${(props) => props.justify && props.justify};
  @media (max-width: 800px) {
    margin-top: 6%;
    width: ${(props) => (props.mWidth ? props.mWidth : "70%")};
    height: ${(props) => props.mHeight && props.mHeight};
  }
`;

//Text
export const Text = styled.p<LayoutProps>`
  margin: 0;
  padding: ${(props) => (props.padding ? props.padding : "0px")};
  color: ${(props) => props.color && props.color};
  font-size: ${(props) => props.fontSize && props.fontSize};
  font-weight: ${(props) => props.fontWeight && props.fontWeight};
`;

//Container
export const Container = styled.div<LayoutProps>`
  width: ${(props) => (props.width ? props.width : "95%")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "inherit"};
  margin: ${(props) => (props.margin ? props.margin : "auto")};
  height: ${(props) => (props.height ? props.height : "100vh")};
  display: flex;
  padding: ${(props) => props.padding && props.padding};
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  box-sizing: border-box;
  @media (max-width: 800px) {
    flex-direction: ${(props) =>
      props.mobileFlexDirection ? props.mobileFlexDirection : "column"};
    height: ${(props) => props.sm && "65rem"};
    padding: 1rem;
    width: 100%;
  }
`;

export const Avatar = styled.img<LayoutProps>`
  width: ${(props) => (props.width ? props.width : "3rem")};
  height: ${(props) => (props.height ? props.height : "3rem")};
  border-radius: ${(props) => (props.angled ? "0" : "50%")};
  background: #c4c4c4;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  margin: ${(props) => (props.margin ? props.margin : "0 0.5rem")};
  @media (max-width: 800px) {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    height: 2rem;
    width: 2rem;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

export const SmallContainer = styled.div<LayoutProps>`
  width: ${(props) => props.width && props.width};
  display: ${(props) => props.display && props.display};
  flex-direction: ${(props) => (props.column ? "column" : "row")};
  justify-content: ${(props) => props.justify && props.justify};
  align-items: ${(props) => props.align && props.align};
  padding: ${(props) => props.padding && props.padding};
  margin: ${(props) => props.margin && props.margin};
  text-align: ${(props) => props.textAlign && props.textAlign};
  background: ${({ background }) => background};
  border: ${(props) => (props.border ? props.border : "none")};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "0px"};
  @media (max-width: 800px) {
    width: ${(props) => {
      if (props.sm) {
        return `50%`;
      } else if (props.mWidth) {
        return `${props.mWidth}`;
      } else {
        return `90%`;
      }
    }};
    flex-direction: ${(props) => props.mColumn && "column"};
  }
`;

export const EmailLabel = styled.span<LayoutProps>`
  background-color: #c4c4c4;
  border-radius: 8px;
  color: #3b6978;
  padding: 0.35rem;
  display: inline-block;
  margin: 0.25rem 0.25rem 0.25rem 0;
`;

export const StyledLink = styled(Link)<LayoutProps>`
  color: ${(props) => props.color && props.color};
  font-size: ${(props) => props.fontSize && props.fontSize};
  display: block;
  width: ${(props) => props.width && props.width};
  position: relative;
  z-index: ${({ zIndex }) => zIndex};
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  @media (max-width: 500px) {
    font-size: ${({ mFont }) => mFont && mFont};
  }
`;

export const Title = styled.h2<LayoutProps>`
  font-size: ${(props) => props.fontSize && props.fontSize};
  font-weight: ${(props) => props.fontWeight && props.fontWeight};
  color: ${(props) => props.color && props.color};
  text-align: ${(props) => props.textAlign && props.textAlign};
  padding: ${(props) => props.padding && props.padding};
`;

export const Icon = styled.i<LayoutProps>`
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  cursor: pointer;
  float: ${({ float }) => float};
  color: ${({ color }) => color};
  margin-top: ${({ marginTop }) => marginTop};
  margin-right: ${({ marginRight }) => marginRight};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  margin-left: ${({ marginLeft }) => marginLeft};
  position: ${({ position }) => position};
  z-index: ${({ zIndex }) => zIndex};
  right: ${({ right }) => right};
  top: ${({ top }) => top};
`;
