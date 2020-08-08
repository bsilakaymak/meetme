import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Landing from "../LandingPage/Landing";
import MeetingOverview from "../User/MeetingOverview";
import CreateMeeting from "../Meetings/CreateMeeting";
import MeetingDetails from "../Meetings/MeetingDetails";
import Navigation from "../Shared/Navigation";
import MeetingState from "../../context/meetingContext/MeetingState";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "../../context/authContext/authContext";
import AlertContext from "context/alert/AlertState";
import Alert from "components/Shared/Alert";

const Routes = () => {
  const { loadUser, isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <MeetingState>
      <AlertContext>
        <Router>
          <Navigation />
          <Alert />
          <Switch>
            <PrivateRoute
              path="/meeting-overview"
              component={MeetingOverview}
              exact
            />
            <PrivateRoute
              path="/create-meeting"
              component={CreateMeeting}
              exact
            />
            <PrivateRoute
              path="/meeting-details"
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
      </AlertContext>
    </MeetingState>
  );
};

export default Routes;
