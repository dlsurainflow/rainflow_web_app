import React from "react";
import { Route, Redirect } from "react-router-dom";
// import loggedIn from "../services/login";

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const loggedIn = Boolean(localStorage.getItem("token"));
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         loggedIn ? <Component {...props} /> : <Redirect path="/login" />
//       }
//     />
//   );
// };
const loggedIn = Boolean(localStorage.getItem("token"));

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      loggedIn === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
export default PrivateRoute;
