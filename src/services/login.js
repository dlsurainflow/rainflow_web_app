// import React from "react";

const loggedIn = () => {
  // const token = localStorage.getItem("token");
  // console.log("Token: " + token);
  // if (token !== null) {
  //   return true;
  // } else {
  //   return false;
  // }
  return Boolean(localStorage.getItem("token"));
};

export default loggedIn;
