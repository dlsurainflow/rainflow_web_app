import React from "react";
import { Navbar, Nav, NavItem, NavDropdown } from "react-bootstrap";
// import Styled from "styled-components";
// import { useHistory } from "react-router-dom";
import logo from "../assets/rainflow_logo.png";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
// import grey from "@material-ui/core/colors/red";
// import { Router } from "react-router-dom";
import username from "../services/username";
import MenuIcon from "@material-ui/icons/Menu";

export const NavigationBar = (props) => {
  // const localUser = JSON.parse(localStorage.getItem("user")) || {};
  // console.log("Local User: " + localUser);
  // console.log("Local User2: " + localStorage.hasOwnProperty("user"));
  const [auth, setAuth] = React.useState(localStorage.hasOwnProperty("user"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const loggedIn = Boolean(localStorage.getItem("token"));
  const username = localStorage.getItem("username");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    props.history.push("/");
    // this.router.push("/");
  };

  // return (
  //   <Navbar inverse collapseOnSelect>
  //     <Navbar.Header>
  //       <Navbar.Brand>
  //         <a href="#brand">React-Bootstrap</a>
  //       </Navbar.Brand>
  //       <Navbar.Toggle />
  //     </Navbar.Header>
  //     <Navbar.Collapse>
  //       <Nav>
  //         <NavItem eventKey={1} href="#">
  //           Link
  //         </NavItem>
  //         <NavItem eventKey={2} href="#">
  //           Link
  //         </NavItem>
  //         <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
  //           <MenuItem eventKey={3.1}>Action</MenuItem>
  //           <MenuItem eventKey={3.2}>Another action</MenuItem>
  //           <MenuItem eventKey={3.3}>Something else here</MenuItem>
  //           <MenuItem divider />
  //           <MenuItem eventKey={3.3}>Separated link</MenuItem>
  //         </NavDropdown>
  //       </Nav>
  //       <Nav pullRight>
  //         <NavItem eventKey={1} href="#">
  //           Link Right
  //         </NavItem>
  //         <NavItem eventKey={2} href="#">
  //           Link Right
  //         </NavItem>
  //       </Nav>
  //     </Navbar.Collapse>
  //   </Navbar>
  // );

  return (
    <Navbar bg="dark" variant="dark" expands="lg">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          // width="30"
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Nav className="mr-auto" pullRight>
        <Navbar.Toggle />
        <NavDropdown
          title={
            <div style={{ display: "inline-block" }}>
              <MenuIcon style={{ color: "white" }} />
            </div>
          }
        >
          <NavDropdown.Item href="/">Home</NavDropdown.Item>
          <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
          <NavDropdown.Item href="/about">About</NavDropdown.Item>
          <NavDropdown.Item href="/docs">Docs</NavDropdown.Item>
          <NavDropdown.Divider />

          {props.isLoggedin ? (
            <div>
              <NavDropdown.Item href="/report">Reports</NavDropdown.Item>
              <NavDropdown.Item href="/change-password">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </div>
          ) : (
            <div>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Register</NavDropdown.Item>
            </div>
          )}
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};
