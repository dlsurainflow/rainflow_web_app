import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";
// import { useLocation } from "react-router-dom";

export const Layout = (props) => {
  return (
    <Fragment>
      <NavigationBar isLoggedin={props.isLoggedin} />
      <Container>{props.children}</Container>
    </Fragment>
  );
};
