import React, { useContext, useEffect } from "react";
import { Container, StyledLink, Card } from "../Shared/Layout";
import MeetingList from "./MeetingList";
import MeetingContext from "../../context/meetingContext/meetingContext";
const Meeting = () => {
  const { getAllMeeting, meetings, loading } = useContext(MeetingContext);
  useEffect(() => {
    getAllMeeting();
  }, []);

  return (
    <>
      <Container column justify="flex-start">
        {meetings !== null && meetings.length === 0 && (
          <h3>There is no meeting</h3>
        )}

        {meetings &&
          meetings.map((meeting) => (
            <StyledLink width="100%" to={`/meeting-details/${meeting._id}`}>
              <MeetingList key={meeting._id} meeting={meeting} />
            </StyledLink>
          ))}
      </Container>
    </>
  );
};

export default Meeting;
