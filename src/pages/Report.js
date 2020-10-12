import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Typography } from "@material-ui/core";
import { Modal, Button } from "react-bootstrap";
import moment from "moment";
import Image from "react-bootstrap/Image";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import leaflet from "leaflet";

export const Report = () => {
  // const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const getReportDetails = async () => {
    try {
    } catch (e) {
      console.error(e);
    }
  };

  const getGitHubUserWithFetch = async () => {
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
        console.log(response);
        console.log("Data: " + response.data);
        // rows = response.data;
        setRows(response.data);
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
            {/* <Container>
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
            </Container> */}
            <div>
              <h6>Rainfall Amount</h6> {modalInfo.rainfall_rate}
            </div>
            <div>
              <h6>Flood Depth</h6>
              {modalInfo.flood_depth}
            </div>
            <div>
              <h6>Image</h6>
            </div>
            <div>
              <Image src={imgURI} fluid />
            </div>
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

  return (
    <Container>
      {/* <div className={classes.paper}> */}
      <Typography component="h1" variant="h5">
        Report History
      </Typography>
      <BootstrapTable
        keyField="id"
        data={rows}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
      />
      {show ? <ModalContent /> : null}
      {/* </div> */}
    </Container>
  );
};
