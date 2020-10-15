import React from "react";
import { Navbar, Nav } from "react-bootstrap";
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

  return (
    <Navbar bg="dark" variant="dark" expands="lg">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={logo}
          // width="30"
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
      </Nav>

      {/* {auth && (
        
      )} */}

      {props.isLoggedin ? (
        <div>
          {/* {username} */}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle style={{ color: "white" }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <Nav.Link href="/report" style={{ color: "black" }}>
              Reports
            </Nav.Link>
            <Nav.Link href="/logout" style={{ color: "black" }}>
              Logout
            </Nav.Link>
            {/* <MenuItem onClick={props.history.}>Report</MenuItem> */}
            {/* <MenuItem onClick={handleLogout}>Logout</MenuItem> */}
          </Menu>
        </div>
      ) : (
        <Nav>
          <Nav.Link href="/login">Login</Nav.Link>{" "}
          <Nav.Link href="/register">Register</Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};
