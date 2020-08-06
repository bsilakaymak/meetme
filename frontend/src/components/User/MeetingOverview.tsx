import React, { Fragment } from "react";
import { Container } from "../Shared/Layout";
import MeetingOverviewItem from "./MeetingOverviewItem";
import Navigation from "components/Shared/Navigation";

interface Props {}

const MeetingOverview = (props: Props) => {
  return (
    <Fragment>
      <Container column justify='flex-start'>
        <MeetingOverviewItem />
        <MeetingOverviewItem />
      </Container>
    </Fragment>
  );
};

export default MeetingOverview;
