import React, { useState, useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import "../App.css";


function MapFunction() {

  const[mapData, setMapData] = useState();
  const[raftMarkers, setRaftMarkers] = useState();
  const[mobileMarkers, setMobileMarkers] = useState();

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
            onclick={()=>console.log("RAFT marker. Open sidebar")} 
            />
          )
        })
      )
      console.log("RAFTs: ", mapData.mobile);
      console.log("Mobile Reports: ", mapData.raft)
      setMobileMarkers(
        mapData.mobile.map(data=>{
          return(
            <Marker
            key = {data.id} 
            position = {[data.latitude, data.longitude]}  
            onclick={()=>console.log("Mobile marker. Open sidebar")} 
            />
          )
        })
      )
    }
  },[mapData])
  
  return (
    <Map center={[14.41792, 120.97617919999998]} zoom={15}>
     
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />

    {raftMarkers ? raftMarkers : null}
    {mobileMarkers ? mobileMarkers : null}
    </Map>
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


