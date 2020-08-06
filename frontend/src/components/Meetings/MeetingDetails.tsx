import React, { useState } from "react";
import {
  Container,
  Text,
  SmallContainer,
  Card,
  Divider,
  Avatar,
  EmailLabel,
} from "components/Shared/Layout";
import { Button, Input } from "components/Shared/FormElements";
import SendButton from "./SendButton";

interface Props {}
const MeetingDetails = (props: Props) => {
  const [notesOpen, setNotesOpen] = useState(false);
  return (
    <Container column justify="flex-start" padding="2rem">
      <SmallContainer display="flex" mColumn>
        <SmallContainer display="flex" column width="60%">
          <Text color="#204051" fontSize="2.5rem" fontWeight="600">
            Meeting Title
          </Text>
          <SmallContainer width="60%" padding="1rem 0">
            <Text color="#204051" fontSize="1rem">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </SmallContainer>
        </SmallContainer>
        <SmallContainer width="30%">
          <Button margin="0">Invite</Button>
          <SmallContainer>
            {" "}
            <div>
              <Input light placeholder="Add an email" />
            </div>
            <EmailLabel>sila@gmail.com</EmailLabel>{" "}
            <EmailLabel>sila@gmail.com</EmailLabel>
            <EmailLabel>silaghfjhkjhkh@gmail.com</EmailLabel>
          </SmallContainer>
          <SendButton />
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
                14.08.2020 14.00
              </Text>
              <Text color="#84A9AC" fontSize="1.45rem" fontWeight="600">
                Amsterdam
              </Text>
              <Divider background="#E3E3E3" />

              <Text color="#3B6978" fontSize="1.45rem" fontWeight="600">
                Participants
              </Text>

              <div>
                <a href="#">
                  <Avatar margin="1rem 0.5rem 0 0" />
                </a>
                <a href="#">
                  <Avatar margin="1rem 0.5rem 0 0" />
                </a>
                <a href="#">
                  <Avatar margin="1rem 0.5rem 0 0" />
                </a>
              </div>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit
                amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
              </Text>
            </Card>
          )}
        </SmallContainer>
      </SmallContainer>
    </Container>
  );
};

export default MeetingDetails;
