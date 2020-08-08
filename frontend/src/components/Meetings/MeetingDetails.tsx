import React, { useState, useContext, useEffect } from "react";
import Moment from "react-moment";
import styled from "styled-components";
import {
  Container,
  Text,
  SmallContainer,
  Card,
  Divider,
  Avatar,
  EmailLabel,
} from "components/Shared/Layout";
import { Button, Input, Form } from "components/Shared/FormElements";
import SendButton from "./SendButton";
import { useParams } from "react-router-dom";
import MeetingContext from "../../context/meetingContext/meetingContext";
import MeetingOwnerDashboard from "./MeetingOwnerDashboard";

const PlusButton = styled.span`
  font-size: 3rem;
  font-weight: 600;
  color: #84a9ac;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const MeetingDetails = () => {
  const { mid } = useParams();

  const { meeting, getMeeting, deleteMeeting, updateMeeting } = useContext(
    MeetingContext
  );

  const [notesOpen, setNotesOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState(["sila@gmail.com"]);
  const [invitedUser, setInvitedUser] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    getMeeting(mid);
  }, [mid, getMeeting]);
  const { title, address, description, start, participants } = meeting;
  return (
    <>
      {meeting && (
        <Container column justify="flex-start" padding="2rem">
          {/* Here we will only show this button to meeting creator */}
          <SmallContainer width="100%">
            <Button
              margin="1rem 0"
              color="#84A9AC"
              fontSize="2rem"
              background="#E3E3E3"
              onClick={() => {
                setSettingsOpen(!settingsOpen);
              }}
            >
              <i className="fas fa-cog"></i>{" "}
            </Button>
            {settingsOpen && (
              <MeetingOwnerDashboard
                meeting={meeting}
                deleteMeeting={deleteMeeting}
                updateMeeting={updateMeeting}
              />
            )}
          </SmallContainer>
          <SmallContainer display="flex" mColumn width="100%">
            <SmallContainer display="flex" column width="60%">
              <Text color="#204051" fontSize="2.5rem" fontWeight="600">
                {title}
              </Text>
              <SmallContainer width="60%" padding="1rem 0">
                <Text color="#204051" fontSize="1rem">
                  {description}
                </Text>
              </SmallContainer>
            </SmallContainer>
            <SmallContainer width="30%">
              <Button margin="0" onClick={() => setInviteOpen(!inviteOpen)}>
                Invite
              </Button>

              {inviteOpen && (
                <>
                  <SmallContainer>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setInvitedUsers([...invitedUsers, invitedUser]);
                      }}
                    >
                      <SmallContainer width="100%">
                        <Input
                          light
                          mWidth="75%"
                          placeholder="Add an email"
                          value={invitedUser}
                          onChange={(e) => setInvitedUser(e.target.value)}
                        />{" "}
                        <PlusButton
                          onClick={() =>
                            setInvitedUsers([...invitedUsers, invitedUser])
                          }
                        >
                          +
                        </PlusButton>
                      </SmallContainer>
                    </Form>
                    {invitedUsers.map((invitedUser) => (
                      <EmailLabel>{invitedUser}</EmailLabel>
                    ))}
                  </SmallContainer>
                  <SendButton />{" "}
                </>
              )}
            </SmallContainer>
          </SmallContainer>

          <SmallContainer width="100%" margin="1rem 0">
            <Button sm margin="0 1rem 0 0" onClick={() => setNotesOpen(false)}>
              DETAILS
            </Button>

            <Button
              sm
              lightBlue
              margin="0 0 0 1rem"
              onClick={() => setNotesOpen(true)}
            >
              NOTES
            </Button>

            <SmallContainer>
              {!notesOpen ? (
                <SmallContainer>
                  <Divider background="#E3E3E3" />
                  <Text color="#84A9AC" fontSize="1.25rem">
                    Start: <Moment format="YYYY-MM-DD HH:mm">{start}</Moment>
                  </Text>
                  <Text color="#84A9AC" fontSize="1.45rem" fontWeight="600">
                    {address}
                  </Text>
                  <Divider background="#E3E3E3" />

                  <Text color="#3B6978" fontSize="1.45rem" fontWeight="600">
                    Participants
                  </Text>

                  {participants &&
                    participants.map(({ _id, avatar, name }) => (
                      <Avatar
                        key={_id}
                        margin="0.25rem 0.5rem 0 0"
                        src={avatar}
                        alt={name}
                      />
                    ))}
                </SmallContainer>
              ) : (
                <Card
                  width="90%"
                  margin="1rem 0"
                  height="auto"
                  column
                  align="end"
                  mWidth="100%"
                >
                  <Text color="#3B6978" fontSize="2rem" fontWeight="600">
                    Meeting Notes
                  </Text>
                  <Divider />
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </Text>
                </Card>
              )}
            </SmallContainer>
          </SmallContainer>
        </Container>
      )}
    </>
  );
};

export default MeetingDetails;
