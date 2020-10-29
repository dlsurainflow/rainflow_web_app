import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "../App.css";
import { Pane, Heading, Card, Text } from "evergreen-ui";
import {
  WiRain,
  WiFlood,
  WiThermometer,
  WiBarometer,
  WiHumidity,
  WiRaindrops,
} from "weather-icons-react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import ViewList from "@material-ui/icons/ViewList";
import moment from "moment";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import { Line } from "react-chartjs-2";
import L from "leaflet";

function MapFunction() {
  let { token_params } = useParams();
  const [mapData, setMapData] = useState();
  const [raftMarkers, setRaftMarkers] = useState();
  const [mobileMarkers, setMobileMarkers] = useState();
  const [isOpen, setIsOpen] = useState();
  const [nodeType, setNodeType] = useState("RAFT");
  const proxyurl = "";
  
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const [raftInfo, setRaftInfo] = useState({
    id: null,
    latitude: null,
    longitude: null,
    altitude: null,
    flood_depth: null,
    rainfall_amount: null,
    rainfall_rate: null,
    temperature: null,
    pressure: null,
    humidity: null,
    username: null,
    updatedAt: null,
    charts: null,
    FD1: [],
    TMP1: [],
    RA1: [],
    PR1: [],
    HU1: [],
  });
  const [reportInfo, setReportInfo] = useState({
    id: null,
    latitude: null,
    longitude: null,
    flood_depth: null,
    rainfall_rate: null,
    username: null,
    updatedAt: null,
    image: null,
    upvote: null,
    downvote: null,
    currentAction: null,
  });
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const fetchData = async () => {
  
    const url = "https://rainflow.live/api/map/all";

    await fetch(proxyurl + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200)
          response.json().then((data) => {
            setMapData(data);
          });
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    if (mapData == null) {
      fetchData();
    } else {
      setRaftMarkers(
        mapData.raft.map((data) => {
          console.log("raft: ", data);
          return (
            <Marker
              key={data.id}
              position={[data.latitude, data.longitude]}
              icon={markerPicker(data.rainfall_rate, data.flood_depth)}
              onclick={() => {
                setNodeType("RAFT");
                const url = `https://rainflow.live/api/raft/charts/${data.deviceID}`;

                fetch(proxyurl + url, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  },
                }).then((response) => {
                  if (response.status === 200)
                    response
                      .json()
                      .then((_data) => {
                        onSideSheetHandler();
                        setRaftInfo({
                          id: data.id,
                          latitude: data.latitude,
                          longitude: data.longitude,
                          altitude: data.altitude,
                          flood_depth: data.flood_depth,
                          rainfall_amount: data.rainfall_amount,
                          rainfall_rate: data.rainfall_rate,
                          temperature: data.temperature,
                          humidity: data.humidity,
                          pressure: data.pressure,
                          username: data.username,
                          updatedAt: moment(data.updatedAt).format(
                            "DD MMM YYYY (dddd) HH:mm"
                          ),
                          charts: _data,
                          FD1: _data.FD1,
                          TMP1: _data.TMP1,
                          RA1: _data.RA1,
                          PR1: _data.PR1,
                          HU1: _data.HU1,
                        });
                      })
                      .catch((error) => console.error("Error:", error));
                });
              }}
            />
          );
        })
      );
      console.log("Mobile: ", mapData.mobile);
      console.log("RAFT: ", mapData.raft);
      setMobileMarkers(
        mapData.mobile.map((data) => {
          return (
            <Marker
              key={data.id}
              icon={markerPicker(data.rainfall_rate, data.flood_depth)}
              position={[data.latitude, data.longitude]}
              onclick={() => {
                setNodeType("Mobile");
                reportInfoHandler(data.id, data.username);
              }}
            />
          );
        })
      );
    }
  }, [mapData]);

  const reportInfoHandler = async (id, username) => {
    const url = `https://rainflow.live/api/report/${id}`;
    var header;
    if (token_params === "guest") {
      header = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
    } else {
      header = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token_params}`,
      };
    }

    await fetch(proxyurl + url, {
      method: "GET",
      headers: header,
    }).then((response) => {
      if (response.status === 200)
        response.json().then((data) => {
          setReportInfo({
            id: data.id,
            latitude: data.latitude,
            longitude: data.longitude,
            flood_depth: data.flood_depth,
            rainfall_rate: data.rainfall_rate,
            username: username,
            updatedAt: moment(data.createdAt).format(
              "DD MMM YYYY (dddd) HH:mm"
            ),
            image: data.image,
            upvote: data.upvote,
            downvote: data.downvote,
            currentAction: data.currentAction,
          });
          onSideSheetHandler();
        });
      else {
        console.log(`Error retrieving reports! (Code: ${response.status})`);
      }
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setRaftInfo({
      id: null,
      latitude: null,
      longitude: null,
      altitude: null,
      flood_depth: null,
      rainfall_amount: null,
      temperature: null,
      pressure: null,
      humidity: null,
      username: null,
      updatedAt: null,
      FD1: [],
      TMP1: [],
      RA1: [],
      PR1: [],
      HU1: [],
    });

    setReportInfo({
      id: null,
      latitude: null,
      longitude: null,
      flood_depth: null,
      rainfall_rate: null,
      username: null,
      updatedAt: null,
      image: null,
      upvote: null,
      downvote: null,
      currentAction: null,
    });
  };

  function markerPicker(rainfall_rate, flood_depth) {
    var rain;
    var flood;

    if (rainfall_rate === 0) {
      rain = "A";
    } else if (rainfall_rate > 0 && rainfall_rate < 2.5) {
      rain = "B";
    } else if (rainfall_rate >= 2.5 && rainfall_rate < 7.5) {
      rain = "C";
    } else if (rainfall_rate >= 7.5 && rainfall_rate < 15) {
      rain = "D";
    } else if (rainfall_rate >= 15 && rainfall_rate < 30) {
      rain = "E";
    } else if (rainfall_rate >= 30) {
      rain = "F";
    }

    if (flood_depth <= 10) {
      flood = "A";
    } else if (flood_depth > 10 && flood_depth <= 25) {
      flood = "B";
    } else if (flood_depth > 25 && flood_depth <= 70) {
      flood = "C";
    } else if (flood_depth > 70 && flood_depth <= 120) {
      flood = "D";
    } else if (flood_depth > 120 && flood_depth <= 160) {
      flood = "E";
    } else if (flood_depth > 160 && flood_depth <= 200) {
      flood = "F";
    } else if (flood_depth > 200 && flood_depth <= 300) {
      flood = "G";
    } else if (flood_depth > 300 && flood_depth <= 450) {
      flood = "H";
    } else if (flood_depth > 450) {
      flood = "I";
    }

    return L.icon({
      iconUrl: `https://rainflow.live/api/images/marker/0_${rain}${flood}.png`,
      iconSize: [50, 50],
      iconAnchor: [28, 47],
      popupAnchor: [-5, -43],
    });
  }

  const onSideSheetHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
       <Modal
        show={isOpen}
        onHide={handleClose}
        dialogClassName= 'modal-main'
        animation={false}
      >
        {nodeType === "Mobile" ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <Pane flex="1" flexDirection="row" backgroundColor="#fff">
                  <Pane
                    display="inline-flex"
                    flexDirection="column"
                    padding={10}
                  >
                    <Heading size={700}>Report ID {reportInfo.id}</Heading>
                    <Text size={500}>{reportInfo.updatedAt}</Text>
                    <Text size={500}>Reported by {reportInfo.username}</Text>
                    <Pane
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button variant="success">
                        <HandThumbsUp color="white" size={20} />{" "}
                        {reportInfo.upvote}
                      </Button>{" "}
                      <Button variant="danger">
                        <HandThumbsDown color="white" size={20} />{" "}
                        {reportInfo.downvote}
                      </Button>
                    </Pane>
                  </Pane>
                </Pane>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <Pane
                flex="1"
                height={windowHeight * 0.8}
                overflow={"auto"}
                background="#F9F9FB"
                paddingX={5}
                margin={0}
              >
                <Card
                  backgroundColor="white"
                  elevation={0}
                  height={65}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  alignContent="center"
                  padding={20}
                  marginY={10}
                >
                  <WiRain size={30} color="black" />
                  <Heading size={100} marginLeft={5}>
                    RAINFALL RATE
                  </Heading>
                  <Heading size={600} marginLeft={10}>
                    {reportInfo.rainfall_rate}
                  </Heading>
                  <Heading size={300} marginLeft={5}>
                    mm/Hr
                  </Heading>
                </Card>
                <Card
                  backgroundColor="white"
                  elevation={0}
                  height={65}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  padding={20}
                  marginY={10}
                >
                  <WiFlood size={30} color="black" />
                  <Heading size={100} marginLeft={5}>
                    FLOOD DEPTH
                  </Heading>
                  <Heading size={600} marginLeft={10}>
                    {reportInfo.flood_depth}
                  </Heading>
                  <Heading size={300} marginLeft={5}>
                    cm
                  </Heading>
                </Card>
                {reportInfo.image !== null ? (
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    padding={20}
                    marginY={10}
                  >
                    <Pane
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Heading size={100}>PHOTO </Heading>
                      <Image
                        src={`https://rainflow.live/api/uploads/reports/${reportInfo.image}`}
                        fluid
                      />
                    </Pane>
                  </Card>
                ) : null}
                {reportInfo.description !== null &&
                reportInfo.description !== "" ? (
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    padding={20}
                    marginY={10}
                  >
                    <Pane
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Heading size={100}>Description </Heading>
                      <Text>{reportInfo.description}</Text>
                    </Pane>
                  </Card>
                ) : null}
              </Pane>
            </Modal.Body>
          </>
        ) : null}

        {nodeType === "RAFT" ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <Pane flex="1" flexDirection="row" backgroundColor="#fff">
                  <Pane
                    display="inline-flex"
                    flexDirection="column"
                    padding={10}
                  >
                    <Heading size={700}>RAFT Device</Heading>
                    <Text size={500}>{raftInfo.updatedAt}</Text>
                    <Text size={500}>Owned by {raftInfo.username}</Text>
                  </Pane>
                </Pane>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <Pane
                flex="1"
                height={windowHeight * 0.8}
                overflow={"auto"}
                background="#F9F9FB"
                paddingX={5}
                margin={0}
              >
                <Card
                  backgroundColor="white"
                  elevation={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  alignContent="center"
                  padding={20}
                  marginY={10}
                  flexDirection="column"
                >
                  <Pane
                    flex="1"
                    // height={windowHeight * 0.8}
                    width="100%"
                    // overflow={"auto"}
                    // background="#F9F9FB"
                    justifyContent="flex-start"
                    alignItems = "center"
                    paddingX={5}
                    margin={0}
                    display="inline-flex"
                    flexDirection="row"
                  >
                    <WiRain size={30} color="black" />
                    <Heading size={100} marginLeft={5}>
                      RAINFALL RATE
                    </Heading>
                    <Heading size={600} marginLeft={10}>
                      {raftInfo.rainfall_rate}
                    </Heading>
                    <Heading size={400} marginLeft={5}>
                      {"mm/day"}
                    </Heading>
                  </Pane>
                  <Pane
                    flex="1"
                    // height={windowHeight * 0.8}
                    width="100%"
                    // overflow={"auto"}
                    // background="#F9F9FB"
                    justifyContent="flex-start"
                    alignItems = "center"
                    paddingX={5}
                    margin={0}
                    display="inline-flex"
                    flexDirection="row"
                  >
                    <WiRaindrops size={30} color="black" />
                    <Heading size={100} marginLeft={5}>
                      TOTAL RAINFALL AMOUNT
                    </Heading>
                    <Heading size={600} marginLeft={10}>
                      {raftInfo.rainfall_amount}
                    </Heading>
                    <Heading size={300} marginLeft={5}>
                      {"mm/day"}
                    </Heading>
                  </Pane>

                  {raftInfo.RA1 !== null || raftInfo.RA1 !== "" ? (
                    <Pane flex="1" width="100%">
                      <Line
                        data={{
                          labels: raftInfo.RA1.map((k) =>
                            moment.unix(k.time).format("h:mm")
                          ),
                          datasets: [
                            {
                              data: raftInfo.RA1.map((k) => k.value),
                              fill: true,
                              // width: "125%",
                              // height: "75%",
                              backgroundColor: "#00695c",
                              borderColor: "#00796b",
                            },
                          ],
                        }}
                        options={{
                          aspectRatio: 1,
                          // maintainAspectRatio: false,
                          legend: {
                            display: false,
                          },
                          scales: {
                            xAxes: [{ display: false }],
                            yAxes: [{ display: true }],
                          },
                        }}
                      />
                    </Pane>
                  ) : null}
                </Card>

                <Card
                  backgroundColor="white"
                  elevation={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  alignContent="center"
                  padding={20}
                  marginY={10}
                  flexDirection="column"
                >
                  <Pane
                    flex="1"
                    // height={windowHeight * 0.8}
                    width="100%"
                    // overflow={"auto"}
                    // background="#F9F9FB"
                    justifyContent="flex-start"
                    alignItems = "center"
                    paddingX={5}
                    margin={0}
                    display="inline-flex"
                    flexDirection="row"
                  >
                    <WiFlood size={30} color="black" />
                    <Heading size={100} marginLeft={5}>
                      FLOOD DEPTH
                    </Heading>
                    <Heading size={600} marginLeft={10}>
                      {raftInfo.flood_depth}
                    </Heading>
                    <Heading size={300} marginLeft={5}>
                      {"cm"}
                    </Heading>
                  </Pane>
                  {raftInfo.FD1 !== null || raftInfo.FD1 !== "" ? (
                    <Pane flex="1" width="100%" height="50%">
                      <Line
                        data={{
                          labels: raftInfo.FD1.map((k) =>
                            moment.unix(k.time).format("h:mm")
                          ),
                          datasets: [
                            {
                              data: raftInfo.FD1.map((k) => k.value),
                              fill: true,
                              // width: "125%",
                              height: "50%",
                              backgroundColor: "#00695c",
                              borderColor: "#00796b",
                            },
                          ],
                        }}
                        options={{
                          aspectRatio: 0.5,
                          // maintainAspectRatio: false,
                          legend: {
                            display: false,
                          },
                          scales: {
                            xAxes: [{ display: false }],
                            yAxes: [{ display: true }],
                          },
                        }}
                      />
                    </Pane>
                  ) : null}
                </Card>
                <Card
                  backgroundColor="white"
                  elevation={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  alignContent="center"
                  padding={20}
                  marginY={10}
                  flexDirection="column"
                >
                  <Pane
                    flex="1"
                    // height={windowHeight * 0.8}
                    width="100%"
                    // overflow={"auto"}
                    // background="#F9F9FB"
                    justifyContent="flex-start"
                    alignItems = "center"
                    paddingX={5}
                    margin={0}
                    display="inline-flex"
                    flexDirection="row"
                  >
                    <WiThermometer size={30} color="black" />
                    <Heading size={100} marginLeft={5}>
                      Temperature
                    </Heading>
                    <Heading size={600} marginLeft={10}>
                      {raftInfo.temperature}
                    </Heading>
                    <Heading size={300} marginLeft={5}>
                      {"°C"}
                    </Heading>
                  </Pane>
                  {raftInfo.temperature !== null &&
                  raftInfo.temperature !== 0 ? (
                    <Pane flex="1" width="100%" height="50%">
                      <Line
                        data={{
                          labels: raftInfo.TMP1.map((k) =>
                            moment.unix(k.time).format("h:mm")
                          ),
                          datasets: [
                            {
                              data: raftInfo.TMP1.map((k) => k.value),
                              fill: true,
                              // width: "125%",
                              height: "50%",
                              backgroundColor: "#00695c",
                              borderColor: "#00796b",
                            },
                          ],
                        }}
                        options={{
                          aspectRatio: 0.5,
                          // maintainAspectRatio: false,
                          legend: {
                            display: false,
                          },
                          scales: {
                            xAxes: [{ display: false }],
                            yAxes: [{ display: true }],
                          },
                        }}
                      />
                    </Pane>
                  ) : null}
                </Card>
                {raftInfo.pressure !== null && raftInfo.pressure !== 0 ? (
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    alignContent="center"
                    padding={20}
                    marginY={10}
                    flexDirection="column"
                  >
                    <Pane
                      flex="1"
                      // height={windowHeight * 0.8}
                      width="100%"
                      // overflow={"auto"}
                      // background="#F9F9FB"
                      justifyContent="flex-start"
                      alignItems = "center"
                      paddingX={5}
                      margin={0}
                      display="inline-flex"
                      flexDirection="row"
                    >
                      <WiBarometer size={30} color="black" />
                      <Heading size={100} marginLeft={5}>
                        Pressure
                      </Heading>
                      <Heading size={600} marginLeft={10}>
                        {raftInfo.pressure}
                      </Heading>
                      <Heading size={300} marginLeft={5}>
                        {"mmBar"}
                      </Heading>
                    </Pane>

                    <Pane flex="1" width="100%" height="50%">
                      <Line
                        data={{
                          labels: raftInfo.PR1.map((k) =>
                            moment.unix(k.time).format("h:mm")
                          ),
                          datasets: [
                            {
                              data: raftInfo.PR1.map((k) => k.value),
                              fill: true,
                              // width: "125%",
                              height: "50%",
                              backgroundColor: "#00695c",
                              borderColor: "#00796b",
                            },
                          ],
                        }}
                        options={{
                          aspectRatio: 0.5,
                          // maintainAspectRatio: false,
                          legend: {
                            display: false,
                          },
                          scales: {
                            xAxes: [{ display: false }],
                            yAxes: [{ display: true }],
                          },
                        }}
                      />
                    </Pane>
                  </Card>
                ) : null}
                {raftInfo.humidity !== null && raftInfo.humidity !== 0 ? (
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    alignContent="center"
                    padding={20}
                    marginY={10}
                    flexDirection="column"
                  >
                    <Pane
                      flex="1"
                      // height={windowHeight * 0.8}
                      width="100%"
                      // overflow={"auto"}
                      // background="#F9F9FB"
                      justifyContent="flex-start"
                      alignItems = "center"
                      paddingX={5}
                      margin={0}
                      display="inline-flex"
                      flexDirection="row"
                    >
                      <WiHumidity size={30} color="black" />
                      <Heading size={100} marginLeft={5}>
                        HUMIDITY
                      </Heading>
                      <Heading size={600} marginLeft={10}>
                        {raftInfo.humidity}
                      </Heading>
                      <Heading size={300} marginLeft={5}>
                        {"%"}
                      </Heading>
                    </Pane>

                    <Pane flex="1" width="100%" height="50%">
                      <Line
                        data={{
                          labels: raftInfo.HU1.map((k) =>
                            moment.unix(k.time).format("h:mm")
                          ),
                          datasets: [
                            {
                              data: raftInfo.HU1.map((k) => k.value),
                              fill: true,
                              // width: "125%",
                              height: "50%",
                              backgroundColor: "#00695c",
                              borderColor: "#00796b",
                            },
                          ],
                        }}
                        options={{
                          aspectRatio: 0.5,
                          // maintainAspectRatio: false,
                          legend: {
                            display: false,
                          },
                          scales: {
                            xAxes: [{ display: false }],
                            yAxes: [{ display: true }],
                          },
                        }}
                      />
                    </Pane>
                  </Card>
                ) : null}
              </Pane>
            </Modal.Body>
          </>
        ) : null}
      </Modal>

      <Map center={[14.41792, 120.97617919999998]} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {raftMarkers ? raftMarkers : null}
        {mobileMarkers ? mobileMarkers : null}
      </Map>
    </>
  );
}

export const MobileMap = (props) => {
  // useEffect(() => props.setIsNavBarHidden(true));
  return (
    // <Container>
    <MapFunction />
    // </Container>
  );
};
