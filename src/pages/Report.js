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
import leaflet from "leaflet";
import HashLoader from "react-spinners/HashLoader";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { WiRain, WiFlood } from "weather-icons-react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Grid from "@material-ui/core/Grid";
import GREEN from "@material-ui/core/colors/green";
import RED from "@material-ui/core/colors/red";
import YELLOW from "@material-ui/core/colors/yellow";
import ORANGE from "@material-ui/core/colors/orange";

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
    { dataField: "createdAt", text: "Time ", sort: true },
    { dataField: "latitude", text: "Latitude" },
    { dataField: "longitude", text: "Longitude" },
    { dataField: "rainfall_rate", text: "Rainfall Rate" },
    { dataField: "flood_depth", text: "Flood Depth" },
  ];

  const columnsArchived = [
    { dataField: "id", text: "Report ID" },
    { dataField: "createdAt", text: "Time ", sort: true },
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
      console.log(row);
      setModalInfo(row);
      toggleTrueFalse();
    },
  };

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
  };

  const ModalContent = () => {
    var date = moment(modalInfo.createdAt).format("DD MMM YYYY (dddd) HH:mm");
    var position = [modalInfo.latitude, modalInfo.longitude];
    var imgURI = `https://rainflow.live/api/uploads/reports/${modalInfo.image}`;
    var icon = leaflet.icon({
      // iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      // shadowUrl: require ("leaflet/dist/images/marker-shadow.png"),
    });
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
    if (modalInfo.flood_depth <= 10) {
      floodText = "No Flood";
      floodColor = GREEN[500];
    } else if (modalInfo.flood_depth > 10 && modalInfo.flood_depth <= 25) {
      floodText = "Ankle Deep";
      floodColor = RED[200];
    } else if (modalInfo.flood_depth > 25 && modalInfo.flood_depth <= 70) {
      floodText = "Waist Deep";
      floodColor = RED[300];
    } else if (modalInfo.flood_depth > 70 && modalInfo.flood_depth <= 120) {
      floodText = "Neck Deep";
      floodColor = RED[400];
    } else if (modalInfo.flood_depth > 120 && modalInfo.flood_depth <= 160) {
      floodText = "Top of Head Deep";
      floodColor = RED[500];
    } else if (modalInfo.flood_depth > 160 && modalInfo.flood_depth <= 200) {
      floodText = "1-Storey High";
      floodColor = RED[600];
    } else if (modalInfo.flood_depth > 200 && modalInfo.flood_depth <= 300) {
      floodText = "1.5-Storey High";
      floodColor = RED[700];
    } else if (modalInfo.flood_depth > 300 && modalInfo.flood_depth <= 400) {
      floodText = "2-Storey High or Higher";
      floodColor = RED[800];
    } else if (modalInfo.flood_depth > 400) {
      floodText = "2-Storey Higher";
      floodColor = RED[900];
    }

    var rainText, rainColor;
    if (modalInfo.rainfall_rate === 0) {
      rainText = "No Rain";
      rainColor = GREEN[500];
    } else if (modalInfo.rainfall_rate > 0 && modalInfo.rainfall_rate < 2.5) {
      rainText = "Light Rain";
      rainColor = GREEN[700];
    } else if (
      modalInfo.rainfall_rate >= 2.5 &&
      modalInfo.rainfall_rate < 7.5
    ) {
      rainText = "Moderate Rain";
      rainColor = GREEN[900];
    } else if (modalInfo.rainfall_rate >= 7.5 && modalInfo.rainfall_rate < 15) {
      rainText = "Heavy Rain";
      rainColor = YELLOW[500];
    } else if (modalInfo.rainfall_rate >= 15 && modalInfo.rainfall_rate < 30) {
      rainText = "Intense Rain";
      rainColor = ORANGE[500];
    } else if (modalInfo.rainfall_rate >= 30) {
      rainText = "Torrential Rain";
      rainColor = RED[900];
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
              </Grid>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                {/* <hr /> */}
                <Typography variant="subtitle1">Rainfall Rate</Typography>
                <Typography variant="subtitle2" color={rainColor}>
                  <WiRain size={35} color={rainColor} />
                  {rainText}
                </Typography>
                {/* <hr /> */}
              </Grid>
              <Grid item xs={6}>
                {/* <hr /> */}
                <Typography variant="subtitle1">Flood</Typography>
                <Typography variant="subtitle2" color={floodColor}>
                  <WiFlood size={35} color={floodColor} />
                  {floodText}
                </Typography>
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
              />
            </Grid>
          </Grid>
        </Container>
      )}
      {show ? <ModalContent /> : null}
    </Container>
  );
};
