import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { Map, Marker, TileLayer, Popup, Circle, Polyline } from "react-leaflet";
import TextField from '@material-ui/core/TextField';
import { Container } from "react-bootstrap";
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
  // Tooltip,
  Paragraph,
} from "evergreen-ui";
import {
  WiRain,
  WiFlood,
  WiThermometer,
  WiBarometer,
  WiHumidity,
  WiFog,
  WiRaindrops,
} from "weather-icons-react";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import moment from "moment";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
import MuiAlert from '@material-ui/lab/Alert';
import Box from "@material-ui/core/Box";
import L from "leaflet";
import Divider from "@material-ui/core/Divider";

import { Line } from "react-chartjs-2";
import jwt_decode from "jwt-decode";

import legendVertical from "../assets/legend-vertical_legend.png";
import floatingLegend from "../assets/legend/floating-legend-21.png"

import Snackbar from '@material-ui/core/Snackbar';

export const PredictionModule = (props) => {
  const history = useHistory();
  const windowHeight = window.innerHeight;
  const classes = useStyles();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const [mapData, setMapData] = useState();
  const [isOpen, setIsOpen] = useState();
  const [nodeType, setNodeType] = useState("RAFT");
  const [tabIndex, setTabIndex] = useState(0);
  const [showPopover, setShowPopover] = useState();
  const [noSummary, setNoSummary] = useState();
  const [inputOpen, setInputOpen] = useState();
  const [inputOpenFlood, setInputOpenFlood] = useState();
  const [currentInputAddress, setCurrentInputAddress] = useState();
  const [displayedRainIntensity, setDisplayedRainIntensity] = useState()
  const [displayedFloodDepth, setDisplayedFloodDepth] = useState()
  const [displayedDuration,setDisplayedDuration] = useState()
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [paramsEdited, setParamsEdited] = useState()
  const [editedArea, setEditedArea] = useState()
  const [colorLow, setColorLow] = useState()
  const [colorMid, setColorMid] = useState()
  const [colorHigh, setColorHigh] = useState()
  const [RR_H1, setRR_H1] = useState()
  const [RR_H2, setRR_H2] = useState()
  const [RR_H3, setRR_H3] = useState()
  const [RR_M1, setRR_M1] = useState()
  const [RR_M2, setRR_M2] = useState()
  const [RR_M3, setRR_M3] = useState()
  const [RR_L1, setRR_L1] = useState()
  const [RR_L2, setRR_L2] = useState()
  const [RR_L3, setRR_L3] = useState()
  const [T_M1,setT_M1] = useState()
  const [T_M2,setT_M2] = useState()
  const [T_M3,setT_M3] = useState()
  const [T_H1,setT_H1] = useState()
  const [T_H2,setT_H2] = useState()
  const [T_H3,setT_H3] = useState()
  const [T_L1,setT_L1] = useState()
  const [T_L2,setT_L2] = useState()
  const [T_L3,setT_L3] = useState()
  const [FD_H_Prev, setFD_H_Prev] = useState()
  const [FD_M_Prev, setFD_M_Prev] = useState()
  const [FD_L_Prev, setFD_L_Prev] = useState()
 

 //const proxyurl = "";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
 //const proxyurl = "http://localhost:8800/";
   //const proxyurl = "http://localhost:8080/";

  const [raftInfo, setRaftInfo] = useState({
    id: null,
    latitude: null,
    longitude: null,
    altitude: null,
    flood_depth: null,
    rainfall_amount: null,
    rainfall_rate: null,
    rainfall_rate_title: null,
    flood_depth_title: null,
    rainfall_rate_subtitle: null,
    flood_depth_subtitle: null,
    rainfall_rate_color: null,
    flood_depth_color: null,
    water_level: null,
    temperature: null,
    pressure: null,
    humidity: null,
    username: null,
    updatedAt: null,
    charts: null,
    address: null,
    badge: null,
    FD1: [],
    TMP1: [],
    RA1: [],
    PR1: [],
    HU1: [],
    WL1: [],
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
    address: null,
    badge: null,
    currentAction: null,
    description: null,
    rainfall_rate_title: null,
    flood_depth_title: null,
    rainfall_rate_subtitle: null,
    flood_depth_subtitle: null,
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

  const windowWidth = window.innerWidth;

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
        if (response.status === 200)
          response.json().then((data) => {
            setMapData(data);
          });
      })
      .catch((error) => console.error("Error:", error));
  };

  function getRainfallRateTitle(rainfall_rate) {
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
  function getMarkerColorRain(rainfall_rate) {
    console.log(rainfall_rate)
    if (rainfall_rate === 0) {
      return "https://rainflow.live/api/images/marker/0_AA.png";
    } else if (rainfall_rate > 0 && rainfall_rate < 2.5) {
      return "https://rainflow.live/api/images/marker/0_BB.png";
    } else if (rainfall_rate >= 2.5 && rainfall_rate < 7.5) {
      return "https://rainflow.live/api/images/marker/0_CC.png";
    } else if (rainfall_rate >= 7.5 && rainfall_rate < 15) {
      return "https://rainflow.live/api/images/marker/0_DD.png";
    } else if (rainfall_rate >= 15 && rainfall_rate < 30) {
      return "https://rainflow.live/api/images/marker/0_EE.png";
    } else if (rainfall_rate >= 30) {
      return "https://rainflow.live/api/images/marker/0_FF.png";
    }
  }

  function getFloodDepthTitle(flood_depth) {
    console.log(flood_depth)
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

  function getFloodDepthSubTitle(flood_depth) {
    if (flood_depth <= 10) {
      return null;
    } else if (flood_depth > 10 && flood_depth <= 25) {
      return "Passable to All Types of Vehicles";
    } else if (flood_depth > 25 && flood_depth <= 66) {
      return "NOT PASSABLE to LIGHT Vehicles";
    } else if (flood_depth > 66) {
      return "NOT PASSABLE to ALL TYPES of Vehicles";
    }
  }

  function getFloodDepthColor(flood_depth) {
    console.log(flood_depth)
    if (flood_depth <= 0.1) {
      return "#0eae4e";
    } else if (flood_depth > 0.1 && flood_depth <= 0.25) {
      return "#b2cf35";
    } else if (flood_depth > 0.25 && flood_depth <= 0.70) {
      return "#fece08";
    } else if (flood_depth > 0.70 && flood_depth <= 1.20) {
      return "#f38f20";
    } else if (flood_depth > 1.20 && flood_depth <= 1.60) {
      return "#bf2125";
    } else if (flood_depth > 1.60 && flood_depth <= 2.00) {
      return "#c12123";
    } else if (flood_depth > 2.00 && flood_depth <= 3.00) {
      return "#931518";
    } else if (flood_depth > 3.00 && flood_depth <= 4.50) {
      return "#7a1331";
    } else if (flood_depth > 4.50) {
      return "#5e011c";
    }
  }

 

  const decodeToken = async () => {
    var token = await localStorage.getItem("token");
    if (token != null) {
      var decoded = jwt_decode(token);
      const now = Date.now().valueOf() / 1000;
      if (typeof decoded.exp < now) {
        console.log("token is expired. clearing local storage.");
        localStorage.clear();
      } else {
        console.log("token is not expired");
      }
      // console.log("DECODED TOKEN",decoded)
    } else {
      console.log("not logged in");
    }
  };

  
  useEffect(() => { 
    setMapCenter([14.650569571271504, 121.10455520510294]);
    setDisplayedDuration("")
    setDisplayedRainIntensity("")
    setMapZoom(14);
    decodeToken();
    setShowPopover(false);
    setRR_H1(0)
    setRR_H2(0)
    setRR_H3(0)
    setRR_M1(0)
    setRR_M2(0)
    setRR_M3(0)
    setRR_L1(0)
    setRR_L2(0)
    setRR_L3(0)
    setT_H1(0)
    setT_H2(0)
    setT_H3(0)
    setT_M1(0)
    setT_M2(0)
    setT_M3(0)
    setT_L1(0)
    setT_L2(0)
    setT_L3(0)
    setFD_H_Prev(0)
    setFD_M_Prev(0)
    setFD_L_Prev(0)
    setColorHigh("#0eae4e")
    setColorLow("#0eae4e")
    setColorMid("#0eae4e")
  }, []);




  /* sets state of map center after map has been dragged around */
  const moveHandler = (e) => {
    setMapCenter(e.target.getCenter());
  };
  /* sets state of map zoom after map has been dragged around */
  const zoomHandler = (e) => {
    setMapZoom(e.target.getZoom());
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
      badge: null,
      address: null,
      water_level: null,
      rainfall_rate_title: null,
      flood_depth_title: null,
      rainfall_rate_subtitle: null,
      flood_depth_subtitle: null,
      rainfall_rate_color: null,
      flood_depth_color: null,
      FD1: [],
      TMP1: [],
      RA1: [],
      PR1: [],
      HU1: [],
      WL1: [],
    });
  };


  const handleInputClose = () => {
    setInputOpen(false);
  };
  const handleInputCloseFlood = () => {
    setInputOpenFlood(false);
  };

  const onSideSheetHandler = () => {
    setIsOpen(true);
  };

  const applyRainProfile = (params) =>{
    console.log(displayedRainIntensity, displayedDuration)
    if(params === "LS-1"){
        setRR_L1(displayedRainIntensity)
        setT_L1(displayedDuration)
    }
    else if (params === "LS-2"){
      setRR_L2(displayedRainIntensity)
      setT_L2(displayedDuration)
    }
    
    else if (params === "LS-3"){
      setRR_L3(displayedRainIntensity)
      setT_L3(displayedDuration)
    }
    
    else if (params === "MS-1"){
      setRR_M1(displayedRainIntensity)
      setT_M1(displayedDuration)
    }
    
    else if (params === "MS-2"){
      setRR_M2(displayedRainIntensity)
      setT_M2(displayedDuration)
    }
    
    else if (params === "MS-3"){
      setRR_M3(displayedRainIntensity)
      setT_M3(displayedDuration)
    }
    
    else if (params === "HS-1"){
      setRR_H1(displayedRainIntensity)
      setT_H1(displayedDuration)
    }
    
    else if (params === "HS-2"){
      setRR_H2(displayedRainIntensity)
      setT_H2(displayedDuration)
    }
    
    else if (params === "HS-3"){
      setRR_H3(displayedRainIntensity)
      setT_H3(displayedDuration)
    }
  }

  const applyFloodDepth = (area) =>{
  
    if(area === "Lowstream"){
        setFD_L_Prev(displayedFloodDepth)
        setColorLow(getFloodDepthColor(displayedFloodDepth))
    }
    else if (area === "Midstream"){
      setFD_M_Prev(displayedFloodDepth)
      setColorMid(getFloodDepthColor(displayedFloodDepth))
    }
    
    else if (area === "Highstream"){
      setFD_H_Prev(displayedFloodDepth)
      setColorHigh(getFloodDepthColor(displayedFloodDepth))
    }
  }

  return (
    <>
      <Container maxWidth={false} className={classes.popover}>
    
        <Popover
          className={classes.root}
          isShown={showPopover}
          onBodyClick={() => setShowPopover(false)}
          onOpen={() => setShowPopover(true)}
          content={
            <Pane
              width={isMobile ? windowWidth * 0.75 : 410}
              height={isMobile ? windowHeight * 0.65 : 570}
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
                  display="inline-flex"
                  marginBottom={10}
                >
                  <Heading size={200}>
                    {noSummary === true
                      ? "No monitored areas are flooded at the moment."
                      : "Click any address to go to its marker."}
                  </Heading>
                </Card>
                <Divider />

                <Card
                  flexDirection="column"
                  display={noFlood.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>No flood (0 - 0.1 meters): </Heading>
                  {noFlood.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={ankle.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Ankle Deep (0.1 - 0.25 meters): </Heading>
                  {ankle.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={knee.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Knee Deep (0.25 - 0.7 meters): </Heading>
                  {knee.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={waist.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Waist Deep (0.7 - 1.2 meters): </Heading>
                  {waist.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={neck.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Neck Deep (1.2 - 1.6 meters): </Heading>
                  {neck.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={head.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Top of Head Deep (1.6 - 2.0 meters): </Heading>
                  {head.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={storey1.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>1-Storey High (2.0 - 3.0 meters):</Heading>
                  {storey1.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={storey15.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>1.5-Storey High (3.0 - 4.5 meters): </Heading>
                  {storey15.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={storey2.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>2-Storey or Higher (4.5+ meters):</Heading>
                  {storey2.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
              </Pane>
              <Pane
                width="100%"
                overflow="auto"
                paddingX={10}
                marginTop={0}
                flexGrow={1}
                alignItems="flex-start"
                backgroundColor="#F9F9FB"
                id={`panel-legend`}
                role="tabpanel"
                aria-labelledby="legend"
                aria-hidden={tabIndex === 0 ? false : true}
                justifyContent="center"
                display={tabIndex === 0 ? "block" : "none"}
              >
                <Image src = {legendVertical} fluid />
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
                  display="inline-flex"
                  marginBottom={10}
                >
                  <Heading size={200}>
                    {noSummary === true
                      ? "No monitored areas are experiencing rain at the moment."
                      : "Click any address to go to its marker."}
                  </Heading>
                </Card>
                <Divider />
                <Card
                  flexDirection="column"
                  display={noRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>No rain (0 mm/hr): </Heading>
                  {noRain.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={lightRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Light Rain (0.01 - 2.5 mm/hr):</Heading>
                  {lightRain.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={modRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Moderate Rain (2.5 - 7.5 mm/hr):</Heading>
                  {modRain.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={heavyRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Heavy Rain (7.5 - 15 mm/hr):</Heading>
                  {heavyRain.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={intenseRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Intense Rain (15 - 30 mm/hr):</Heading>
                  {intenseRain.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
                <Card
                  flexDirection="column"
                  display={torrentialRain.length > 0 ? "inline-flex" : "none"}
                  marginBottom={20}
                >
                  <Heading>Torrential Rain (30+ mm/hr):</Heading>
                  {torrentialRain.map((data) => {
                    return (
                      <Text
                        onClick={() => {
                          setMapCenter([data.lat, data.lng]);
                          setMapZoom(17);
                        }}
                        paddingBottom={4.5}
                      >
                        - {data.address}
                      </Text>
                    );
                  })}
                </Card>
              </Pane>
            </Pane>
          }
          position={Position.TOP_LEFT}
        >
          <Box maxWidth={false} borderColor="grey.400" border={1} boxShadow={3}>
            <IconButton
              onClick={() => setShowPopover(!showPopover)}
              className={classes.customHoverFocus}
              size="small"
              aria-label="delete"
            >
              <InfoIcon />
            </IconButton>
          </Box>
        </Popover>
      </Container>

    {/* Run prediction module */}
    <Tooltip title="Run prediction module">
        <Box
          width = "auto"
          className={classes.snapshotBox}
          box-shadow = {3}
        >
          <TextField
          id="filled-read-only-input"
          label="Time in minutes"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      
          <IconButton
            onClick={() => {
              console.log(RR_L1)
              console.log(RR_L2)
              console.log(RR_L3)
              console.log(RR_H1)
              console.log(RR_H2)
              console.log(RR_H3)
              console.log(RR_M1)
              console.log(RR_M2)
              console.log(RR_M3)
            }}
            className={classes.snapshotButton}
            classes={{ label: classes.iconLabel }}
            size="medium"
            aria-label="markers"
          >
            <Heading size={100}>RUN PREDICTION</Heading>
          </IconButton>
        </Box>
      </Tooltip>


      {/* Report/Raft Info Sidebar */}

      <Modal
        show={isOpen}
        onHide={handleClose}
        dialogClassName={isMobile ? "modal-mobile-view" : "modal-main-web"}
        animation={false}
      >

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
                    <Heading size={700}>
                      {raftInfo.username}'s RAFT{" "}
                      {raftInfo.badge !== null ? (
                        <>
                          <Image
                            src={`https://rainflow.live/api/images/badges/${raftInfo.badge}`}
                            height="20"
                          />
                        </>
                      ) : null}
                      <Image
                        src="https://rainflow.live/api/images/badges/raft.png"
                        height="20"
                      />
                    </Heading>
                    <Text size={500}>{raftInfo.updatedAt}</Text>
                    <Text size={300}>{raftInfo.address}</Text>
                    {/* <Text size={500}>Owned by {raftInfo.username}</Text> */}
                  </Pane>
                  {raftInfo.flood_depth_subtitle !== null ? (
                    <Pane
                      display="inline-flex"
                      flexDirection="column"
                      padding={5}
                    >
                      <Heading
                        size={600}
                        marginLeft={5}
                        color={raftInfo.flood_depth_color}
                      >
                        {raftInfo.flood_depth_subtitle}
                      </Heading>
                    </Pane>
                  ) : null}
                </Pane>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body">
              <Pane
                flex="1"
                height={windowHeight * 0.8}
                overflow-y={"auto"}
                overflow-x={"hidden"}
                background="#F9F9FB"
                paddingX={5}
                margin={0}
              >
                {raftInfo.RA1 !== null ? (
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
                      flexDirection="column"
                    >
                      <Pane flex = "1" flexDirection = "row" width = "100%" alignItems = "center"  justifyContent="flex-start" display="inline-flex">
                      <WiRain size={30} color="black" />
                      <Heading size={100} marginLeft={5}>
                        RAINFALL RATE{" "}
                        <Tooltip title="The amount of rain that falls over time.">
                          <InfoSignIcon size={15} color="grey" />
                        </Tooltip>
                      </Heading>
                      <Heading size={600} marginLeft={10}>
                        {raftInfo.rainfall_rate}
                      </Heading>
                      <Heading size={400} marginLeft={5}>
                        {"mm/hour"}
                      </Heading>
                      </Pane>
                      <Heading
                        size={500}
                        marginLeft={70}
                        width = "100%"  
                        justifyContent="flex-start"
                        color={raftInfo.rainfall_rate_color}
                      >
                      ({raftInfo.rainfall_rate_title})
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
                        TOTAL RAINFALL{" "}
                        <Tooltip title="The total amount of rain that fell over the past 24 hours.">
                          <InfoSignIcon size={15} color="grey" />
                        </Tooltip>
                      </Heading>
                      <Heading size={600} marginLeft={10}>
                        {raftInfo.rainfall_amount}
                      </Heading>
                      <Heading size={300} marginLeft={5}>
                        {"mm/day"}
                      </Heading>
                    </Pane>
                    {raftInfo.RA1.length > 0 ? (
                      <Pane flex="1" width="100%">
                        <Line
                          data={{
                            labels: raftInfo.RA1.map((k) =>
                              moment.unix(k.time).format("MM/DD/YYYY h:mm A")
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
                              xAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                              yAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                            },
                          }}
                        />
                      </Pane>
                    ) : null}
                  </Card>
                ) : null}
                {raftInfo.FD1 !== null ? (
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
                      flexDirection="column"
                    >
                      <Pane flex = "1" flexDirection = "row" width = "100%" alignItems = "center"  justifyContent="flex-start" display="inline-flex">
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
                      <Heading
                        size={500}
                        marginLeft={70}
                        justifyContent="flex-start"
                        width = "100%"
                        marginBottom = {10} 
                        color={raftInfo.flood_depth_color}
                      >
                        ({raftInfo.flood_depth_title})
                      </Heading>
                    </Pane>
                    {raftInfo.FD1.length > 0 ? (
                      <Pane flex="1" width="100%" height="50%">
                        <Line
                          data={{
                            labels: raftInfo.FD1.map((k) =>
                              moment.unix(k.time).format("MM/DD/YYYY h:mm A")
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
                              xAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                              yAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                            },
                          }}
                        />
                      </Pane>
                    ) : null}
                  </Card>
                ) : null}
                {raftInfo.temperature !== null ? (
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
                    {raftInfo.TMP1.length > 0 ? (
                      <Pane flex="1" width="100%" height="50%">
                        <Line
                          data={{
                            labels: raftInfo.TMP1.map((k) =>
                              moment.unix(k.time).format("MM/DD/YYYY h:mm A")
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
                              xAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                              yAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                            },
                          }}
                        />
                      </Pane>
                    ) : null}
                  </Card>
                ) : null}
                {raftInfo.pressure !== null ? (
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
                        Air Pressure{" "}
                        <Tooltip title="The force exerted on the Earth’s surface by the weight of the air above the surface. Low pressure is usually associated with high winds, warm air, and atmospheric lifting.">
                          <InfoSignIcon size={15} color="grey" />
                        </Tooltip>
                      </Heading>
                      <Heading size={600} marginLeft={10}>
                        {raftInfo.pressure}
                      </Heading>
                      <Heading size={300} marginLeft={5}>
                        {"mmBar"}
                      </Heading>
                    </Pane>
                    {raftInfo.PR1.length > 0 ? (
                      <Pane flex="1" width="100%" height="50%">
                        <Line
                          data={{
                            labels: raftInfo.PR1.map((k) =>
                              moment.unix(k.time).format("MM/DD/YYYY h:mm A")
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
                              xAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                              yAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                            },
                          }}
                        />
                      </Pane>
                    ) : null}
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
                        HUMIDITY{" "}
                        <Tooltip title="The amount of water vapour in the air.">
                          <InfoSignIcon size={15} color="grey" />
                        </Tooltip>
                      </Heading>
                      <Heading size={600} marginLeft={10}>
                        {raftInfo.humidity}
                      </Heading>
                      <Heading size={300} marginLeft={5}>
                        {"%"}
                      </Heading>
                    </Pane>
                    {raftInfo.HU1.length > 0 ? (
                      <Pane flex="1" width="100%" height="50%">
                        <Line
                          data={{
                            labels: raftInfo.HU1.map((k) =>
                              moment.unix(k.time).format("MM/DD/YYYY h:mm A")
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
                              xAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                              yAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                            },
                          }}
                        />
                      </Pane>
                    ) : null}
                  </Card>
                ) : null}
                {raftInfo.water_level !== null ? (
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
                        WATER LEVEL{" "}
                        <Tooltip title="The height of river water.">
                          <InfoSignIcon size={15} color="grey" />
                        </Tooltip>
                      </Heading>
                      <Heading size={600} marginLeft={10}>
                        {raftInfo.water_level}
                      </Heading>
                      <Heading size={300} marginLeft={5}>
                        {"meters"}
                      </Heading>
                    </Pane>
                    {raftInfo.WL1.length > 0 ? (
                      <Pane flex="1" width="100%" height="50%">
                        <Line
                          data={{
                            labels: raftInfo.WL1.map((k) =>
                              moment.unix(k.time).format("MM/DD/YYYY h:mm A")
                            ),
                            datasets: [
                              {
                                data: raftInfo.WL1.map((k) => k.value),
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
                              xAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                              yAxes: [
                                {
                                  display: true,
                                  ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 5,
                                  },
                                },
                              ],
                            },
                          }}
                        />
                      </Pane>
                    ) : null}
                  </Card>
                ) : null}
              </Pane>
            </Modal.Body>
          </>
        ) : null}
      </Modal>

      {/* <CornerDialog
        width={isMobile ? windowWidth * 0.75 : windowWidth * 0.3}
        title={
          <Pane flexDirection="row" display="flex" alignItems="center">
            <InfoSignIcon size={20} color="info" marginRight={10} />{" "}
            <Heading size={600}>Welcome to RainFLOW!</Heading>
          </Pane>
        }
        isShown={guideShown}
        onCloseComplete={() => setGuideShown(false)}
        hasFooter={false}
        position={isMobile ? Position.BOTTOM : Position.BOTTOM_RIGHT}
      >
        <Paragraph marginTop={5}>
          {">"} Click on any node on the map to view the rain and flood
          information reported in that area.
        </Paragraph>
        <Paragraph marginTop={5}>
          {">"} Toggle the button at the top left to view the marker legend and
          all the areas grouped by rain and levels.{" "}
        </Paragraph>

        <Paragraph marginTop={5}>
          {">"} Click the buttons at the top right to show or hide markers on
          the map.
        </Paragraph>

        <Paragraph marginTop={5}>
          {">"} Choose a date and click snapshot to see the data recorded on that day.
        </Paragraph>
      </CornerDialog> */}

      {/* Corner Legend */}
      <Box
          width = "50%"
          className={classes.cornerLegend}
          box-shadow = {3}
        >
          <Image src = {floatingLegend} fluid />
      
        </Box>


      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        key={ {vertical: 'top'} + {horizontal: 'center'}}
      >
        <MuiAlert severity="error">Please enter a valid time range!</MuiAlert>
      </Snackbar>

      <Map
        center={mapCenter}
        zoom={mapZoom}
        onZoomEnd={zoomHandler}
        onMoveEnd={moveHandler}
        minZoom={3}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

      {/* Rain Input Dialog Form */}
      <Dialog open={inputOpen} onClose={handleInputClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Add Rain Profile to {paramsEdited}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Address: {currentInputAddress}
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Rain Intensity in mm/hr"
                  type="email"
                  fullWidth
                  value = {displayedRainIntensity}
                  onChange = {(e)=> setDisplayedRainIntensity(e.target.value)}
                 
                />
                <TextField
                 value = {displayedDuration}
                 onChange = {(e)=> setDisplayedDuration(e.target.value)}
                  margin="dense"
                  id="name"
                  label="Duration in minutes"
                  type="email"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleInputClose} color="primary">
                  Close
                </Button>
                <Button onClick={()=>{applyRainProfile(paramsEdited)}} color="primary">
                  Apply
                </Button>
              </DialogActions>
            </Dialog>

      {/* Flood Input Dialog Form */}
      <Dialog open={inputOpenFlood} onClose={handleInputCloseFlood} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Change flood level in {editedArea}</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Flood in meters"
                  type="email"
                  fullWidth
                  value = {displayedFloodDepth}
                  onChange = {(e)=> setDisplayedFloodDepth(e.target.value)}
                />
          
              </DialogContent>
              <DialogActions>
                <Button onClick={handleInputCloseFlood} color="primary">
                  Close
                </Button>
                <Button onClick={()=>{applyFloodDepth(editedArea)}} color="primary">
                  Apply
                </Button>
              </DialogActions>
            </Dialog>

            {/* Lowstream */}
            <Circle
                center={[14.650569571271504, 121.10455520510294]}
                radius={800}
                fill="true"
            color = {colorLow}
                onMouseClick={(e) => {
                  e.target.openPopup();
                  
                }}
              >
                <Popup>Low stream: 800m radius, 15 meters above water level {"\n"} Flood level: {FD_L_Prev} meters {"\n"}
                <Button
                      onClick={() => {
                        setEditedArea("Lowstream")
                        setDisplayedFloodDepth(FD_L_Prev)
                        setInputOpenFlood(true)
                      }}
                      variant="info"
                      block
                      size="sm"
                    >
                      Change flood level
                    </Button>
                </Popup>

              </Circle>

            <Marker
              position={[14.653747662508655, 121.1051702243884]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_L1),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("Butihin Street, Concepcion Uno, Marikina, Metro Manila, 1807, Philippines")
                setParamsEdited("LS-1")
                setDisplayedDuration(T_L1)
                setDisplayedRainIntensity(RR_L1)
                setInputOpen(true)
              }}
            />

              <Circle
                center={[14.653747662508655, 121.1051702243884]}
                radius={100}
                fill="true"
                color="white"
              />

            <Marker
              position={[14.650649334183358, 121.10587200717488 ]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_L2),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("Bayan-Bayanan Avenue, San Isidro Village, Concepcion Uno, Marikina, Metro Manila, 1807, Philippines")
                setDisplayedDuration(T_L2)
                setDisplayedRainIntensity(RR_L2)
                setParamsEdited("LS-2")
                setInputOpen(true)
              }}
            />

              <Circle
                center={[14.650649334183358, 121.10587200717488]}
                radius={200}
                fill="true"
                color="white"
              />    

            <Marker
              position={[14.649056919352764, 121.10365836405028]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_L3),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("E. Santos, Better Homes Subdivision, Concepcion Uno, Marikina, Metro Manila, 1807, Philippines")
                setDisplayedDuration(T_L3)
                setDisplayedRainIntensity(RR_L3)
                setParamsEdited("LS-3")
                setInputOpen(true)
              }}
            />

            <Circle
                center={[14.649056919352764, 121.10365836405028]}
                radius={100}
                fill="true"
                color="white"
              />    
              
            
              {/* Midstream */}
              <Circle
                center={[14.653865685032384, 121.1204273760795 ]}
                radius={800}
                fill="true"
                color= {colorMid}
                onMouseClick={(e) => {
                  e.target.openPopup();
                }}
              >
                <Popup>Mid stream: 800m radius, 58 meters above water level {"\n"} Flood level: {FD_M_Prev} meters {"\n"}
                <Button
                      onClick={() => {
                        setEditedArea("Midstream")
                        setDisplayedFloodDepth(FD_M_Prev)
                        setInputOpenFlood(true)
                      }}
                      variant="info"
                      block
                      size="sm"
                    >
                      Change flood level
                    </Button>
                </Popup>

              </Circle>

              <Marker
              position={[14.65505610958315, 121.11672977825452 ]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_M1),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("Dao, J. J. Carlos PAG-IBIG Subdivision, Marikina Heights, Marikina, Metro Manila, 1810, Philippines")
                setParamsEdited("MS-1")
                setDisplayedDuration(T_M1)
                setDisplayedRainIntensity(RR_M1)
                setInputOpen(true)
               
              }}
            />

              <Circle
                center={[14.65505610958315, 121.11672977825452]}
                radius={300}
                fill="true"
                color="white"
              />   

            <Marker
              position={[14.650143223871751, 121.11759734316708 ]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_M2),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("Saint Marcellin Champagnat, Marikina Heights, Marikina, Metro Manila, 1810, Philippines")
                setParamsEdited("MS-2")
                setDisplayedDuration(T_M2)
                setDisplayedRainIntensity(RR_M2)
                setInputOpen(true)
              }}
            />
               <Circle
                center={[14.650143223871751, 121.11759734316708 ]}
                radius={100}
                fill="true"
                color="white"
              />   

            <Marker
              position={[14.649242042899639, 121.12131013573247]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_M3),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("General Ordonez, Sunnyville 2, Marikina Heights, Marikina, Metro Manila, 1810, Philippines")
                setParamsEdited("MS-3")
                setDisplayedDuration(T_M3)
                setDisplayedRainIntensity(RR_M3)
                setInputOpen(true)
              }}
            />

            <Circle
                center={[14.649242042899639, 121.12131013573247] }
                radius={200}
                fill="true"
                color="white"
              />   

              {/* Highstream */}
              <Circle
                center={[14.662078019422049, 121.14705419327173 ]}
                radius={800}
                fill="true"
                color= {colorHigh}
                onMouseClick={(e) => {
                  e.target.openPopup();
                }}
              >
                <Popup>High stream: 800m radius, 96 meters above water level {"\n"} Flood level: {FD_H_Prev} meters {"\n"}
                <Button
                      onClick={() => {
                        setEditedArea("Highstream")
                        setDisplayedFloodDepth(FD_H_Prev)
                        setInputOpenFlood(true)
                      }}
                      variant="info"
                      block
                      size="sm"
                    >
                      Change flood level
                    </Button>
                </Popup>

              </Circle>
              <Marker
              position={[14.662659288660977, 121.14690398946355]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_H1),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("Langka Street, AFP Housing, Timberland Heights, Silangan, Rizal, Calabarzon, 1873, Philippines ")
                setParamsEdited("HS-1")
                setDisplayedDuration(T_H1)
                setDisplayedRainIntensity(RR_H1)
                setInputOpen(true)
              }}
            />

              <Circle
                center={[14.662659288660977, 121.14690398946355] }
                radius={100}
                fill="true"
                color="white"
              /> 

            <Marker
              position={[14.664496472498195, 121.14383550568908]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_H2),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("Santa Barbara Villas 1 Phase 1, Timberland Heights, Santo Niño, Rizal, Calabarzon, 1850, Philippines")
                setParamsEdited("HS-2")
                setDisplayedDuration(T_H2)
                setDisplayedRainIntensity(RR_H2)
                setInputOpen(true)
              }}
            />

              <Circle
                center={[14.664496472498195, 121.14383550568908] }
                radius={100}
                fill="true"
                color="white"
              /> 


            <Marker
              position={[14.65933783832797, 121.14738675567922 ]}
              icon={L.icon({
                iconUrl: getMarkerColorRain(RR_H3),
                iconSize: [50, 50],
                iconAnchor: [23, 44],
                popupAnchor: [-2, -38],
              })}
              onClick = {()=>{
                setCurrentInputAddress("Tierra Monte, Silangan, Rizal, Calabarzon, 1873, Philippines")
                setParamsEdited("HS-3")
                setDisplayedDuration(T_L3)
                setDisplayedRainIntensity(RR_L3)
                setInputOpen(true)
              }}
            />
                <Circle
                center={[14.65933783832797, 121.14738675567922] }
                radius={300}
                fill="true"
                color="white"
              /> 
       
      </Map>
    </>
  );
};

const useStyles = makeStyles({
  popover: {
    position: "absolute",
    left: 10,
    top: 145,
    padding: 0,
    zIndex: 1,
    width: "auto",
  },

  iconLabel: {
    display: "flex",
    flexDirection: "column",
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
    width: "auto",
  },

  floodON: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "white" },
    backgroundColor: "white",
    borderRadius: 5,
    width: 50,
    height: 60,
    boxShadow: '1px 1px 2px 1px #bcbcbc',
  
  },
  mainButton: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "white" },
    backgroundColor: "white",
    borderRadius: 50,
    width: 50,
    borderWidth: 1,
    borderColor: "#555555",
    height: 50,
    boxShadow: '1px 1px 2px 1px #bcbcbc',
  },

  snapshotButton: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "white" },
    backgroundColor: "white",
    borderRadius: 50,
    width: "auto",
    borderWidth: 1,
    paddingX: 15,
    paddingY: 5,
    borderColor: "#555555",
    height: "auto",
    marginLeft: 5,
    boxShadow: '1px 1px 2px 1px #bcbcbc',
  },

  floodOFF: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#dedede" },
    backgroundColor: "#dedede",
    borderRadius: 5,
    width: 50,
    height: 60,
    boxShadow: '1px 1px 2px 1px #bcbcbc',
  },

  markerButton: {
    position: "absolute",
    right: 60,
    top: 135,
    zIndex: 1,
    width: 200,
    padding: 0,
  },

  hiddenButton:{
    display: "none"
  }, 

  mobileButton: {
    position: "absolute",
    right: 60,
    top: 205,
    zIndex: 1,
    width: 90,
    padding: 0,
  },
  dostButton: {
    position: "absolute",
    right: 60,
    top: 275,
    zIndex: 1,
    width: 90,
    padding: 0,
  },

  filterALL: {
    position: "absolute",
    right: 60,
    top: 360,
    zIndex: 1,
    width: 90,
    padding: 0,
  },
  filterRAIN: {
    position: "absolute",
    right: 60,
    top: 430,
    zIndex: 1,
    width: 90,
    padding: 0,
  },

  filterFLOOD: {
    position: "absolute",
    right: 60,
    top: 500,
    zIndex: 1,
    width: 90,
    padding: 0,
  },

 
  mainFilterButton: {
    position: "absolute",
    right: 60,
    top: 75,
    zIndex: 1,
    padding: 0,
    borderRadius: 50,
  },

  dateTime: {
    flexDirection: "column",
    display: "flex",
    flexWrap: "wrap",
    zIndex: 2
  },

  snapshotBox: {
    position: "absolute",
    right: 15,
    top: 75,
    zIndex: 2,
    padding: 0,
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap"
  },

  cornerLegend: {
    position: "absolute",
    left: 20,
    bottom: 15,
    zIndex: 2,
    padding: 0,
    margin: 0,
    alignItems: "center",
    flexDirection: "row",
    display: isMobile? "none" : "flex",
    flexWrap: "wrap"
  },
});
