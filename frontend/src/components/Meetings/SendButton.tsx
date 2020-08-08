import React from "react";
import { Button } from "components/Shared/FormElements";

interface Props {}

const SendButton = () => {
  return (
    <Button background='#E3E3E3' margin='0'>
      <svg
        id="Capa_1"
        enable-background="new 0 0 512.004 512.004"
        height="3rem"
        viewBox="0 0 512.004 512.004"
        width="3rem"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67-7.717-5.727-203.749-151.217-214.37-159.1l-142.1-54.96c-5.79-2.24-9.6-7.81-9.59-14.02.01-6.21 3.85-11.77 9.65-13.98l482-184c5.824-2.232 12.488-.626 16.67 4.17 3.37 3.87 4.55 9.24 3.03 14.22z"
            fill="#204051"
          />
          <path
            d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67l-190.05-141.05 332.31-280.84c3.37 3.87 4.55 9.24 3.03 14.22z"
            fill="#84A9AC"
          />
          <path
            d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59v-175.3c0-4.86 2.35-9.41 6.31-12.23l337-239.69c6.29-4.48 14.95-3.45 20.01 2.38 5.07 5.83 4.88 14.56-.43 20.16z"
            fill="#3B6978"
          />
          <path
            d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59l31.01-144 332.31-280.84c5.07 5.83 4.88 14.56-.43 20.16z"
            fill="#E3E3E3"
          />
        </g>
      </svg>
    </Button>
  );
};

export default SendButton;
