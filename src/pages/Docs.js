import React from "react";
import Container from "@material-ui/core/Container";
// import animationData from "../lotties/4203-take-a-selfie.json";
import Lottie from "react-lottie";
import animation from "../assets/working.json";

export const Docs = () => {
  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container alignItems="center">
      <div style={style}>
        {/* <Jumbotron> */}
        <center>
          <Lottie options={defaultOptions} height={400} width={400} />
          <h5>Hold tight! Currently being worked on!</h5>
        </center>
        {/* </Jumbotron> */}
      </div>
    </Container>
  );
};
