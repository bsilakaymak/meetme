import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import styled from "styled-components";

interface AlertProps {
  // background?: boolean;
  color?: string;
  padding?: string;
  success?: boolean;
}

const StyledAlert = styled.div<AlertProps>`
  background: ${({ success }) => (success ? "#4fe0ca" : "#e04f67")};
  color: white;
  padding: 1rem;
  text-align: center;
  position: fixed;
  width: 100%;
`;

const Alert = (props: AlertProps) => {
  const alertContext = useContext(AlertContext);

  return (
    <div>
      {alertContext &&
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map(
          (alert: {
            id: string | number | undefined;
            type: string;
            msg: React.ReactNode;
          }) => (
            <StyledAlert key={alert.id} success={alert.type === "success"}>
              {alert.msg}
            </StyledAlert>
          )
        )}
    </div>
  );
};

export default Alert;