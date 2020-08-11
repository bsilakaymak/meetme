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
  Icon,
} from "components/Shared/Layout";

import { Button, Input, Form } from "components/Shared/FormElements";
import SendButton from "./SendButton";
import { useParams, Link } from "react-router-dom";
import MeetingContext from "../../context/meetingContext/meetingContext";

import NoteContext from "../../context/noteContext/noteContext";
import NoteItem from "../Note/NoteItem";
import authContext from "../../context/authContext/authContext";
import alertContext from "context/alert/alertContext";
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
  const { getNotes, notes } = useContext(NoteContext);

  const { mid } = useParams();

  const { meeting, getMeeting, deleteMeeting, inviteToMeeting } = useContext(
    MeetingContext
  );
  const { user } = useContext(authContext);
  const [notesOpen, setNotesOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [invitedUsers, setInvitedUsers] = useState<string[]>([]);
  const [invitedUser, setInvitedUser] = useState("");
  const { setAlert } = useContext(alertContext);

  useEffect(() => {
    getNotes(mid);
    getMeeting(mid);
  }, [mid, getMeeting, getNotes]);

  if (meeting !== null) {
    const onDeleteHandler = () => {
      deleteMeeting(_id);
    };
    const { title, address, description, start, participants, _id } = meeting;
    return (
      <>
        {meeting && (
          <Container
            column
            justify="flex-start"
            padding="2rem"
            width="80%"
            backgroundColor="#F0F0F0"
            margin="2rem auto"
            height="auto"
          >
            {/* Here we will only show this button to meeting creator */}

            <SmallContainer display="flex" mColumn width="100%">
              <SmallContainer display="flex" column width="60%" padding="1rem">
                <Text color="#204051" fontSize="2.5rem" fontWeight="600">
                  {title}
                </Text>
                <SmallContainer width="60%" padding="1rem 0">
                  <Text color="#204051" fontSize="1rem">
                    {description}
                  </Text>
                </SmallContainer>
              </SmallContainer>
              {user && user._id === meeting.creator && (
                <SmallContainer width="30%" padding="1rem">
                  <Button
                    margin="0"
                    padding="0.35rem"
                    onClick={() => setInviteOpen(!inviteOpen)}
                  >
                    Invite
                  </Button>

                  {inviteOpen && (
                    <>
                      <SmallContainer textAlign="left">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setInvitedUsers([...invitedUsers, invitedUser]);
                          }}
                        >
                          <SmallContainer width="100%" mWidth="100%">
                            <Input
                              light
                              mWidth="75%"
                              placeholder="Add an email"
                              margin="5% 0"
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
                      <SmallContainer textAlign="left">
                        <Button
                          background="#F0F0F0"
                          margin="0"
                          onClick={() => {
                            inviteToMeeting(invitedUsers, _id);
                            setAlert("Participants Invited");
                          }}
                        >
                          <SendButton />
                        </Button>
                      </SmallContainer>
                    </>
                  )}
                </SmallContainer>
              )}
            </SmallContainer>

            <SmallContainer width="100%" margin="1rem 0" padding="1rem">
              <Button sm margin="0 1rem" onClick={() => setNotesOpen(false)}>
                DETAILS
              </Button>

              {notes !== null && notes.length > 0 && (
                <Button
                  sm
                  lightBlue
                  margin="0 1rem"
                  onClick={() => setNotesOpen(true)}
                >
                  NOTES
                </Button>
              )}
              <Link to={`/addNote/${_id}`}>
                <Button sm lightBlue margin="0 0 0 1rem">
                  ADD NOTES
                </Button>
              </Link>

              <SmallContainer padding="1rem">
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
                    light
                  >
                    <Text color="#3B6978" fontSize="2rem" fontWeight="600">
                      Meeting Notes
                    </Text>
                    <Divider />
                    {notes !== null &&
                      notes.map((note) => (
                        <NoteItem note={note} key={note._id} />
                      ))}
                  </Card>
                )}
              </SmallContainer>
            </SmallContainer>
            <SmallContainer
              width="100%"
              textAlign="right"
              margin="0 3rem 0 1rem"
            >
              <Link to={`/update-meeting/${_id}`}>
                <Button>
                  <Icon className="fas fa-edit" />
                  Edit Meeting
                </Button>
              </Link>
              <Button onClick={onDeleteHandler}>
                <Icon className="fas fa-trash-alt" fontSize="1rem" /> DELETE
                MEETING
              </Button>
            </SmallContainer>
          </Container>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default MeetingDetails;
