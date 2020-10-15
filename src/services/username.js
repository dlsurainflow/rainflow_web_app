// import React from "react";

const loggedIn = () => {
  const username = localStorage.getItem("username");

  if (username !== null) {
    return username;
  } else {
    return null;
  }
};

export default loggedIn;
