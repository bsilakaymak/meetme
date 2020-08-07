import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Landing from "../LandingPage/Landing";
import MeetingOverview from "../User/MeetingOverview";
import CreateMeeting from "../Meetings/CreateMeeting";
import MeetingDetails from "../Meetings/MeetingDetails";
import Navigation from "../Shared/Navigation";
import authContext from "../../context/authContext/authContext";
import PrivateRoute from "./PrivateRoute";

interface Props {}

const Routes = (props: Props) => {
  const auth = useContext(authContext);
  return (
    <Router>
      {" "}
      {auth && auth.isAuthenticated && !auth.loading && <Navigation />}
      <Switch>
        {" "}
        {auth && !auth.isAuthenticated && (
          <Route path="/" component={Landing} exact />
        )}
        <PrivateRoute
          path="/meeting-overview"
          component={MeetingOverview}
          exact
        />
        <PrivateRoute path="/create-meeting" component={CreateMeeting} exact />
        <PrivateRoute
          path="/meeting-details"
          component={MeetingDetails}
          exact
        />
      </Switch>
    </Router>
  );
};

export default Routes;
