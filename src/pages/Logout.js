import React from "react";
import Container from "@material-ui/core/Container";

function DestroyStorage(props) {
  localStorage.removeItem("token");
  localStorage.removeItem("userID");
  localStorage.removeItem("username");
  props.history.push("/");
}

// export const Logout = (props) => <DestroyStorage />;

export const Logout = (props) => {
  return (
    <Container>
      <h1>Logging out.</h1> <DestroyStorage />
    </Container>
  );
};
