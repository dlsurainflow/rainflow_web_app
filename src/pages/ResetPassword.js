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
// import { useParams } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// import { Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://rainflow.live/">
        RainFLOW Network
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
    background: "linear-gradient(45deg, #00838f 30%, #4db6ac 90%)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #00838f 30%, #4db6ac 90%)",
  },
}));

// export default function SignUp() {
export const ResetPassword = (props) => {
  // let { token_params, email_params } = useParams();
  const classes = useStyles();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  // const [tokenDisabled, setTokenDisabled] = useState(true);
  // const [emailDisabled, setEmailDisabled] = useState(true);
  const [password, setPassword] = useState();
  const [password1, setPassword1] = useState();
  const [passNotMatch, setPassNotMatch] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const proxyurl = "";

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    // setOpenWarning(false);
    setOpenError(false);
    setErrorMessage("");
  };

  function handleSubmit(event) {
    setIsLoading(true);
    event.preventDefault();
    if (password !== password1) {
      setIsLoading(false);
      setOpenError(true);
      setErrorMessage("Passwords do not match!");
    } else {
      console.log("email:", email, "Password: ", password, "Token: ", token);
      const url = "https://rainflow.live/api/users/reset-password";
      axios
        .post(proxyurl + url, {
          token: token,
          email: email,
          password: password,
        })
        .then(
          (response) => {
            console.log(response);
            setIsLoading(false);
            if (response.status === 200) {
              setOpenSuccess(true);
              props.history.push("/login");
            }
          },
          (error) => {
            setIsLoading(false);
            setErrorMessage(error);
            setOpenError(true);
            console.log(error);
            console.log("Error Status Code: " + error);
          }
        );
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="token"
                label="token"
                name="token"
                autoComplete="off"
                // disabled={tokenDisabled}
                // defaultValue={token}
                onInput={(e) => setToken(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // id="email"
                label="Email Address"
                // name="email"
                // autoComplete="email"
                // disabled={emailDisabled}
                // defaultValue={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                error={passNotMatch}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password1"
                label="Enter Password Again"
                type="password"
                id="password1"
                autoComplete="current-password1"
                error={passNotMatch}
                onInput={(e) => {
                  setPassword1(e.target.value);
                  console.log(
                    "Password: " + password + " Password1: " + e.target.value
                  );
                  if (e.target.value !== password) {
                    setPassNotMatch(true);
                  } else {
                    setPassNotMatch(false);
                  }
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {isLoading ? <CircularProgress /> : "Reset Password"}
          </Button>
        </form>
        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Password has been succesfully reset! Please login using your new
            password.
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};
