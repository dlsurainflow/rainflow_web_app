import React, { useState, useEffect} from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "../App.css";
import { Pane, Heading, Card, Text } from 'evergreen-ui'
import { WiRain, WiFlood, WiThermometer, WiBarometer, WiHumidity } from "weather-icons-react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { useParams } from "react-router";
import { HandThumbsUp, HandThumbsDown } from 'react-bootstrap-icons';

function MapFunction() {
  let { token_params } = useParams();
  const[mapData, setMapData] = useState();
  const[raftMarkers, setRaftMarkers] = useState();
  const[mobileMarkers, setMobileMarkers] = useState();
  const[isOpen, setIsOpen] = useState();
  const[nodeType, setNodeType] = useState("RAFT")
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const [raftInfo, setRaftInfo] = useState(
    {
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
    }
  )
  const [reportInfo, setReportInfo] = useState(
    {
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
      currentAction: null
    }
  )
  const windowWidth = window.innerWidth;

  const fetchData = async() =>{
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://rainflow.live/api/map/all'

    await fetch(proxyurl + url , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          'Accept' : 'application/json', 
      }
      }).then(response => {
        console.log(response.status);
        if(response.status === 200)
          response.json().then( data =>{setMapData(data)});
      })
      .catch(error => console.error('Error:', error));
  }
  
  useEffect(() =>{
    if(mapData == null){
      fetchData();
    }else{
      console.log("TBP: ", mapData);
      setRaftMarkers(
        mapData.raft.map(data=>{
          console.log("raft: ", data)
          return(
            <Marker
            key = {data.id} 
            position = {[data.latitude, data.longitude]}  
            onclick={()=>{
              setNodeType("RAFT")
              onSideSheetHandler();
              setRaftInfo(
                {
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
                  updatedAt: moment(data.updatedAt).format("DD MMM YYYY (dddd) HH:mm"),
                }
              )
            }}
            />
          )
        })
      )
      console.log("Mobile: ", mapData.mobile);
      console.log("RAFT: ", mapData.raft)
      setMobileMarkers(
        mapData.mobile.map(data=>{
          return(
            <Marker
            key = {data.id} 
            position = {[data.latitude, data.longitude]}  
            onclick={()=>{
              setNodeType("Mobile")
              reportInfoHandler(data.id, data.username);
              
            }}
            />
          )
        })
      )
    }
  },[mapData])

  const reportInfoHandler =async(id, username)=>{
    const url = `https://rainflow.live/api/report/${id}`;
    var header;
    if(token_params === "guest"){
      header = {
          'Content-Type': 'application/json',
          'Accept' : 'application/json', 
        }
    }else{
        header = {
          'Content-Type': 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${token_params}`
        }
    }

    await fetch(proxyurl + url, {
      method: 'GET',
      headers: header
      }).then(response => {
        if(response.status === 200)
          response.json().then( (data) => {
            setReportInfo(
              {
                id: data.id,
                latitude: data.latitude,
                longitude: data.longitude,
                flood_depth: data.flood_depth,
                rainfall_rate: data.rainfall_rate,
                username: username,
                updatedAt: moment(data.createdAt).format("DD MMM YYYY (dddd) HH:mm"), 
                image: data.image,
                upvote: data.upvote,
                downvote: data.downvote,
                currentAction: data.currentAction
              }
              )
              onSideSheetHandler();
          });
        else{
          console.log(`Error retrieving reports! (Code: ${response.status})`);
        }
      })
  }
  
  const handleClose = () => {
    setIsOpen(false)
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
  }) 

  setReportInfo( {
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
    currentAction: null
  })
  }

  const onSideSheetHandler = () =>{
   setIsOpen(true)
  }



  return (
    <>
     <Modal show = {isOpen} onHide ={handleClose}  dialogClassName="modal-main"  animation={false}>
      <Modal.Header closeButton>
      <Modal.Title>
      <Pane  flex="1" flexDirection="row" backgroundColor="#fff">
        <Pane flex="1" padding={10}>
          <Heading size={700} >{nodeType === "RAFT" ? 'RAFT DEVICE': 'Report ID: ' } {nodeType === "RAFT" ? null : reportInfo.id}</Heading>
          <Text size = {500} >{nodeType === "RAFT" ? 'Owned by: ': 'Reported by: ' }{nodeType === "RAFT" ? raftInfo.username: reportInfo.username } </Text>
        </Pane>
      </Pane>
      </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
      <Pane flex="1" maxHeight ={300} overflow ={"auto"} background="#F9F9FB" paddingX={5} margin ={0}>

        {nodeType === "Mobile" ? (
            <>
             <Pane flexDirection = "row" display = "flex"  alignItems="center" justifyContent="space-around">
            <Card
            backgroundColor="white"
            elevation={0}
            height={90}
            width = {windowWidth * 0.45}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection = "column"
          >
            <Pane flexDirection = "row" justifyContent = "center" alignItems = "center">
              <HandThumbsUp color ="green" size = {25} />
              </Pane>
              <Heading size = {600} color = "green"> {reportInfo.upvote}</Heading>
          </Card>
            <Card
               backgroundColor="white"
               elevation={0}
               height={90}
               width = {windowWidth * 0.45}
               display="flex"
               alignItems="center"
               alignContent = "center"
               justifyContent="center"
               flexDirection = "column"
               padding = {20}
          >
            <Pane flexDirection = "row" justifyContent = "center" alignItems = "center">
              <HandThumbsDown color ="red" size = {25} />
              </Pane>
              <Heading size = {600} color = "red"> {reportInfo.downvote}</Heading>
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
          alignContent = "center"
          padding = {20}
          marginY = {10}
          >
          <WiRain size={40} color="black"/>
          <Heading size = {100} marginLeft = {5}>{nodeType === "RAFT" ? 'RAINFALL AMOUNT: ': 'RAIN INTENSITY:' }</Heading>
          <Heading size = {600} marginLeft = {10}>{nodeType === "RAFT" ? raftInfo.rainfall_amount : reportInfo.rainfall_rate} </Heading>
        
        </Card>

        <Card
          backgroundColor="white"
          elevation={0}
          height={65}
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          padding = {20}
          marginY = {10}
        >
          <WiFlood size={40} color="black" />
          <Heading size = {100} marginLeft = {5}>FLOOD DEPTH:</Heading>
          <Heading size = {600} marginLeft = {10}>{nodeType === "RAFT" ? raftInfo.flood_depth : reportInfo.flood_depth} </Heading>
        </Card>
        {nodeType === "RAFT" ? (
          <>
            <Pane flexDirection = "row" display = "flex"  alignItems="center" justifyContent="space-around">
              <Card
                backgroundColor="white"
                elevation={0}
                height={90}
                width = {windowWidth * 0.45}
                display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection = "column"
              padding = {20}
            >
              <Pane flexDirection = "row" justifyContent = "center" alignItems = "center">
              <WiThermometer size={40} color="black" />
              </Pane>
              <Heading size = {600}> {raftInfo.temperature}</Heading>
              <Heading size = {100} >TEMPERATURE</Heading>
            </Card>
            <Card
              backgroundColor="white"
              elevation={0}
              height={90}
              width = {windowWidth * 0.45}
              display="flex"
              alignItems="center"
              alignContent = "center"
              justifyContent="center"
              flexDirection = "column"
              padding = {20}
            >
              <Pane flexDirection = "row" justifyContent = "center" alignItems = "center">
              <WiHumidity size={40} color="black" />
              </Pane>
              <Heading size = {600}>{raftInfo.humidity}</Heading>
              <Heading size = {100} >HUMIDITY</Heading>
            </Card>
          </Pane>
            
            <Card
              backgroundColor="white"
              elevation={0}
              height={65}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              padding = {20}
              marginY = {10}
            >
              <WiBarometer size={40} color="black" />
              <Heading size = {100} marginLeft = {5}>PRESSURE:</Heading>
              <Heading size = {600} marginLeft = {10}>{raftInfo.pressure}</Heading>
            </Card>

          
            
          </>
            ) : null}
              {reportInfo.image!= null ?(
                <Card
                backgroundColor="white"
                elevation={0}
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                padding = {20}
                marginY = {10}
                >
              <Pane flexDirection = "column" justifyContent = "center" alignItems = "center">
                <Heading size = {100} >PHOTO: </Heading>
                <Image src = {`https://rainflow.live/api/uploads/reports/${reportInfo.image}`} fluid />
              </Pane>

                </Card>
              ): null}

            <Card
              backgroundColor="white"
              elevation={0}
              height={65}
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              padding = {20}
              marginY = {10}
              >
              <Heading size = {100} >{nodeType === "RAFT" ? "UPDATED AT:" : "REPORTED AT: "}</Heading>
              <Heading size = {500} marginLeft = {10}>{nodeType === "RAFT" ? raftInfo.updatedAt : reportInfo.updatedAt}</Heading>
            </Card>
        </Pane>
      </Modal.Body>
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
  )
}

export const MobileMap = (props) => {
  // useEffect(() => props.setIsNavBarHidden(true));
  return (
    // <Container>
    <MapFunction/>
    // </Container>
  );
};


