import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "../App.css";
import { SideSheet, Pane, Heading, Card, Position, Text } from 'evergreen-ui'
import { WiRain, WiFlood, WiThermometer, WiBarometer, WiHumidity } from "weather-icons-react";

function MapFunction() {

  const[mapData, setMapData] = useState();
  const[raftMarkers, setRaftMarkers] = useState();
  const[mobileMarkers, setMobileMarkers] = useState();
  const[sidebar, setSidebar] = useState();
  const[isOpen, setIsOpen] = useState(true);
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
              setIsOpen(true);
              onSideSheetHandler("RAFT", data);
              console.log("RAFT marker. Open sidebar")}} 
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
              setIsOpen(true);
              onSideSheetHandler("mobile", data);
              console.log("Mobile marker. Open sidebar")}} 
            />
          )
        })
      )
    }
  },[mapData])


  const onSideSheetHandler = (nodeType, data) =>{
    console.log("TEST: ", isOpen)
    setSidebar(
      <SideSheet
      isShown={isOpen}
      position = {Position.BOTTOM}
     // onCloseComplete={() => setIsOpen(false)}
      onBeforeClose={() => setIsOpen(false)}
      containerProps={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        maxHeight: 400
      }}
    >
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="#425A70">
        <Pane padding={20}>
          <Heading size={700} color = "white">{nodeType === "RAFT" ? 'RAFT DEVICE': 'REPORT ID: ' } {nodeType === "RAFT" ? null : data.id}</Heading>
          <Text size = {500} color = "white">{data.username}</Text>
        </Pane>
      </Pane>
      <Pane flex="1" overflowY="scroll" background="#F9F9FB" paddingX={10}>
        
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
          <Heading size = {600} marginLeft = {10}>{nodeType === "RAFT" ? data.rainfall_amount : data.rainfall_rate} </Heading>
        
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
          <Heading size = {600} marginLeft = {10}> {data.flood_depth}</Heading>
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
              <Heading size = {600}> {data.temperature}</Heading>
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
              <Heading size = {600}>{data.humidity}</Heading>
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
              <Heading size = {600} marginLeft = {10}>{data.pressure}</Heading>
            </Card>

          
            <Card
              backgroundColor="white"
              elevation={0}
              height={65}
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding = {20}
              marginY = {10}
            >
              <Heading size = {100} >RAFT OWNED BY:</Heading>
              <Heading size = {500} marginLeft = {10}>{data.username}</Heading>
            </Card>
            
          </>
            ) : null}
        </Pane>
    </SideSheet>
    )
  }



  return (
    <>
    {sidebar}  
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


