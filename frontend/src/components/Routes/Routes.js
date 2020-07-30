import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from '../LandingPage/Landing';
import Auth from '../Auth/Auth';
import MeetingOverview from '../User/MeetingOverview';
import CreateMeeting from '../Meetings/CreateMeeting';
import MeetingDetails from '../Meetings/MeetingDetails';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route to="/" component={LandingPage} />
        <Route to="/auth" component={Auth} />
        <Route to="/meeting-overview" component={MeetingOverview} />
        <Route to="/create-meeting" component={CreateMeeting} />
        <Route to="/meeting-detail" component={MeetingDetails} />
      </Switch>
    </Router>
  );
};

export default Routes;
