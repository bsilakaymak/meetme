import styled from "styled-components";

interface FormElementProps {
  width?: string;
  light?: boolean;
  lightBlue?: boolean;
  sm?: boolean;
  roundBorder?: boolean;
  relative?: boolean;
  absolute?: boolean;
  top?: string;
  left?: string;
  row?: boolean;
  margin?: string;
  bold?: boolean;
  authButton?: boolean;
  align?: string;
  padding?: string;
  background?: string;
  fontSize?: string;
  mWidth?: string;
  mFont?: string;
}

//Button
export const Button = styled.button<FormElementProps>`
  width: ${(props) => props.width && props.width};
  box-sizing: border-box;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.15rem")};
  border-radius: ${(props) => (props.roundBorder ? "6px" : "0")};
  padding: ${(props) => {
    if (props.sm) {
      return `0.4rem`;
    } else if (props.padding) {
      return `${props.padding}`;
    } else {
      return `0.65rem`;
    }
  }};
  text-align: center;
  position: ${(props) => props.relative && "relative"};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${(props) => (props.margin ? props.margin : "1rem")};
  color: ${(props) => props.color && props.color};
  ${(props) => {
    if (props.light) {
      return `background: #FFFFFF;
      border: 2px solid #84A9AC;
      color:#84A9AC;
      `;
    } else if (props.lightBlue) {
      return `background: #84A9AC;
        color:#FFFFFF;
        border:none;`;
    } else if (props.background) {
      return `background: ${props.background};
        border:none;`;
    } else {
      return `
        background: #3B6978;
        color:#FFFFFF;
        border:none;
        `;
    }
  }};
  &:hover {
    ${(props) => {
      if (props.light) {
        return `background:#84A9AC; color:#FFFFFF; cursor:pointer;`;
      } else if (props.authButton) {
        return `width:75%; cursor:pointer;`;
      } else {
        return `opacity:0.5; transform:scale(1.05); cursor:pointer;`;
      }
    }}
  }
  &:disabled {
    background-color: #fff;
    color: #84a9ac;
  }
  @media (max-width: 1200px) {
    padding: ${(props) => (props.sm ? "0.4rem" : "0.75rem")};
    font-size: ${(props) => props.mFont && props.mFont};
  }
`;

//Input
export const Input = styled.input<FormElementProps>`
  width: ${(props) => (props.width ? props.width : "70%")};
  height: ${(props) => (props.height ? props.height : "2rem")};
  background: ${(props) => (props.light ? "#F0F0F0" : "#e0dede")};
  border: ${(props) => (props.light ? "1px solid #3B6978" : "none")};
  font-family: arial, sans-serif;
  font-size: 18px;
  color:#3B6978;
  margin: ${(props) => (props.margin ? props.margin : "2% 0")};
  @media (max-width: 530px) {
    width: ${(props) => (props.mWidth ? props.mWidth : "90%")};
    margin: 5% 0;
};
  }
  @media (min-width: 530px) and (max-width: 800px) {
    width: ${(props) => (props.mWidth ? props.mWidth : "80%")};
    margin: 4% 0; };
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    width: 70%;
    margin: 3% 0;};
  }
`;

//TextArea
export const TextArea = styled.textarea<FormElementProps>`
  width: ${(props) => (props.width ? props.width : "40%")};
  background: ${(props) => (props.light ? "#F0F0F0" : "#e0dede")};
  border: ${(props) => (props.light ? "1px solid #3B6978" : "none")};
  color:#3B6978;
  min-height: 6rem;
  margin: ${(props) => (props.margin ? props.margin : "2% 0")};
  position: ${(props) => props.relative && "relative"};
  @media (max-width: 530px) {
    width:90%;
    margin: 5% 0;
};
  }
  @media (min-width: 530px) and (max-width: 800px) {
    width:80%;
    margin: 4% 0;
};
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    width: 70%;
    margin: 3% 0;
};
  }
`;

//Label
export const Label = styled.label<FormElementProps>`
  display: block;
  background-color: #3b6978;
  position: ${(props) => props.absolute && "absolute"};
  top: ${(props) => props.top && props.top};
  left: ${(props) => props.left && props.left};
  color: #ffffff;
  text-align: center;
  border-radius: 0 7px;
  padding: 0.55%;
  @media (max-width: 530px) {
    height: 1rem;
  }
  @media (min-width: 530px) and (max-width: 800px) {
    height: 1.25rem;
  }
  @media (min-width: 801px) and (max-width: 1200px) {
    height: 1.5rem;
  }
`;

//A holder for label and input
export const LabelAndInputHolder = styled.div`
  position: relative;
  width: 100%;
`;

// Form
export const Form = styled.form<FormElementProps>`
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  align-items: ${(props) => (props.align ? props.align : "center")};
  justify-content: center;
  @media (max-width: 801px) {
    align-items: center;
  }
`;
// Span => for warning messages
export const Span = styled.span<FormElementProps>`
  display: block;
  font-size: 0.9rem;
  text-align: center;
  color: red;
  margin: 0px;
  padding: 5px;
`;
