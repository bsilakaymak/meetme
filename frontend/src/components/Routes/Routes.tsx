import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from '../LandingPage/Landing';
import MeetingOverview from '../User/MeetingOverview';
import CreateMeeting from '../Meetings/CreateMeeting';
import MeetingDetails from '../Meetings/MeetingDetails';
import Navigation from '../Shared/Navigation';
import authContext from '../../context/authContext/authContext';

interface Props {}

const Routes = (props: Props) => {
  const auth = useContext(authContext);
  return (
    <div>
      <Router>
        {auth['isAuthenticated'] && <Navigation />}
        <Switch>
          <Route path="/" component={Landing} exact />
          <Route path="/meeting-overview" component={MeetingOverview} exact />
          <Route path="/create-meeting" component={CreateMeeting} exact />
          <Route path="/meeting-detail" component={MeetingDetails} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default Routes;
