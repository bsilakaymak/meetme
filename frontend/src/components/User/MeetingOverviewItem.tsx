import React from "react";
import {
  Card,
  Text,
  Avatar,
  Divider,
  SmallContainer,
} from "components/Shared/Layout";

interface Props {}

const MeetingOverviewItem = (props: Props) => {
  return (
    <Card
      lightBlue
      height="8rem"
      width="80%"
      padding="2rem"
      justify="space-around"
      margin="2rem auto"
      mHeight="10rem"
    >
      <SmallContainer display="block" width="70%">
        <Text color="#ffffff" fontSize="2rem" fontWeight="600">
          Meeting Title
        </Text>
        <SmallContainer
          display="flex"
          align="center"
          justify="flex-start"
          padding="1rem 0"
          margin="1rem 0 0 0"
        >
          <Text color="#ffffff" fontWeight="600">
            with
          </Text>
          <SmallContainer margin='0.5rem'>
            <a href="/#">
              <Avatar margin="0.25rem 0.5rem 0 0" />
            </a>
            <a href="/#">
              <Avatar margin="0.25rem 0.5rem 0 0" />
            </a>
            <a href="/#">
              <Avatar margin="0.25rem 0.5rem 0 0" />
            </a>
          </SmallContainer>
        </SmallContainer>
      </SmallContainer>
      <SmallContainer display="block" width="30%" textAlign="right">
        <div>
          <Text color="#ffffff">Start: 15.08.2020 12.00</Text>
        </div>
        <Divider />
        <div>
          <Text color="#ffffff">End: 15.08.2020 13.00</Text>
        </div>
      </SmallContainer>

      <div></div>
    </Card>
  );
};

export default MeetingOverviewItem;
