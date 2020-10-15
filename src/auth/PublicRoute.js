import React from "react";
import { Route, Redirect } from "react-router-dom";
// import loggedIn from "../services/login";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const loggedIn = Boolean(localStorage.getItem("token"));
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && restricted ? (
          <Redirect path="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
