import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer, Popup} from "react-leaflet";
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
} from "evergreen-ui";
import {
  WiRain,
  WiFlood,
  WiThermometer,
  WiBarometer,
  WiHumidity,
} from "weather-icons-react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { HandThumbsUp, HandThumbsDown } from "react-bootstrap-icons";
import IconButton from '@material-ui/core/IconButton';
import ViewList from '@material-ui/icons/ViewList';
import { makeStyles } from "@material-ui/core/styles";
import { borders, shadows } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import L from 'leaflet';
import * as nominatim from 'nominatim-geocode';



export const Home = () => {
  const windowHeight = window.innerHeight;
  const classes = useStyles();
  const [mapData, setMapData] = useState();
  const [summaryData, setSummaryData] = useState()
  const [raftMarkers, setRaftMarkers] = useState();
  const [mobileMarkers, setMobileMarkers] = useState();
  const [isOpen, setIsOpen] = useState();
  const [nodeType, setNodeType] = useState("RAFT");
  const [guideShown, setGuideShown] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const [showPopover, setShowPopover] = useState(false);
  const [markerName, setMarkerName] = useState("");
 
  const proxyurl = "";
  //const proxyurl = "https://cors-anywhere.herokuapp.com/";

  
  const [raftInfo, setRaftInfo] = useState({
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

  const [noRain, setNoRain] = useState([])
  const [lightRain, setLightRain] = useState([])
  const [modRain, setModRain] = useState([])
  const [heavyRain, setHeavyRain] = useState([])
  const [intenseRain, setIntenseRain] = useState([])
  const [torrentialRain, setTorrentialRain] = useState([])

  const [noFlood, setNoFlood] = useState([])
  const [ankle, setAnkle] = useState([])
  const [waist, setWaist] = useState([])
  const [neck, setNeck] = useState([])
  const [head, setHead] = useState([])
  const [storey1, setStorey1] = useState([])
  const [storey2, setStorey2] = useState([])
  const [storey15, setStorey15] = useState([])
 
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
            setSummaryData(data)
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
  
    return  L.icon({ iconUrl:`https://rainflow.live/api/images/marker/0_${rain}${flood}.png`, iconSize: [50, 50], iconAnchor: [28, 47], popupAnchor: [-5, -43]})
  }
  
  useEffect(() => {
    if (mapData == null) {
      fetchData();
    } else {
      setRaftMarkers(
        mapData.raft.map((data) => {

          console.log(markerName)
          return (
            <Marker
              key={data.id}
              position={[data.latitude, data.longitude]}
              icon={ markerPicker(data.rainfall_rate, data.flood_depth)}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
              onclick={() => {
                setNodeType("RAFT");
                onSideSheetHandler();
                setRaftInfo({
                  id: data.id,
                  latitude: data.latitude,
                  longitude: data.longitude,
                  altitude: data.altitude,
                  flood_depth: data.flood_depth,
                  rainfall_amount: data.rainfall_amount,
                  temperature: data.temperature,
                  humidity: data.humidity,
                  pressure: data.pressure,
                  username: data.username,
                  updatedAt: moment(data.updatedAt).format(
                    "DD MMM YYYY (dddd) HH:mm"
                  ),
                });
              }}
            >
               <Popup>Rainfall rate: {data.rainfall_rate_title} <br/> Flood depth: {data.flood_depth_title}</Popup>
            </Marker>
          );
        })
      );
      console.log("Mobile: ", mapData.mobile);
      console.log("RAFT: ", mapData.raft);
      setMobileMarkers(
        mapData.mobile.map((data) => {
 
          return (
            <Marker
              icon={ markerPicker(data.rainfall_rate, data.flood_depth) }
              key={data.id}
              position={[data.latitude, data.longitude]}
              onMouseOver={(e) => {
                e.target.openPopup();
              }}
              onMouseOut={(e) => {
                e.target.closePopup();
              }}
              onclick={() => {
                setNodeType("Mobile");
                reportInfoHandler(data.id, data.username);
              }}
            >
              <Popup>Rainfall rate: {data.rainfall_rate_title} <br/> Flood depth: {data.flood_depth_title}</Popup>
            </Marker>
          );
        })
      );

    }
  }, [mapData]);

  useEffect(()=>{
    if(summaryData == null){
      fetchSummary()
   
    }else{
    
        
        summaryData[0].map((data)=>{
          reverseGeocoder(data.latitude, data.longitude, data.rainfall_rate_title, data.flood_depth_title);
          return(null)
         })
  
        summaryData[1].map((data)=>{
          reverseGeocoder(data.latitude, data.longitude, data.rainfall_rate_title, data.flood_depth_title);
          return(null)
         })
  
        if(summaryData[0].length === 0 && summaryData[1].length === 0 ){
          setShowPopover(true);
        }
   
    }
  },[summaryData])

  const reverseGeocoder = (lat, lon, rainfall, flood, id) =>{
    nominatim.reverse({ lat: lat, lon: lon }, (err, result) => {
      if(!err) 
       var address = `${result.address.road}, ${result.address.neighbourhood}, ${result.address.suburb}, ${result.address.city}`
       rainSwitch(rainfall, address)
       floodSwitch(flood, address)

    });
  }
  const rainSwitch = (level, address) =>{
    switch(level){
      case 'No Rain': return setNoRain((current)=>[...current, address]);
      case 'Light Rain': return setLightRain((current)=>[...current, address]);
      case 'Moderate Rain': return setModRain((current)=>[...current, address]);
      case 'Heavy Rain' : return setHeavyRain((current)=>[...current, address]);
      case 'Intense Rain' : return setIntenseRain((current)=>[...current, address]);
      case 'Torrential Rain': return setTorrentialRain((current)=>[...current, address]);
      default: return null;
    }
  }

  const floodSwitch = (level, address) =>{
    switch(level){
      case 'No Flood': return setNoFlood((current)=>[...current, address]);
      case 'Ankle Deep': return setAnkle((current)=>[...current, address]);
      case 'Waist Deep': return setWaist((current)=>[...current, address]);
      case 'Neck Deep' : return setNeck((current)=>[...current, address]);
      case 'Top of Head Deep' : return setHead((current)=>[...current, address]);
      case '1-Storey High': return setStorey1((current)=>[...current, address]);
      case '1.5-Storey High': return setStorey15((current)=>[...current, address]);
      case '2-Storey or Higher': return setStorey2((current)=>[...current, address]);
      default: return null;
    }

  }

  const reportInfoHandler = async (id, username) => {
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

  const onSideSheetHandler = () => {
    setIsOpen(true);
  };

  return (
    <>
    <Container maxWidth = {false} className = {classes.popover}>
      <Popover
      className = {classes.root}
      isShown = {showPopover}
      onBodyClick = {()=>setShowPopover(false)}
      onOpen = {()=>setShowPopover(true)}
      content={
        <Pane
          width={410}
          height={550}
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection="column"
          overflow = "auto"
        >
          <Pane width = "100%" height = {110}  padding = {20} justifyContent = "center" alignItems = "center">
            <Heading> LEGEND HERE </Heading>
          </Pane>
          <Tablist
            width = "100%"
            padding = {10}
            backgroundColor = "#F1FBFC"
            >
            <Tab
              id = "flood"
              onSelect={()=>setTabIndex(0)}
              isSelected ={tabIndex === 0}
              aria-controls = {`panel-flood`}
              >
                Areas by Flood Level
              </Tab>
            <Tab
              id = "flood"
              onSelect={()=>setTabIndex(1)}
              isSelected ={tabIndex === 1}
              aria-controls = {`panel-rain`}
              >
                Areas by Rain Intensity Level
              </Tab>
                </Tablist>
              
              <Pane
                width = "100%"
                flexGrow = {1}
                overflow = "auto"
                padding = {20}
                backgroundColor = "#F9F9FB"
                id={`panel-flood`}
                role="tabpanel"
                aria-labelledby="flood"
                aria-hidden={tabIndex === 0? false : true}
                display={tabIndex === 0 ? 'block' : 'none'}
              >
               
               <Card flexDirection = "column" display = {noFlood.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>No flood (0 - 0.1 meters): </Heading>
                 { noFlood.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {ankle.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Ankle Deep (0.1 - 0.25 meters): </Heading>
                 { ankle.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {waist.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Waist Deep (0.7 - 1.2 meters): </Heading>
                 { waist.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {neck.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Neck Deep (1.2 - 1.6 meters): </Heading>
                 {neck.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {head.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Top of Head Deep (1.6 - 2.0 meters): </Heading>
                 { head.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {storey1.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>1-Storey High (2.0 - 3.0 meters):</Heading>
                 { storey1.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {storey15.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>1.5-Storey High (3.0 - 4.5 meters): </Heading>
                 { storey15.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {storey2.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}> 
                 <Heading>2-Storey or Higher (4.5+ meters):</Heading>
                 { storey2.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
                
               
              </Pane>
              <Pane
                width = "100%"
                flexGrow = {1}
                padding = {20}
                backgroundColor = "#F9F9FB"
                id={`panel-rain`}
                role="tabpanel"
                aria-labelledby="rain"
                aria-hidden={tabIndex === 1? false : true}
                display={tabIndex === 1 ? 'block' : 'none'}
              >
               
               <Card flexDirection = "column" display = {noRain.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>No rain (0 mm/hr): </Heading>
                 { noRain.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {lightRain.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Light Rain (0.01 - 2.5 mm/hr):</Heading>
                 { lightRain.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {modRain.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Moderate Rain (2.5 - 7.5 mm/hr):</Heading>
                 { modRain.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {heavyRain.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Heavy Rain (7.5 - 15 mm/hr):</Heading>
                 {heavyRain.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {intenseRain.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Intense Rain (15 - 30 mm/hr):</Heading>
                 { intenseRain.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               <Card flexDirection = "column" display = {torrentialRain.length > 0 ? 'inline-flex' : 'none'} marginBottom = {20}>
                 <Heading>Torrential Rain (30+ mm/hr):</Heading>
                 { torrentialRain.map((address)=>{
                    return (<Text paddingBottom = {4.5}>- {address}</Text>)
                  }
                  )}
               </Card>
               
              </Pane>

        </Pane>    
      }
      position={Position.TOP_LEFT}
    
    >
      <Box borderColor="grey.400" border = {1} boxShadow={3}>
      <IconButton className={classes.customHoverFocus} size = "small" aria-label="delete">
        <ViewList />
      </IconButton>
      </Box>

    </Popover>
    </Container>

      <Modal
        show={isOpen}
        onHide={handleClose}
        dialogClassName="modal-main-web"
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Pane flex="1" flexDirection="row" backgroundColor="#fff">
              <Pane display = "inline-flex" flexDirection="column" padding={10}>
                <Heading size={700}>
                  {nodeType === "RAFT" ? "RAFT DEVICE" : "Report ID: "}{" "}
                  {nodeType === "RAFT" ? null : reportInfo.id}
                </Heading>
              <Text size={500}>
                {nodeType === "RAFT" ? (raftInfo.updatedAt) : (reportInfo.updatedAt)}
              </Text>
                <Text size={500}>
                  {nodeType === "RAFT" ? "Owned by: " : "Reported by: "}
                  {nodeType === "RAFT"
                    ? raftInfo.username
                    : reportInfo.username}{" "}
                </Text>
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
            {nodeType === "Mobile" ? (
              <>
                <Pane
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    height={90}
                    width={windowWidth * 0.45}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                  >
                    <Pane
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <HandThumbsUp color="green" size={25} />
                    </Pane>
                    <Heading size={600} color="green">
                      {" "}
                      {reportInfo.upvote}
                    </Heading>
                  </Card>
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    height={90}
                    width={windowWidth * 0.45}
                    display="flex"
                    alignItems="center"
                    alignContent="center"
                    justifyContent="center"
                    flexDirection="column"
                    padding={20}
                  >
                    <Pane
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <HandThumbsDown color="red" size={25} />
                    </Pane>
                    <Heading size={600} color="red">
                      {" "}
                      {reportInfo.downvote}
                    </Heading>
                  </Card>
                </Pane>
              </>
            ) : null}

    
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
              <WiRain size={40} color="black" />
              <Heading size={100} marginLeft={5}>
                {nodeType === "RAFT" ? "RAINFALL AMOUNT: " : "RAIN INTENSITY:"}
              </Heading>
              <Heading size={600} marginLeft={10}>
                {nodeType === "RAFT"
                  ? raftInfo.rainfall_amount + " mm/hr"
                  : reportInfo.rainfall_rate}{" "}
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
              <WiFlood size={40} color="black" />
              <Heading size={100} marginLeft={5}>
                FLOOD DEPTH:
              </Heading>
              <Heading size={600} marginLeft={10}>
                {nodeType === "RAFT"
                  ? raftInfo.flood_depth + " meters"
                  : reportInfo.flood_depth}{" "}
              </Heading>
            </Card>
            {nodeType === "RAFT" ? (
              <>
                <Pane
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    height={90}
                    width={windowWidth * 0.45}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column"
                    padding={20}
                  >
                    <Pane
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <WiThermometer size={40} color="black" />
                    </Pane>
                    <Heading size={600}> {raftInfo.temperature} C</Heading>
                    <Heading size={100}>TEMPERATURE</Heading>
                  </Card>
                  <Card
                    backgroundColor="white"
                    elevation={0}
                    height={90}
                    width={windowWidth * 0.45}
                    display="flex"
                    alignItems="center"
                    alignContent="center"
                    justifyContent="center"
                    flexDirection="column"
                    padding={20}
                  >
                    <Pane
                      flexDirection="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <WiHumidity size={40} color="black" />
                    </Pane>
                    <Heading size={600}>{raftInfo.humidity}</Heading>
                    <Heading size={100}>HUMIDITY</Heading>
                  </Card>
                </Pane>

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
                  <WiBarometer size={40} color="black" />
                  <Heading size={100} marginLeft={5}>
                    PRESSURE:
                  </Heading>
                  <Heading size={600} marginLeft={10}>
                    {raftInfo.pressure}
                  </Heading>
                </Card>
              </>
            ) : null}
            {reportInfo.image != null ? (
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
                  <Heading size={100}>PHOTO: </Heading>
                  <Image
                    src={`https://rainflow.live/api/uploads/reports/${reportInfo.image}`}
                    fluid
                  />
                </Pane>
              </Card>
            ) : null}

            
          </Pane>
        </Modal.Body>
      </Modal>

      <CornerDialog
        title = {<Pane flexDirection = "row" display = "flex" alignItems= "center">
        <InfoSignIcon size = {20} color="info" marginRight={10} /> <Heading size ={600}>Welcome to RainFLOW!</Heading>
        </Pane>
      }
        isShown = {guideShown}
        onCloseComplete={()=> setGuideShown(false)}
        hasFooter = {false}
        position = {Position.BOTTOM_RIGHT}
        >
          Click on any node on the map to view the rain and flood information reported in that area. Toggle the button at the top left to view the marker legend and all the flooded areas grouped by level.
      </CornerDialog>
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
};


const useStyles = makeStyles({
  popover: {
    position: "absolute",
    left: 10,
    top: 150,
    padding: 0,
    zIndex: 1,
    width : "auto",
  },
  customHoverFocus: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#D2EEF3" },
    backgroundColor: "white",
    borderRadius: 2,
    flexWrap: "wrap"
  },
  root:{flexWrap: "wrap"}
});