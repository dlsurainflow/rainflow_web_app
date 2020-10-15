import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Report } from "./pages/Report";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { NoMatch } from "./pages/NoMatch";
import { About } from "./pages/About";
import { ResetPassword } from "./pages/ResetPassword";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Logout } from "./pages/Logout";
import { Layout } from "./components/Layout";
import { NavigationBar } from "./components/NavigationBar";
import PublicRoute from "./auth/PublicRoute";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  var [isLoggedin, setIsLoggedin] = useState(
    Boolean(localStorage.getItem("token"))
  );
  console.log(isLoggedin);
  return (
    <React.Fragment>
      <NavigationBar isLoggedin={isLoggedin} />
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/login"
              component={SignIn}
              setIsLoggedin={setIsLoggedin}
            />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/report" component={Report} />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/reset-password/:id/:email"
              component={ResetPassword}
            />
            <Route exact path="/reset-password/" component={ResetPassword} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/logout"
              component={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userID");
                localStorage.removeItem("username");
                setIsLoggedin(false);
                return <Redirect to="/" />;
              }}
            />
            <Route
              path="/dashboard"
              component={() => {
                window.location.href = "https://dashboard.rainflow.live";
                return null;
              }}
            />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </Layout>
    </React.Fragment>
  );
}

export default App;
