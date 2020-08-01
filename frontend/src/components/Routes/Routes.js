import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../LandingPage/Landing";
import Auth from "../Auth/Auth";
import MeetingOverview from "../User/MeetingOverview";
import CreateMeeting from "../Meetings/CreateMeeting";
import MeetingDetails from "../Meetings/MeetingDetails";
import SharedExamples from "../Shared/SharedExamples";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/meeting-overview" component={MeetingOverview} />
        <Route exact path="/create-meeting" component={CreateMeeting} />
        <Route exact path="/meeting-detail" component={MeetingDetails} />
        <Route
          exact
          path="/shared-elements-examples"
          component={SharedExamples}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
