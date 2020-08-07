import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from "../LandingPage/Landing";
import Meeting from "../Meetings/Meeting";
import CreateMeeting from "../Meetings/CreateMeeting";
import MeetingDetails from "../Meetings/MeetingDetails";
import Navigation from "../Shared/Navigation";
import MeetingState from "../../context/meetingContext/MeetingState";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "../../context/authContext/authContext";
const Routes = () => {
  const { loadUser, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <MeetingState>
      <Router>
        <Navigation />
        <Switch>
          <PrivateRoute path="/meeting-overview" component={Meeting} exact />
          <PrivateRoute
            path="/create-meeting"
            component={CreateMeeting}
            exact
          />
          <PrivateRoute
            path="/meeting-details/:mid"
            component={MeetingDetails}
            exact
          />
          {isAuthenticated ? (
            <Redirect to="/meeting-overview" />
          ) : (
            <Route path={"/"} component={Landing} exact />
          )}
        </Switch>
      </Router>
    </MeetingState>
  );
};

export default Routes;
