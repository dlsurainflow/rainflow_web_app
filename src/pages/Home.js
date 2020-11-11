import React, { useState, useEffect } from "react";

import { Map, Marker, TileLayer, Popup, Circle } from "react-leaflet";

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
  Dialog,
  // Tooltip,
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
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import RoomIcon from "@material-ui/icons/Room";
import WavesIcon from "@material-ui/icons/Waves";
import { makeStyles } from "@material-ui/core/styles";
import { isMobile } from "react-device-detect";
// import { borders, shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";
import L from "leaflet";
import Divider from "@material-ui/core/Divider";

import { Line } from "react-chartjs-2";
import jwt_decode from "jwt-decode";
import useInterval from "@use-it/interval";
import legendVertical from "../assets/legend-vertical_legend.png";

export const Home = (props) => {
  const windowHeight = window.innerHeight;
  const classes = useStyles();
  const [mapCenter, setMapCenter] = useState();
  const [mapZoom, setMapZoom] = useState();
  const [mapData, setMapData] = useState();
  const [summaryData, setSummaryData] = useState();
  const [raftMarkers, setRaftMarkers] = useState();
  const [mobileMarkers, setMobileMarkers] = useState();
  const [isOpen, setIsOpen] = useState();
  const [nodeType, setNodeType] = useState("RAFT");
  const [guideShown, setGuideShown] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [showPopover, setShowPopover] = useState();
  const [noSummary, setNoSummary] = useState();
  const [voteLoggedInDialog, setVoteLoggedInDialog] = useState(false);
  const [floodCirclesRAFT, setFloodCirclesRAFT] = useState();
  const [floodCirclesMobile, setFloodCirclesMobile] = useState();
  const [showCircles, setShowCircles] = useState();
  const [showMarkers, setShowMarkers] = useState();
  const [doneInitialFetch, setDoneInitialFetch] = useState();
  const [doneInitialFetchSummary, setDoneInitialFetchSummary] = useState();

  const proxyurl = "";
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // const pr  // const proxyurl = "http://192.168.1.8:8800/";
  // const proxyurl = "http://192.168.1.4:8080/";

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

  const circleColor = (flood_depth) => {
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
  };

  useEffect(() => {
    setShowCircles(false);
    setShowMarkers(true);
    setMapCenter([14.599512, 120.984222]);
    setMapZoom(9);
    decodeToken();
    setShowPopover(true);
  }, []);

  /* Update every map and summary every 10 seconds*/

  useInterval(() => {
    if (doneInitialFetch) {
      fetchData();
    }
    if (doneInitialFetchSummary) {
      fetchSummary();
    }
  }, 10000);

  useEffect(() => {
    if (mapData == null) {
      console.log("first");
      fetchData();
    } else {
      console.log("updated markers");
      setDoneInitialFetch(true);
      setRaftMarkers(
        mapData.raft.map((data) => {
          return (
            <Marker
              key={data.id}
              position={[data.latitude, data.longitude]}
              icon={markerPicker(data.rainfall_rate, data.flood_depth)}
              onMouseOver={(e) => {
                if (!isMobile) {
                  e.target.openPopup();
                }
              }}
              onMouseOut={(e) => {
                if (!isMobile) {
                  e.target.closePopup();
                }
              }}
              onclick={() => {
                setNodeType("RAFT");
                //setSummaryData(data);
                // const proxyurl = "https://cors-anywhere.herokuapp.com/";
                // const proxyurl = "";
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
                          badge: data.badge,
                          address: data.address,
                          rainfall_rate_title: getRainfallRateTitle(
                            data.rainfall_rate
                          ),
                          flood_depth_title: getFloodDepthTitle(
                            data.flood_depth
                          ),
                          rainfall_rate_color: getRainfallRateColor(
                            data.rainfall_rate
                          ),
                          flood_depth_color: getFloodDepthColor(
                            data.flood_depth
                          ),
                          flood_depth_subtitle: getFloodDepthSubTitle(
                            data.flood_depth
                          ),
                          water_level: data.water_level,
                          updatedAt: moment(data.updatedAt).format(
                            "DD MMM YYYY (dddd) HH:mm"
                          ),
                          charts: _data,
                          FD1: _data.FD1,
                          TMP1: _data.TMP1,
                          RA1: _data.RA1,
                          PR1: _data.PR1,
                          HU1: _data.HU1,
                          WL1: _data.WL1,
                        });
                      })
                      .catch((error) => console.error("Error:", error));
                });
              }}
            >
              {isMobile ? null : (
                <Popup>
                  Rainfall rate: {data.rainfall_rate_title} <br /> Flood depth:{" "}
                  {data.flood_depth_title}
                </Popup>
              )}
            </Marker>
          );
        })
      );
      setFloodCirclesRAFT(
        mapData.raft.map((data) => {
          return (
            <Circle
              key={data.id}
              center={{ lat: data.latitude, lng: data.longitude }}
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
              key={data.id}
              center={{ lat: data.latitude, lng: data.longitude }}
              fillColor={circleColor(data.flood_depth)}
              radius={50}
              fillOpacity={0.75}
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
              icon={markerPicker(data.rainfall_rate, data.flood_depth)}
              key={data.id}
              position={[data.latitude, data.longitude]}
              onMouseOver={(e) => {
                if (!isMobile) {
                  e.target.openPopup();
                }
              }}
              onMouseOut={(e) => {
                if (!isMobile) {
                  e.target.closePopup();
                }
              }}
              onclick={() => {
                setNodeType("Mobile");
                reportInfoHandler(data.id, data.username);
              }}
            >
              {isMobile ? null : (
                <Popup>
                  {data.image !== null ? (
                    <>
                      <Image
                        src={`https://rainflow.live/api/uploads/reports/${data.image}`}
                        thumbnail
                        fluid
                      />
                    </>
                  ) : null}
                  Rainfall rate: {data.rainfall_rate_title} <br /> Flood depth:{" "}
                  {data.flood_depth_title}
                </Popup>
              )}
            </Marker>
          );
        })
      );
    }
  }, [mapData]);

  useEffect(() => {
    if (summaryData == null) {
      fetchSummary();
    } else {
      setNoRain([]);
      setLightRain([]);
      setModRain([]);
      setHeavyRain([]);
      setIntenseRain([]);
      setTorrentialRain([]);

      setNoFlood([]);
      setAnkle([]);
      setWaist([]);
      setKnee([]);
      setNeck([]);
      setHead([]);
      setStorey1([]);
      setStorey15([]);
      setStorey2([]);

      setDoneInitialFetchSummary(true);
      console.log("summary updated!");

      if (summaryData[0].length === 0 && summaryData[1].length === 0) {
        setNoSummary(true);
      }
      summaryData[0].map((data) => {
        rainSwitch(
          data.rainfall_rate_title,
          data.address,
          data.latitude,
          data.longitude
        );
        floodSwitch(
          data.flood_depth_title,
          data.address,
          data.latitude,
          data.longitude
        );
        return null;
      });

      summaryData[1].map((data) => {
        rainSwitch(
          data.rainfall_rate_title,
          data.address,
          data.latitude,
          data.longitude
        );
        floodSwitch(
          data.flood_depth_title,
          data.address,
          data.latitude,
          data.longitude
        );
        return null;
      });
    }
  }, [summaryData]);

  const rainSwitch = (level, address, lat, lng) => {
    switch (level) {
      case "No Rain":
        return setNoRain((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Light Rain":
        return setLightRain((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Moderate Rain":
        return setModRain((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Heavy Rain":
        return setHeavyRain((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Intense Rain":
        return setIntenseRain((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Torrential Rain":
        return setTorrentialRain((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      default:
        return null;
    }
  };

  const floodSwitch = (level, address, lat, lng) => {
    switch (level) {
      case "No Flood":
        return setNoFlood((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Ankle Deep":
        return setAnkle((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Knee Deep":
        return setKnee((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Waist Deep":
        return setWaist((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Neck Deep":
        return setNeck((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "Top of Head Deep":
        return setHead((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "1-Storey High":
        return setStorey1((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "1.5-Storey High":
        return setStorey15((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      case "2-Storey or Higher":
        return setStorey2((current) => [
          ...current,
          { address: address, lat: lat, lng: lng },
        ]);
      default:
        return null;
    }
  };

  const reportInfoHandler = async (id, username) => {
    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // const proxyurl = "";
    const url = `https://rainflow.live/api/report/${id}`;
    var token = await localStorage.getItem("token");
    var header;
    if (token === null) {
      console.log("token is null!!", token);
      header = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
    } else {
      console.log("token not null!!", token);
      header = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      console.log("header:", header);
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
            address: data.address,
            badge: data.badge,
            rainfall_rate_title: getRainfallRateTitle(data.rainfall_rate),
            flood_depth_title: getFloodDepthTitle(data.flood_depth),
            flood_depth_subtitle: getFloodDepthSubTitle(data.flood_depth),
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
      rainfall_rate_subtitle: null,
      flood_depth_subtitle: null,
      rainfall_rate_color: null,
      flood_depth_color: null,
      badge: null,
      address: null,
    });
  };

  const onSideSheetHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Container maxWidth={false} className={classes.popover}>
        <Dialog
          isShown={voteLoggedInDialog}
          title="You're not logged in."
          onCloseComplete={() => setVoteLoggedInDialog(false)}
          onConfirm={() => props.history.push("/login")}
          confirmLabel="Click here to login"
        >
          Please log in to vote.
        </Dialog>
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
                <Image src={legendVertical} fluid />
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

      {/* Marker button */}
      <Tooltip title="Click to toggle marker visibility on the map">
        <Box
          maxWidth={false}
          borderColor="grey.400"
          className={classes.markerButton}
          border={1}
          boxShadow={3}
        >
          <IconButton
            onClick={() => {
              setShowMarkers(!showMarkers);
            }}
            className={showMarkers ? classes.floodON : classes.floodOFF}
            classes={{ label: classes.iconLabel }}
            size="medium"
            aria-label="markers"
          >
            <RoomIcon />
            <Heading size={100}>{showMarkers ? "ON" : "OFF"}</Heading>
          </IconButton>
        </Box>
      </Tooltip>

      {/* Flood circle button */}
      <Tooltip title="Click to toggle flood circle marker visibility on the map">
        <Box
          maxWidth={false}
          borderColor="grey.400"
          className={classes.floodCircles}
          border={1}
          boxShadow={3}
        >
          <IconButton
            onClick={() => {
              setShowCircles(!showCircles);
            }}
            className={showCircles ? classes.floodON : classes.floodOFF}
            classes={{ label: classes.iconLabel }}
            size="medium"
            aria-label="circles"
          >
            <WavesIcon />
            <Heading size={100}>{showCircles ? "ON" : "OFF"}</Heading>
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
                    <Heading size={700}>
                      {reportInfo.username}'s Report ({reportInfo.id}){" "}
                      {reportInfo.badge !== null ? (
                        <>
                          <Image
                            src={`https://rainflow.live/api/images/badges/${reportInfo.badge}`}
                            height="20"
                          />
                        </>
                      ) : null}
                    </Heading>
                    <Text size={500}>{reportInfo.updatedAt}</Text>
                    <Text size={300}>{reportInfo.address}</Text>
                    {/* <Text size={500}>Reported by {reportInfo.username}</Text> */}
                  </Pane>
                  {reportInfo.flood_depth_subtitle !== null ? (
                    <Pane
                      display="inline-flex"
                      flexDirection="column"
                      padding={10}
                    >
                      {reportInfo.flood_depth_subtitle ===
                      "Passable to All Types of Vehicles" ? (
                        <Heading
                          size={600}
                          // marginLeft={5}
                          color={"#0eae4e"}
                        >
                          {reportInfo.flood_depth_subtitle}
                        </Heading>
                      ) : (
                        <Heading
                          size={600}
                          // marginLeft={5}
                          color={"#c12123"}
                        >
                          {reportInfo.flood_depth_subtitle}
                        </Heading>
                      )}
                    </Pane>
                  ) : null}

                  <Pane
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    padding={10}
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
                              badge: reportInfo.badge,
                              address: reportInfo.address,
                              description: reportInfo.description,
                              rainfall_rate_title:
                                reportInfo.rainfall_rate_title,
                              flood_depth_title: reportInfo.flood_depth_title,
                              flood_depth_subtitle:
                                reportInfo.flood_depth_subtitle,
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
                              badge: reportInfo.badge,
                              address: reportInfo.address,
                              description: reportInfo.description,
                              rainfall_rate_title:
                                reportInfo.rainfall_rate_title,
                              flood_depth_title: reportInfo.flood_depth_title,
                              flood_depth_subtitle:
                                reportInfo.flood_depth_subtitle,
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
                        } else {
                          setVoteLoggedInDialog(true);
                          setIsOpen(false);
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
                              badge: reportInfo.badge,
                              address: reportInfo.address,
                              rainfall_rate_title:
                                reportInfo.rainfall_rate_title,
                              flood_depth_title: reportInfo.flood_depth_title,
                              flood_depth_subtitle:
                                reportInfo.flood_depth_subtitle,
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
                              badge: reportInfo.badge,
                              address: reportInfo.address,
                              rainfall_rate_title:
                                reportInfo.rainfall_rate_title,
                              flood_depth_title: reportInfo.flood_depth_title,
                              flood_depth_subtitle:
                                reportInfo.flood_depth_subtitle,
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
                        } else {
                          setVoteLoggedInDialog(true);
                          setIsOpen(false);
                        }
                      }}
                    >
                      <HandThumbsDown color="white" size={20} />{" "}
                      {reportInfo.downvote}
                    </Button>
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
                    RAINFALL RATE{" "}
                    <Tooltip title="The amount of rain that falls over time.">
                      <InfoSignIcon size={15} color="grey" />
                    </Tooltip>
                  </Heading>
                  <Heading
                    size={600}
                    marginLeft={10}
                    color={reportInfo.rainfall_rate_color}
                  >
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
                  <Heading
                    size={600}
                    marginLeft={10}
                    color={reportInfo.flood_depth_color}
                  >
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
                overflow={"auto"}
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
                      flexDirection="row"
                    >
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
                      <Heading
                        size={600}
                        marginLeft={15}
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
                              moment.unix(k.time).format("h:mm A")
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
                      <Heading
                        size={600}
                        marginLeft={15}
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
                              moment.unix(k.time).format("h:mm A")
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
                              moment.unix(k.time).format("h:mm A")
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
                              moment.unix(k.time).format("h:mm A")
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
                {raftInfo.humidity !== null ? (
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
                              moment.unix(k.time).format("h:mm A")
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
                              moment.unix(k.time).format("h:mm A")
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

      <CornerDialog
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
      </CornerDialog>

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

        {raftMarkers && showMarkers ? raftMarkers : null}
        {mobileMarkers && showMarkers ? mobileMarkers : null}

        {showCircles ? floodCirclesMobile : null}
        {showCircles ? floodCirclesRAFT : null}
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

  floodCircles: {
    position: "absolute",
    right: 60,
    top: 150,
    zIndex: 1,
    width: "auto",
    padding: 0,
  },

  markerButton: {
    position: "absolute",
    right: 60,
    top: 75,
    zIndex: 1,
    width: "auto",
    padding: 0,
  },
});
