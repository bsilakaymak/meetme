import React from "react";
import Moment from "react-moment";
import {
  Card,
  Text,
  Avatar,
  Divider,
  SmallContainer,
} from "components/Shared/Layout";

interface Props {
  meeting: {
    title: string;
    description: string;
    address: string;
    start: string;
    end: string;
    participants: [
      {
        email: string;
        name: string;
        _id: string;
        avatar: string;
      }
    ];
  };
}

const MeetingList = (props: Props) => {
  const {
    meeting: { title, start, end, participants },
  } = props;
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
          {title}
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
          <SmallContainer margin="0.5rem">
            {participants &&
              participants.map(({ email, avatar, name }) => (
                <Avatar
                  key={email}
                  margin="0.25rem 0.5rem 0 0"
                  src={avatar}
                  alt={name}
                />
              ))}
          </SmallContainer>
        </SmallContainer>
      </SmallContainer>
      <SmallContainer display="block" width="30%" textAlign="right">
        <div>
          <Text color="#ffffff">
            Start: <Moment format="YYYY-MM-DD HH:mm">{start}</Moment>
          </Text>
        </div>
        <Divider />
        <div>
          <Text color="#ffffff">
            End: <Moment format="YYYY-MM-DD HH:mm">{end}</Moment>
          </Text>
        </div>
      </SmallContainer>
    </Card>
  );
};

export default MeetingList;
