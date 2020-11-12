import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../assets/rainflow_logo.png";
import MenuIcon from "@material-ui/icons/Menu";
import { Tooltip } from "evergreen-ui";
import Image from "react-bootstrap/Image";

export const NavigationBar = (props) => {
  const username = localStorage.getItem("username");
  const points = localStorage.getItem("points");
  const badge = localStorage.getItem("badge");

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
          <NavDropdown.Item href="/badge-index">Badge Index</NavDropdown.Item>
          <NavDropdown.Item href="/docs">Docs</NavDropdown.Item>
          <NavDropdown.Divider />

          {props.isLoggedin ? (
            <div>
              <NavDropdown.Item href="/report">Report History</NavDropdown.Item>
              <NavDropdown.Item href="/change-password">
                Change Password
              </NavDropdown.Item>
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </div>
          ) : (
            <div>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
            </div>
          )}
        </NavDropdown>
      </Nav>
      {props.isLoggedin ? (
        <Nav>
          {" "}
          <Navbar.Text color="#F9F9FB">
            {username}{" "}
            {badge !== null ? (
              <Tooltip
                content={`Points: ${points}`}
                appearance="card"
                // position={Position.BOTTOM}
              >
                <Image
                  src={`https://rainflow.live/api/images/badges/${badge}`}
                  height="20"
                />
              </Tooltip>
            ) : null}
          </Navbar.Text>
        </Nav>
      ) : (
        <Nav>
          <Navbar.Text color="#F9F9FB">guest</Navbar.Text>
        </Nav>
      )}
    </Navbar>
  );
};
