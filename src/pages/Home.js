import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import Container from "@material-ui/core/Container";

function Map() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 14.5647642,
    longitude: 120.9931652,
    zoom: 4,
  });

  const TOKEN =
    "pk.eyJ1Ijoid2lseWZyZWRkaWUiLCJhIjoiY2s0bTQ4dWkzMTNhZDNrcThkcWRnZG00aiJ9.uSqu6RO986ym7qQt_guHSg";

  return (
    <ReactMapGL
      mapboxApiAccessToken={TOKEN}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
}

export const Home = () => {
  return (
    // <Container>
    <Map />
    // </Container>
  );
};
