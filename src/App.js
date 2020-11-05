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
// import { NoMatch } from "./pages/NoMatch";
import { About } from "./pages/About";
import { ResetPassword } from "./pages/ResetPassword";
import { ResetPasswordWithParams } from "./pages/ResetPasswordWithParams";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ChangePassword } from "./pages/ChangePassword";
// import { Logout } from "./pages/Logout";
import { Layout } from "./components/Layout";
// import { NavigationBar } from "./components/NavigationBar";
import { MobileMap } from "./pages/MobileMap";
import { Docs } from "./pages/Docs";
// import PublicRoute from "./auth/PublicRoute";
// import PrivateRoute from "./auth/PrivateRoute";
// import Container from "@material-ui/core/Container";

function App(props) {
  var [isLoggedin, setIsLoggedin] = useState(
    Boolean(localStorage.getItem("token"))
  );
  // const [isNavBarHidden, setIsNavBarHidden] = useState(false);
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(isNavBarHidden);
  // }, [isNavBarHidden]);

  // useEffect(() => {
  //   console.log("Location changed!");
  //   console.log(location);
  // }, [location]);
  const handleLoggedIn = (e) => {
    setIsLoggedin(true);
    // props.history.push("/");
    // return <Redirect to="/" />;
    // history.push("/");
  };

  const DefaultContainer = () => (
    <Layout isLoggedin={isLoggedin}>
      <Route exact path="/" component={Home} />

      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/report" component={Report} />
      <Route exact path="/about" component={About} />
      <Route exact path="/docs" component={Docs} />
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
      <Route
        path="/reset-password/:token_params/:email_params"
        component={ResetPasswordWithParams}
      />
      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/change-password" component={ChangePassword} />
      <Route
        exact
        path="/login"
        component={(props) => (
          <SignIn {...props} handleLoggedIn={handleLoggedIn} />
        )}
      />
      {/* <Route component={NoMatch} /> */}
    </Layout>
  );

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/mobile/map/:token_params/:latitude_params/:longitude_params" component={MobileMap} />
          <Route component={DefaultContainer} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
