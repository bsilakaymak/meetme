import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import styled from "styled-components";

interface AlertProps {
  color?: string;
  padding?: string;
  success?: boolean;
}

const StyledAlert = styled.div<AlertProps>`
  background: ${({ success }) => (success ? "#84ac92" : "#ac8492")};
  color: white;
  padding: 1rem;
  text-align: center;
  margin-bottom: 0.5rem;
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
