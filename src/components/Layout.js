import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";
import { makeStyles } from "@material-ui/core/styles";
// import { useLocation } from "react-router-dom";

export const Layout = (props) => {
  const classes = useStyles();
  return (
    <Fragment>
      <NavigationBar isLoggedin={props.isLoggedin} />
      <Container className = {classes.root}>{props.children}</Container>
    </Fragment>
  );
};

const useStyles = makeStyles({
  root: {
    minWidth:"100%",
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 0
  },
});