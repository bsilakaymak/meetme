import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "../LandingPage/Landing";
import Meeting from "../Meetings/Meeting";
import CreateMeeting from "../Meetings/CreateMeeting";
import MeetingDetails from "../Meetings/MeetingDetails";
import UpdateMeeting from "../Meetings/UpdateMeeting";
import Navigation from "../Shared/Navigation";
import MeetingState from "../../context/meetingContext/MeetingState";
import NoteState from "../../context/noteContext/NoteState";
import PrivateRoute from "./PrivateRoute";
import AuthContext from "../../context/authContext/authContext";
import AlertState from "context/alert/AlertState";
import Alert from "components/Shared/Alert";
import AddNote from "../Note/AddNote";

const Routes = () => {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Router>
      <MeetingState>
        <NoteState>
          <AlertState>
            <Navigation />
            <Alert />
            <Switch>
              <Route path="/" component={Landing} exact />
              <PrivateRoute
                path="/meeting-overview"
                component={Meeting}
                exact
              />
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
              <PrivateRoute
                path="/update-meeting/:mId"
                component={UpdateMeeting}
                exact
              />
              <PrivateRoute path="/addNote/:mId" component={AddNote} exact />
            </Switch>
          </AlertState>
        </NoteState>
      </MeetingState>
    </Router>
  );
};

export default Routes;
