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

  const columns = [
    { dataField: "id", text: "Report ID" },
    { dataField: "createdAt", text: "Time " },
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
      .get(
        `https://cors-anywhere.herokuapp.com/https://rainflow.live/api/report/user/${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
      width: "22.5vw",
      height: "25vh",
      latitude: modalInfo.latitude,
      longitude: modalInfo.longitude,
      zoom: 16,
    };

    const TOKEN =
      "pk.eyJ1Ijoid2lseWZyZWRkaWUiLCJhIjoiY2s0bTQ4dWkzMTNhZDNrcThkcWRnZG00aiJ9.uSqu6RO986ym7qQt_guHSg";

    return (
      <Modal show={show} onHide={handleClose}>
        <Container>
          <Modal.Header closeButton>
            <Modal.Title>
              <div>
                <h4>Report ID {modalInfo.id}</h4>
              </div>
              <div>
                <h5>{date}</h5>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h6>Location</h6>
            </div>
            <div>
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
              {/*<div>
                <Map center={position} zoom="15">
                  <TileLayer
                    // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position} icon={icon}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </Map>
              </div> */}
            </div>
            <div>
              <h6>Rainfall Amount</h6> {modalInfo.rainfall_rate}
            </div>
            <div>
              <h6>Flood Depth</h6>
              {modalInfo.flood_depth}
            </div>
            {imgExists ? (
              <div>
                <div>
                  <h6>Image</h6>
                </div>
                <div>
                  <Image src={imgURI} fluid />
                </div>
              </div>
            ) : null}
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
          <Typography component="h1" variant="h4">
            Report History
          </Typography>
          <Typography component="h5" variant="h6">
            Active
          </Typography>
          <BootstrapTable
            keyField="id"
            data={rowsActive}
            columns={columns}
            pagination={paginationFactory()}
            rowEvents={rowEvents}
            options={options}
          />
          <Typography component="h5" variant="h6">
            Archived
          </Typography>
          <BootstrapTable
            keyField="id"
            data={rowsArchived}
            columns={columns}
            pagination={paginationFactory()}
            rowEvents={rowEvents}
            options={options}
          />
        </Container>
      )}
      {/* <HashLoader
        // css={override}
        size={150}
        color={"#123abc"}
        loading={loading}
      />
      <BootstrapTable
        keyField="id"
        data={rows}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
        options={options}
      /> */}
      {show ? <ModalContent /> : null}
      {/* </div> */}
      {/* </div> */}
    </Container>
  );
};
