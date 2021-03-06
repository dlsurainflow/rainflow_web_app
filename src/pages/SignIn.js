import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Snackbar from "@material-ui/core/Snackbar";
// import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// import { Redirect } from "react-router-dom";

// import AlertMessage from "../components/AlertMessage";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        RainFLOW
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "#2196F3",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  },
}));

// export const Report = () => {};

export const SignIn = (props) => {
  const classes = useStyles();
  console.log("Props: " + props);

  //   handleChange(e) {
  // // this.setState({ username: event.state.username, password: event.state.password });
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openError, setOpenError] = useState(false);
  const proxyurl = "";
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // const proxyurl = "http://192.168.1.4:8080/";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenWarning(false);
    setOpenError(false);
  };

  function setLoggedIn() {
    props.handleLoggedIn();
  }

  function handleSubmit(event) {
    const url = "https://rainflow.live/api/users/login";
    setIsLoading(true);
    event.preventDefault();
    console.log("Email:", email, "Password: ", password);
    console.log(
      JSON.stringify({
        email: email,
        password: password,
      })
    );
    axios
      .post(proxyurl + url, {
        email: email,
        password: password,
      })
      .then(
        (response) => {
          console.log(response);
          setIsLoading(false);
          if (response.status === 200) {
            console.log("userID: " + response.data.data.userID);
            console.log("token: " + response.data.data.token);
            localStorage.setItem("userID", response.data.data.userID);
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("username", response.data.data.username);
            localStorage.setItem("badge", response.data.data.badge);
            localStorage.setItem("points", response.data.data.points);
            // this.props.setIsLoggedin(true);

            setLoggedIn();
            props.history.push("/");
            // <Redirect to="/" />;
          }
        },
        (error) => {
          setIsLoading(false);
          setOpenWarning(true);
          console.log(error);
          console.log("Error Status Code: " + error);
        }
      );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onInput={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onInput={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {isLoading ? <CircularProgress /> : "Log In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        open={openWarning}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          Unable to log in using provided credentials.
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Error!
        </Alert>
      </Snackbar>
    </Container>
  );
};
