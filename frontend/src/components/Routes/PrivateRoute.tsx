import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import authContext from "context/authContext/authContext";

interface Props {}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useContext(authContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        auth && !auth.isAuthenticated && !auth.loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
