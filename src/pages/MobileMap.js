import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer, Popup, Circle } from "react-leaflet";
import "../App.css";
import {
  Pane,
  Heading,
  Card,
  Text,
  CornerDialog,
  Position,
  InfoSignIcon,
  Popover,
  Tab,
  Tablist,
  Dialog,
  Tooltip,
  Paragraph,
} from "evergreen-ui";
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
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import RoomIcon from "@material-ui/icons/Room";
import WavesIcon from "@material-ui/icons/Waves";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import { borders, shadows } from "@material-ui/system";
import { useParams } from "react-router";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import { Line } from "react-chartjs-2";
import Box from "@material-ui/core/Box";
import L from "leaflet";
import { Container } from "react-bootstrap";

function MapFunction() {
  let { token_params } = useParams();
  const [mapData, setMapData] = useState();
  const classes = useStyles();
  const [raftMarkers, setRaftMarkers] = useState();
  const [mobileMarkers, setMobileMarkers] = useState();
  const [isOpen, setIsOpen] = useState();
  const [nodeType, setNodeType] = useState("RAFT");
  const [tabIndex, setTabIndex] = useState(0);
  const [showPopover, setShowPopover] = useState(false);
  const [voteLoggedInDialog, setVoteLoggedInDialog] = useState(false);
  const [summaryData, setSummaryData] = useState();
  const [floodCirclesRAFT, setFloodCirclesRAFT] = useState()
  const [floodCirclesMobile, setFloodCirclesMobile] = useState()
  const [showCircles, setShowCircles] = useState()
  const [showMarkers, setShowMarkers] = useState()

  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  //const proxyurl = "";
  
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
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
    description: null,
    rainfall_rate_title: null,
    flood_depth_title: null,
    rainfall_rate_color: null,
    flood_depth_color: null,
  });

  
  const [noRain, setNoRain] = useState([]);
  const [lightRain, setLightRain] = useState([]);
  const [modRain, setModRain] = useState([]);
  const [heavyRain, setHeavyRain] = useState([]);
  const [intenseRain, setIntenseRain] = useState([]);
  const [torrentialRain, setTorrentialRain] = useState([]);

  const [noFlood, setNoFlood] = useState([]);
  const [ankle, setAnkle] = useState([]);
  const [waist, setWaist] = useState([]);
  const [knee, setKnee] = useState([]);
  const [neck, setNeck] = useState([]);
  const [head, setHead] = useState([]);
  const [storey1, setStorey1] = useState([]);
  const [storey2, setStorey2] = useState([]);
  const [storey15, setStorey15] = useState([]);

  useEffect(()=>{
    setShowCircles(false)
    setShowMarkers(true)
   // decodeToken();
   
  },[])
 
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

      setFloodCirclesRAFT(
        mapData.raft.map((data) => {
          return (
            <Circle
            key = {data.id}
            center={{lat: data.latitude, lng: data.longitude}}
            fillColor={circleColor(data.flood_depth)} 
            radius={50}
            fillOpacity={0.75}
            stroke={false}
            />
          );
        })
      );
      setFloodCirclesMobile(
        mapData.mobile.map((data) => {
          return (
            <Circle
            key = {data.id}
            center={{lat: data.latitude, lng: data.longitude}}
            fillColor={circleColor(data.flood_depth)} 
            radius={50}
            fillOpacity={ 0.75}
            stroke={false}
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
              onclick={(e) => {
                // eslint-disable-next-line no-lone-blocks
                if(data.image != null){
                  e.target.openPopup()
                }else{
                  setNodeType("Mobile");
                  reportInfoHandler(data.id, data.username);
                }
                
              }}
            >
                {data.image !== null ? (
                <>
                <Popup>
                      <Image
                        src={`https://rainflow.live/api/uploads/reports/${data.image}`}
                        thumbnail
                        fluid
                        />
                      <Button onClick = {()=>{
                        setNodeType("Mobile");
                        reportInfoHandler(data.id, data.username);
                      }} 
                      variant="info" 
                      block
                      size="sm">
                          More info
                        </Button>
                </Popup>
                </>
                  
                ) : null}
            </Marker> 
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
            description: data.description,
            rainfall_rate_title: getRainfallRateTitle(data.rainfall_rate),
            flood_depth_title: getFloodDepthTitle(data.flood_depth),
            rainfall_rate_color: getRainfallRateColor(data.rainfall_rate),
            flood_depth_color: getFloodDepthColor(data.flood_depth),
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
      description: null,
      rainfall_rate_title: null,
      flood_depth_title: null,
      rainfall_rate_color: null,
      flood_depth_color: null,
    });
  };

  const circleColor = (flood_depth) =>{
    var flood;

    if (flood_depth <= 10) {
      flood = "#00ae4d";
    } else if (flood_depth > 10 && flood_depth <= 25) {
      flood = "#b2d235";
    } else if (flood_depth > 25 && flood_depth <= 70) {
      flood = "#ffd100";
    } else if (flood_depth > 70 && flood_depth <= 120) {
      flood = "#f78d1e";
    } else if (flood_depth > 120 && flood_depth <= 160) {
      flood = "#ed1b39";
    } else if (flood_depth > 160 && flood_depth <= 200) {
      flood = "#c12026";
    } else if (flood_depth > 200 && flood_depth <= 300) {
      flood = "#941619";
    } else if (flood_depth > 300 && flood_depth <= 450) {
      flood = "#7c112f";
    } else if (flood_depth > 450) {
      flood = "#5f001e";
    }

    return flood;
  }
  
  const fetchSummary = async () => {
    const url = "https://rainflow.live/api/map/summary";

    await fetch(proxyurl + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200)
          response.json().then((data) => {
            setSummaryData(data);
          });
      })
      .catch((error) => console.error("Error:", error));
  };

  
  function getRainfallRateTitle(rainfall_rate) {
    console.log("I reached here: ", rainfall_rate);
    if (rainfall_rate === 0) {
      return "No Rain";
    } else if (rainfall_rate > 0 && rainfall_rate < 2.5) {
      return "Light Rain";
    } else if (rainfall_rate >= 2.5 && rainfall_rate < 7.5) {
      return "Moderate Rain";
    } else if (rainfall_rate >= 7.5 && rainfall_rate < 15) {
      return "Heavy Rain";
    } else if (rainfall_rate >= 15 && rainfall_rate < 30) {
      return "Intense Rain";
    } else if (rainfall_rate >= 30) {
      return "Torrential Rain";
    }
  }

  function getRainfallRateColor(rainfall_rate) {
    console.log("I reached here: ", rainfall_rate);
    if (rainfall_rate === 0) {
      return "#0eae4e";
    } else if (rainfall_rate > 0 && rainfall_rate < 2.5) {
      return "#b2cf35";
    } else if (rainfall_rate >= 2.5 && rainfall_rate < 7.5) {
      return "#fece08";
    } else if (rainfall_rate >= 7.5 && rainfall_rate < 15) {
      return "#f38f20";
    } else if (rainfall_rate >= 15 && rainfall_rate < 30) {
      return "#ec193a";
    } else if (rainfall_rate >= 30) {
      return "#c12123";
    }
  }

  function getFloodDepthTitle(flood_depth) {
    if (flood_depth <= 10) {
      return "No Flood";
    } else if (flood_depth > 10 && flood_depth <= 25) {
      return "Ankle Deep";
    } else if (flood_depth > 25 && flood_depth <= 70) {
      return "Knee Deep";
    } else if (flood_depth > 70 && flood_depth <= 120) {
      return "Waist Deep";
    } else if (flood_depth > 120 && flood_depth <= 160) {
      return "Neck Deep";
    } else if (flood_depth > 160 && flood_depth <= 200) {
      return "Top of Head Deep";
    } else if (flood_depth > 200 && flood_depth <= 300) {
      return "1-Storey High";
    } else if (flood_depth > 300 && flood_depth <= 450) {
      return "1.5-Storeys High";
    } else if (flood_depth > 450) {
      return "2-Storey or Higher";
    }
  }

  function getFloodDepthColor(flood_depth) {
    if (flood_depth <= 10) {
      return "#0eae4e";
    } else if (flood_depth > 10 && flood_depth <= 25) {
      return "#b2cf35";
    } else if (flood_depth > 25 && flood_depth <= 70) {
      return "#fece08";
    } else if (flood_depth > 70 && flood_depth <= 120) {
      return "#f38f20";
    } else if (flood_depth > 120 && flood_depth <= 160) {
      return "#bf2125";
    } else if (flood_depth > 160 && flood_depth <= 200) {
      return "#c12123";
    } else if (flood_depth > 200 && flood_depth <= 300) {
      return "#931518";
    } else if (flood_depth > 300 && flood_depth <= 450) {
      return "#7a1331";
    } else if (flood_depth > 450) {
      return "#5e011c";
    }
  }

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
      iconAnchor: [23, 44],
      popupAnchor: [-2, -38],
    });
  }

  const onSideSheetHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
     <Container maxWidth={false} className={classes.popover}>
    { /*   <Dialog
          isShown={voteLoggedInDialog}
          title="You're not logged in."
          onCloseComplete={() => setVoteLoggedInDialog(false)}
          onConfirm={() => props.history.push("/login")}
          confirmLabel="Click here to login"
        >
          Please log in to vote.
        </Dialog> */}
        <Popover
          className={classes.root}
          isShown={showPopover}
          onBodyClick={() => setShowPopover(false)}
          onOpen={() => setShowPopover(true)}
          content={
            <Pane
              width={ isMobile? windowWidth*0.75 : 410}
              height={ isMobile? windowHeight*0.65 : 570}
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              flexDirection="column"
              overflow="auto"
            >
              <Tablist width="100%" padding={10} backgroundColor="#F1FBFC">
                <Tab
                  id="legend"
                  onSelect={() => setTabIndex(0)}
                  isSelected={tabIndex === 0}
                  aria-controls={`panel-legend`}
                >
                  Legend
                </Tab>
                <Tab
                  id="flood"
                  onSelect={() => setTabIndex(1)}
                  isSelected={tabIndex === 1}
                  aria-controls={`panel-flood`}
                >
                  Areas by Flood Level
                </Tab>
                <Tab
                  id="flood"
                  onSelect={() => setTabIndex(2)}
                  isSelected={tabIndex === 2}
                  aria-controls={`panel-rain`}
                >
                  Areas by Rain Intensity Level
                </Tab>
              </Tablist>

              <Pane
                width="100%"
                flexGrow={1}
                overflow="auto"
                padding={20}
                backgroundColor="#F9F9FB"
                id={`panel-flood`}
                role="tabpanel"
                aria-labelledby="flood"
                aria-hidden={tabIndex === 1 ? false : true}
                display={tabIndex === 1 ? "block" : "none"}
              >
                <Card
                  flexDirection="column"
                  display={noFlood.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>No flood (0 - 0.1 meters): </Heading>
                  {noFlood.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={ankle.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Ankle Deep (0.1 - 0.25 meters): </Heading>
                  {ankle.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={knee.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Knee Deep (0.25 - 0.7 meters): </Heading>
                  {knee.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={waist.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Waist Deep (0.7 - 1.2 meters): </Heading>
                  {waist.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={neck.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Neck Deep (1.2 - 1.6 meters): </Heading>
                  {neck.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={head.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Top of Head Deep (1.6 - 2.0 meters): </Heading>
                  {head.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={storey1.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>1-Storey High (2.0 - 3.0 meters):</Heading>
                  {storey1.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={storey15.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>1.5-Storey High (3.0 - 4.5 meters): </Heading>
                  {storey15.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={storey2.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>2-Storey or Higher (4.5+ meters):</Heading>
                  {storey2.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
              </Pane>
              <Pane
                width="100%"
                overflow="auto"
                paddingX= {10}
                marginTop = {0}
                flexGrow = {1}
                alignItems = "flex-start"
                backgroundColor="#F9F9FB"
                id={`panel-legend`}
                role="tabpanel"
                aria-labelledby="legend"
                aria-hidden={tabIndex === 0 ? false : true}
                justifyContent = "center"
                display={tabIndex === 0 ? "block" : "none"}
              >
                <Image
                        src={require('../assets/legend-vertical_legend.png')}
                        fluid
                      />
              </Pane>
              <Pane
                width="100%"
                flexGrow={1}
                padding={20}
                backgroundColor="#F9F9FB"
                id={`panel-rain`}
                role="tabpanel"
                aria-labelledby="rain"
                aria-hidden={tabIndex === 2 ? false : true}
                display={tabIndex === 2 ? "block" : "none"}
              >
                <Card
                  flexDirection="column"
                  display={noRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>No rain (0 mm/hr): </Heading>
                  {noRain.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={lightRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Light Rain (0.01 - 2.5 mm/hr):</Heading>
                  {lightRain.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={modRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Moderate Rain (2.5 - 7.5 mm/hr):</Heading>
                  {modRain.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={heavyRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Heavy Rain (7.5 - 15 mm/hr):</Heading>
                  {heavyRain.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={intenseRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Intense Rain (15 - 30 mm/hr):</Heading>
                  {intenseRain.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={torrentialRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Torrential Rain (30+ mm/hr):</Heading>
                  {torrentialRain.map((address) => {
                    return <Text paddingBottom={4.5}>- {address}</Text>;
                  })}
                </Card>
              </Pane>
            </Pane>
          }
          position={Position.TOP_LEFT}
        >
          <Box borderColor="grey.400" border={1} boxShadow={3}>
            <IconButton
              className={classes.customHoverFocus}
              size="small"
              aria-label="delete"
            >
              <InfoIcon />
            </IconButton>
          </Box>
        </Popover>
      </Container>

       {/* Marker button */}
       <Box maxWidth={false} borderColor="grey.400" className = {classes.markerButton} border={1} boxShadow={3}>
            <IconButton
              onClick = {()=>{setShowMarkers(!showMarkers)}}
              className={showMarkers ? classes.floodON : classes.floodOFF}
              size="medium"
              aria-label="markers"
            >
              <RoomIcon />
            </IconButton>
          </Box>

      {/* Flood circle button */}
      <Box maxWidth={false} borderColor="grey.400" className = {classes.floodCircles} border={1} boxShadow={3}>
            <IconButton
              onClick = {()=>{setShowCircles(!showCircles)}}
              className={showCircles ? classes.floodON : classes.floodOFF}
              size="medium"
              aria-label="circles"
            >
              <WavesIcon />
            </IconButton>
          </Box>


      <Modal
        show={isOpen}
        onHide={handleClose}
        dialogClassName="modal-main"
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
                      <Button
                        variant="success"
                        active={
                          reportInfo.currentAction === "upvote" ? true : false
                        }
                        onClick={(e) => {
                          console.log("Upvote pressed!");
                          var token = localStorage.getItem("token");
                          if (token !== null) {
                            if (reportInfo.currentAction === "upvote") {
                              var _upvote = reportInfo.upvote - 1;
                              setReportInfo({
                                id: reportInfo.id,
                                latitude: reportInfo.latitude,
                                longitude: reportInfo.longitude,
                                flood_depth: reportInfo.flood_depth,
                                rainfall_rate: reportInfo.rainfall_rate,
                                username: reportInfo.username,
                                updatedAt: reportInfo.updatedAt,
                                image: reportInfo.image,
                                upvote: _upvote,
                                downvote: reportInfo.downvote,
                                currentAction: null,
                                description: reportInfo.description,
                                rainfall_rate_title:
                                  reportInfo.rainfall_rate_title,
                                flood_depth_title: reportInfo.flood_depth_title,
                                rainfall_rate_color:
                                  reportInfo.rainfall_rate_color,
                                flood_depth_color: reportInfo.flood_depth_color,
                              });
                              fetch(
                                proxyurl +
                                  "https://rainflow.live/api/report/vote",
                                {
                                  method: "DELETE",
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                  },
                                }
                              )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.error(err));
                            } else if (
                              reportInfo.currentAction === null ||
                              reportInfo.currentAction === "downvote"
                            ) {
                              var _upvote = reportInfo.upvote + 1;
                              var _downvote = reportInfo.downvote;
                              if (reportInfo.currentAction === "downvote")
                                _downvote = _downvote - 1;
                              setReportInfo({
                                id: reportInfo.id,
                                latitude: reportInfo.latitude,
                                longitude: reportInfo.longitude,
                                flood_depth: reportInfo.flood_depth,
                                rainfall_rate: reportInfo.rainfall_rate,
                                username: reportInfo.username,
                                updatedAt: reportInfo.updatedAt,
                                image: reportInfo.image,
                                upvote: _upvote,
                                downvote: _downvote,
                                currentAction: "upvote",
                                description: reportInfo.description,
                                rainfall_rate_title:
                                  reportInfo.rainfall_rate_title,
                                flood_depth_title: reportInfo.flood_depth_title,
                                rainfall_rate_color:
                                  reportInfo.rainfall_rate_color,
                                flood_depth_color: reportInfo.flood_depth_color,
                              });
                              fetch(
                                proxyurl +
                                  "https://rainflow.live/api/report/vote",
                                {
                                  method: "POST",
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    action: "upvote",
                                    reportID: reportInfo.id,
                                  }), // body data type must match "Content-Type" header
                                }
                              )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.error(err));
                            }
                          }else{
                            setVoteLoggedInDialog(true);
                            setIsOpen(false)
                          }
                        }}
                      >
                        <HandThumbsUp color="white" size={20} />{" "}
                        {reportInfo.upvote}
                      </Button>{" "}
                      <Button
                        variant="danger"
                        active={
                          reportInfo.currentAction === "downvote" ? true : false
                        }
                        onClick={(e) => {
                          console.log("Downvote pressed!");
                          var token = localStorage.getItem("token");
                          if (token !== null) {
                            if (reportInfo.currentAction === "downvote") {
                              var _downvote = reportInfo.upvote - 1;
                              setReportInfo({
                                id: reportInfo.id,
                                latitude: reportInfo.latitude,
                                longitude: reportInfo.longitude,
                                flood_depth: reportInfo.flood_depth,
                                rainfall_rate: reportInfo.rainfall_rate,
                                username: reportInfo.username,
                                updatedAt: reportInfo.updatedAt,
                                image: reportInfo.image,
                                upvote: reportInfo.upvote,
                                downvote: _downvote,
                                currentAction: null,
                                description: reportInfo.description,
                                rainfall_rate_title:
                                  reportInfo.rainfall_rate_title,
                                flood_depth_title: reportInfo.flood_depth_title,
                                rainfall_rate_color:
                                  reportInfo.rainfall_rate_color,
                                flood_depth_color: reportInfo.flood_depth_color,
                              });
                              fetch(
                                proxyurl +
                                  "https://rainflow.live/api/report/vote",
                                {
                                  method: "DELETE",
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                  },
                                }
                              )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.error(err));
                            } else if (
                              reportInfo.currentAction === null ||
                              reportInfo.currentAction === "upvote"
                            ) {
                              var _downvote = reportInfo.downvote + 1;
                              var _upvote = reportInfo.upvote;
                              if (reportInfo.currentAction === "upvote")
                                _upvote = _upvote - 1;
                              setReportInfo({
                                id: reportInfo.id,
                                latitude: reportInfo.latitude,
                                longitude: reportInfo.longitude,
                                flood_depth: reportInfo.flood_depth,
                                rainfall_rate: reportInfo.rainfall_rate,
                                username: reportInfo.username,
                                updatedAt: reportInfo.updatedAt,
                                image: reportInfo.image,
                                upvote: _upvote,
                                downvote: _downvote,
                                currentAction: "downvote",
                                description: reportInfo.description,
                                rainfall_rate_title:
                                  reportInfo.rainfall_rate_title,
                                flood_depth_title: reportInfo.flood_depth_title,
                                rainfall_rate_color:
                                  reportInfo.rainfall_rate_color,
                                flood_depth_color: reportInfo.flood_depth_color,
                              });
                              fetch(
                                proxyurl +
                                  "https://rainflow.live/api/report/vote",
                                {
                                  method: "POST",
                                  headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    action: "downvote",
                                    reportID: reportInfo.id,
                                  }), // body data type must match "Content-Type" header
                                }
                              )
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => console.error(err));
                            }
                          }else{
                            setVoteLoggedInDialog(true);
                            setIsOpen(false)
                          }
                        }}
                      >
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
                height={windowHeight * 0.5}
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
                  <Heading size={600} marginLeft={10} color={reportInfo.rainfall_rate_color}>
                  {reportInfo.rainfall_rate_title}
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
                  <Heading size={600} marginLeft={10} color={reportInfo.flood_depth_color}>
                  {reportInfo.flood_depth_title}
                  </Heading>
                </Card>
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
                height={windowHeight * 0.5}
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
                    alignItems="center"
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
                    alignItems="center"
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
                    alignItems="center"
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
                    alignItems="center"
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
                      alignItems="center"
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
                      alignItems="center"
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

        {raftMarkers && showMarkers ? raftMarkers : null}
        {mobileMarkers && showMarkers ? mobileMarkers : null}
  
        {showCircles ? floodCirclesMobile : null}
        {showCircles ? floodCirclesRAFT : null}
      </Map>
    </>
  );
}

const useStyles = makeStyles({
  popover: {
    position: "absolute",
    left: 10,
    top: 90,
    padding: 0,
    zIndex: 1,
    width: "auto",
  },
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#D2EEF3" },
    backgroundColor: "white",
    borderRadius: 2,
    flexWrap: "wrap",
  },
  root: { 
    flexWrap: "wrap",
    position: "absolute",
    left: 10,
    top: 160,
    width: "auto"
},
  
 floodON: {
  "&:hover, &.Mui-focusVisible": { backgroundColor: "#D2EEF3" },
  backgroundColor: "#D2EEF3",
  borderRadius: 2,
  flexWrap: "wrap",
 },

 floodOFF: {
  "&:hover, &.Mui-focusVisible": { backgroundColor: "white" },
  backgroundColor: "white",
  borderRadius: 2,
  flexWrap: "wrap",
 },

floodCircles:{
  position: "absolute",
  right: 60,
  top: 70,
  zIndex: 1,
  width: "auto",
  padding: 0
},

markerButton:{
  position: "absolute",
  right: 60,
  top: 10,
  zIndex: 1,
  width: "auto",
  padding: 0
}
});

export const MobileMap = (props) => {
  // useEffect(() => props.setIsNavBarHidden(true));
  return (
    // <Container>
    <MapFunction />
    // </Container>
  );
};
