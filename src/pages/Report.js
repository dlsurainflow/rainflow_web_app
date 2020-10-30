import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Typography } from "@material-ui/core";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import Image from "react-bootstrap/Image";
// import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import ReactMapGL, { Marker } from "react-map-gl";
// import leaflet from "leaflet";
import HashLoader from "react-spinners/HashLoader";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { WiRain, WiFlood } from "weather-icons-react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Grid from "@material-ui/core/Grid";
import { Heading } from "evergreen-ui";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
// import Button from "react-bootstrap/Button";

export const Report = () => {
  // const classes = useStyles();
  const [rowsActive, setRowsActive] = useState([]);
  const [rowsArchived, setRowsArchived] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [withoutNoDataText, setwithoutNoDataText] = useState(true);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const proxyurl = "";
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const columns = [
    { dataField: "id", text: "Report ID" },
    {
      dataField: "createdAt",
      text: "Time ",
      sort: true,
    },
    { dataField: "latitude", text: "Latitude" },
    { dataField: "longitude", text: "Longitude" },
    { dataField: "rainfall_rate", text: "Rainfall Rate" },
    { dataField: "flood_depth", text: "Flood Depth" },
  ];

  const columnsArchived = [
    { dataField: "id", text: "Report ID" },
    {
      dataField: "createdAt",
      text: "Time ",
      sort: true,
    },
    { dataField: "latitude", text: "Latitude" },
    { dataField: "longitude", text: "Longitude" },
    { dataField: "rainfall_rate", text: "Rainfall Rate" },
    { dataField: "flood_depth", text: "Flood Depth" },
  ];

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const options = {
    noDataText: "No reports found.",
    withoutNoDataText: true,
  };

  const getGitHubUserWithFetch = async () => {
    setLoading(true);
    const userID = localStorage.getItem("userID");
    const token = localStorage.getItem("token");
    // console.log("User: " + user);
    axios
      .get(proxyurl + `https://rainflow.live/api/report/user/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        console.log("Data: " + response.data);
        // rows = response.data;
        // setRows(response.data);
        // console.log(response.data);
        setRowsActive(response.data.active);
        setRowsArchived(response.data.archive);
        console.log(!Object.keys(response.data.active).length);
        if (!Object.keys(response.data).length) {
          setwithoutNoDataText(true);
        }
        console.log("Rows: " + JSON.stringify(response.data));
      });
  };

  const rowEvents = {
    onClick: (e, row) => {
      row.from = "archive";
      console.log(row);
      setModalInfo(row);
      toggleTrueFalse();
    },
  };

  const rowEventsActive = {
    onClick: (e, row) => {
      row.from = "active";
      console.log(row);
      setModalInfo(row);
      toggleTrueFalse();
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  const ModalContent = () => {
    console.log(modalInfo);
    var date = moment(modalInfo.createdAt).format("DD MMM YYYY (dddd) HH:mm");
    // var position = [modalInfo.latitude, modalInfo.longitude];
    var imgURI = `https://rainflow.live/api/uploads/reports/${modalInfo.image}`;
    // var icon = leaflet.icon({
    //   // iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    //   iconUrl: require("leaflet/dist/images/marker-icon.png"),
    //   // shadowUrl: require ("leaflet/dist/images/marker-shadow.png"),
    // });
    var imgExists;
    if (modalInfo.image === null) imgExists = false;
    else imgExists = true;

    const viewport = {
      width: "100%",
      height: "25vh",
      latitude: modalInfo.latitude,
      longitude: modalInfo.longitude,
      zoom: 16,
    };

    const TOKEN =
      "pk.eyJ1Ijoid2lseWZyZWRkaWUiLCJhIjoiY2s0bTQ4dWkzMTNhZDNrcThkcWRnZG00aiJ9.uSqu6RO986ym7qQt_guHSg";

    var floodText, floodColor;
    var rainText, rainColor;

    if (modalInfo.rainfall_rate === 0) {
      rainText = "No Rain";
      rainColor = "#0eae4e";
    } else if (modalInfo.rainfall_rate > 0 && modalInfo.rainfall_rate < 2.5) {
      rainText = "Light Rain";
      rainColor = "#b2cf35";
    } else if (
      modalInfo.rainfall_rate >= 2.5 &&
      modalInfo.rainfall_rate < 7.5
    ) {
      rainText = "Moderate Rain";
      rainColor = "#fece08";
    } else if (modalInfo.rainfall_rate >= 7.5 && modalInfo.rainfall_rate < 15) {
      rainText = "Heavy Rain";
      rainColor = "#f38f20";
    } else if (modalInfo.rainfall_rate >= 15 && modalInfo.rainfall_rate < 30) {
      rainText = "Intense Rain";
      rainColor = "#ec193a";
    } else if (modalInfo.rainfall_rate >= 30) {
      rainText = "Torrential Rain";
      rainColor = "#c12123";
    }

    if (modalInfo.flood_depth <= 10) {
      floodText = "No Flood";
      floodColor = "#0eae4e";
    } else if (modalInfo.flood_depth > 10 && modalInfo.flood_depth <= 25) {
      floodText = "Ankle Deep";
      floodColor = "#b2cf35";
    } else if (modalInfo.flood_depth > 25 && modalInfo.flood_depth <= 70) {
      floodText = "Knee Deep";
      floodColor = "#fece08";
    } else if (modalInfo.flood_depth > 70 && modalInfo.flood_depth <= 120) {
      floodText = "Waist Deep";
      floodColor = "#f38f20";
    } else if (modalInfo.flood_depth > 120 && modalInfo.flood_depth <= 160) {
      floodText = "Neck Deep";
      floodColor = "#bf2125";
    } else if (modalInfo.flood_depth > 160 && modalInfo.flood_depth <= 200) {
      floodText = "Top of Head Deep";
      floodColor = "#c12123";
    } else if (modalInfo.flood_depth > 200 && modalInfo.flood_depth <= 300) {
      floodText = "1-Storey High";
      floodColor = "#931518";
    } else if (modalInfo.flood_depth > 300 && modalInfo.flood_depth <= 450) {
      floodText = "1.5-Storeys High";
      floodColor = "#7a1331";
    } else if (modalInfo.flood_depth > 450) {
      floodText = "2-Storey Higher";
      floodColor = "#5e011c";
    }

    return (
      <Modal show={show} onHide={handleClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography component="h4" variant="h5" color={rainColor}>
                    Report ID {modalInfo.id}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography component="h4" variant="h6" color={rainColor}>
                    {date}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {/* <HandThumbsUp variant /> */}
                  <Button variant="success" disabled>
                    <HandThumbsUp color="white" size={20} />{" "}
                    {modalInfo.upvote.length}
                  </Button>{" "}
                  <Button variant="danger" disabled>
                    <HandThumbsDown color="white" size={20} />{" "}
                    {modalInfo.downvote.length}
                  </Button>{" "}
                </Grid>
              </Grid>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                {/* <hr /> */}
                <Typography variant="subtitle1">Rainfall Rate</Typography>
                <Heading color={rainColor}>
                  <WiRain size={35} color={rainColor} />
                  {rainText}
                </Heading>
                {/* <hr /> */}
              </Grid>
              <Grid item xs={6}>
                {/* <hr /> */}
                <Typography variant="subtitle1">Flood</Typography>
                <Heading color={floodColor}>
                  <WiFlood size={35} color={floodColor} />
                  {floodText}
                </Heading>
                {/* <hr /> */}
              </Grid>
              <Grid item xs={12}>
                {/* <hr /> */}
                <Typography variant="subtitle1">Location</Typography>
                <ReactMapGL mapboxApiAccessToken={TOKEN} {...viewport}>
                  <Marker
                    latitude={modalInfo.latitude}
                    longitude={modalInfo.longitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                  >
                    <LocationOnIcon style={{ color: "#d50000" }} />
                  </Marker>
                </ReactMapGL>
                {/* <hr /> */}
              </Grid>
              {imgExists ? (
                <Grid item xs={12}>
                  {/* <hr /> */}
                  <Typography variant="subtitle1">Image</Typography>
                  <Image src={imgURI} fluid />
                  {/* <hr /> */}
                </Grid>
              ) : null}
              {modalInfo.description !== null &&
              modalInfo.description !== "" ? (
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Description</Typography>
                  {modalInfo.description}
                </Grid>
              ) : null}
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    );
  };

  const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <Container alignItems="center">
      {/* <div className={classes.paper}> */}

      {loading ? (
        <div style={style}>
          <HashLoader
            // css={override}
            size={100}
            color={"#26c6da"}
            loading={loading}
          />
        </div>
      ) : (
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4">
                Report History
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h5" variant="h6">
                Active
              </Typography>
              <BootstrapTable
                keyField="id"
                hover="true"
                data={rowsActive}
                columns={columns}
                pagination={paginationFactory()}
                rowEvents={rowEvents}
                options={options}
                defaultSortDirection="desc"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="h5" variant="h6">
                Archived
              </Typography>
              <BootstrapTable
                keyField="id"
                hover="true"
                data={rowsArchived}
                columns={columnsArchived}
                pagination={paginationFactory()}
                rowEvents={rowEvents}
                options={options}
                defaultSortDirection="asc"
              />
            </Grid>
          </Grid>
        </Container>
      )}
      {show ? <ModalContent /> : null}
    </Container>
  );
};
