import React, { useContext, useEffect } from "react";
import { Container, StyledLink, Text } from "../Shared/Layout";
import MeetingList from "./MeetingList";
import MeetingContext from "../../context/meetingContext/meetingContext";
const Meeting = () => {
  const { getAllMeeting, meetings } = useContext(MeetingContext);
  useEffect(() => {
    getAllMeeting();
  }, [getAllMeeting]);

  return (
    <>
      <Container column justify="flex-start">
        {meetings !== null && meetings.length === 0 && (
          <Text color="#84A9AC" fontSize="2rem"  textAlign="center">
            There is no meeting
          </Text>
        )}

        {meetings &&
          meetings.map((meeting) => (
            <StyledLink
              width="100%"
              to={`/meeting-details/${meeting._id}`}
              key={meeting._id}
            >
              <MeetingList meeting={meeting} />
            </StyledLink>
          ))}
      </Container>
    </>
  );
};

export default Meeting;
