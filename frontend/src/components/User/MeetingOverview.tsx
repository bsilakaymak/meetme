import React, { Fragment } from "react";
import { Container, StyledLink } from "../Shared/Layout";
import MeetingOverviewItem from "./MeetingOverviewItem";

interface Props {}

const MeetingOverview = (props: Props) => {
  return (
    <Fragment>
      <Container column justify="flex-start">
        <StyledLink width="100%" to="/meeting-details">
          <MeetingOverviewItem />
        </StyledLink>
        <StyledLink width="100%" to="/meeting-details">
          <MeetingOverviewItem />
        </StyledLink>
      </Container>
    </Fragment>
  );
};

export default MeetingOverview;
