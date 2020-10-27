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
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
var SHA256 = require("crypto-js/sha256");
var validator = require("validator");

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
    backgroundColor: theme.palette.secondary.main,
    background: "linear-gradient(45deg, #ff9800 30%, #e65100 90%)",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "linear-gradient(45deg, #ff9800 30%, #e65100 90%)",
  },
}));

// export default function SignUp() {
export const SignUp = (props) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [passNotMatch, setPassNotMatch] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    if (
      username !== "" ||
      password !== "" ||
      password2 !== "" ||
      email !== ""
    ) {
      if (password !== password2) {
        setIsLoading(false);
        setOpenError(true);
        setErrorMessage("Passwords do not match!");
      } else {
        var hashedPassword = SHA256(password).toString();
        console.log(hashedPassword);
        axios
          .post("https://dashboard.rainflow.live/api/v1/signup", {
            companyAddress: "",
            companySize: "",
            contactPerson: "",
            contactPhone: mobileNumber,
            email: email,
            password: hashedPassword,
            password2: password2,
            phone: "",
            tenantType: 1,
            username: username,
          })
          .then(
            (response) => {
              setIsLoading(false);
              if (response.status === 200) {
                setOpenSuccess(true);
                props.history.push("/");
              }
            },
            (error) => {
              console.log(error);
              if (error.response.data.message === "Data has exist") {
                setIsLoading(false);
                setErrorMessage("Account already exists.");
                setOpenError(true);
              } else {
                setIsLoading(false);
                setErrorMessage(error.response.data.message);
                setOpenError(true);
              }
            }
          );
      }
    } else {
      setIsLoading(false);
      setOpenError(true);
      setErrorMessage("Required fields should not be empty!");
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
          Sign Up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // autoComplete="fname"
                // name="firstName"
                variant="outlined"
                required
                fullWidth
                // id="firstName"
                label="Username"
                autoFocus
                onInput={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // id="lastName"
                label="Email Address"
                // name="lastName"
                error={emailValid}
                autoComplete="email"
                onInput={(e) => {
                  setEmail(e.target.value);
                  setEmailValid(!validator.isEmail(e.target.value));
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // name="password"
                label="Password"
                type="password"
                // id="password"
                // autoComplete="current-password"
                error={passNotMatch}
                onInput={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                // name="password"
                label="Enter Password Again"
                type="password"
                // id="password"
                // autoComplete="current-password"
                error={passNotMatch}
                onInput={(e) => {
                  setPassword2(e.target.value);
                  if (e.target.value !== password) {
                    setPassNotMatch(true);
                  } else {
                    setPassNotMatch(false);
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                // name="password"
                label="Mobile Number"
                // type="password"
                // id="password"
                // autoComplete="current-password"
                onInput={(e) => setMobileNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              * Required
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
            {isLoading ? <CircularProgress /> : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Account created! Please login.
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
