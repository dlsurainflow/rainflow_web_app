import React from "react";
import Container from "@material-ui/core/Container";
// import axios from "axios";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
import { Typography } from "@material-ui/core";
// import { Modal, Button } from "react-bootstrap";
// import moment from "moment";
// import Image from "react-bootstrap/Image";
// import { Map, TileLayer, Marker, Popup } from "react-leaflet";
// import ReactMapGL, { Marker } from "react-map-gl";
// import leaflet from "leaflet";
// import HashLoader from "react-spinners/HashLoader";
// import LocationOnIcon from "@material-ui/icons/LocationOn";
// import GpsFixedIcon from "@material-ui/icons/GpsFixed";
// import ImageIcon from "@material-ui/icons/Image";
// import { WiRain, WiFlood } from "weather-icons-react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Grid from "@material-ui/core/Grid";
// import GREEN from "@material-ui/core/colors/green";
// import RED from "@material-ui/core/colors/red";
// import YELLOW from "@material-ui/core/colors/yellow";
// import ORANGE from "@material-ui/core/colors/orange";
import { Jumbotron } from "react-bootstrap";
// import BootstrapContainer from "react-bootstrap/Container";
// import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import tmpImage from "../assets/placeholder.png";
import { makeStyles } from "@material-ui/core/styles";
import ivanphoto from "../assets/ivan.png";
import michiphoto from "../assets/michi.jpg";
import johannphoto from "../assets/johann.jpg";
import ralphphoto from "../assets/ralph.png";
import tammyphoto from "../assets/tammy.jpg";
import groupphoto from "../assets/group.png";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 440,
  },
  media2: {
    height: 50,
  },
  container: {
    width: "100%",
    paddingLeft: 40,
    paddingRight: 40,
    paddingY: 10,
    backgroundColor: "#F8F8F8",
  },
});

export const About = () => {
  const classes = useStyles();
  return (
    <Container  maxWidth={false} className = {classes.container}>
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Jumbotron
            style={{
              backgroundColor: "#3CB371",
              marginTop: 10,
              marginBottom: 0
              //backgroundImage: `url(../assets/background-1789175_1280.png)`,
            }}
          >
            <center>
              <h3 class="text-white">User Privileges</h3>
            </center>
          </Jumbotron>
        </Grid>
        <Grid item xs={6}>
          <Card>
             {/*<CardMedia className={classes.media2} image={tmpImage} />*/}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Guest
              </Typography>
              <Typography variant="body2" component="p">
                <ul>
                  <li>
                    View the RainFLOW map and nodes containing reports from RAFT
                    devices and other mobile users
                  </li>
                  <li>
                    Receive push notifications when you are near a marker with
                    high rain and flood readings
                  </li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            {/*<CardMedia className={classes.media2} image={tmpImage} />*/}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Authenticated User
              </Typography>
              <Typography variant="body2" component="p">
                <ul>
                  <li>
                    View the RainFLOW map and nodes containing reports from RAFT
                    devices and other mobile users
                  </li>
                  <li>
                    Receive push notifications when you are near a marker with
                    high rain and flood readings
                  </li>
                  <li>Submit flood reports and view your report history</li>
                  <li>Upvote/downvote reports made by other users</li>
                  <li>
                    Earn points to upgrad your badge when your reports receives
                    a high number of upvotes
                  </li>
                  <li>
                    Register your own RAFT (Rain and Flood Tracker) device or
                    IoT device and monitor its status
                  </li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Jumbotron
            style={{
              backgroundColor: "#45B39D"
              //backgroundImage: `require(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)`,
            }}
          >
            <center>
              <h3 class="text-white">The Team</h3>
              <hr />
              <h6 class="text-white">
                We are a team of dedicated Computer Engineering students from De
                La Salle University who believe that modern problems require
                modern solutions.
              </h6>
              <br />
              <h6 class="text-white">
                We believe in technological innovations.
              </h6>
            </center>
          </Jumbotron>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia className={classes.media} image={michiphoto} />
            <CardContent>
              <center>
                <Typography variant="h6">Michael Busiños</Typography>
                <Typography variant="body">Student</Typography>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia className={classes.media} image={tammyphoto} />
            <CardContent>
              <center>
                <Typography variant="h6">Tammara Capa</Typography>
                <Typography variant="body">Student</Typography>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia className={classes.media} image={johannphoto} />
            <CardContent>
              <center>
                <Typography variant="h6">Johann Carta</Typography>
                <Typography variant="body">Student</Typography>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia className={classes.media} image={ralphphoto} />
            <CardContent>
              <center>
                <Typography variant="h6">Ralph De Rojas</Typography>
                <Typography variant="body">Student</Typography>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia className={classes.media} image={ivanphoto} />
            <CardContent>
              <center>
                <Typography variant="h6">Ivan Garan</Typography>
                <Typography variant="body">Student</Typography>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardMedia className={classes.media} image={tmpImage} />
            <CardContent>
              <center>
                <Typography variant="h6">Jose Antonio Catalan</Typography>
                <Typography variant="body">Adviser</Typography>
              </center>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* </Jumbotron> */}
    </Container>
  );

  // <Container>
  //   <Grid container spacing={3} alignItems="center">
  //     <Grid item xs={12}>
  //       <Jumbotron>
  //         <Grid item xs={12} alignItems="center">
  //           <Typography variant="h4">User Privileges</Typography>
  //         </Grid>
  //         <Grid item xs={6}>
  //           <Typography variant="h5">Guests</Typography>
  //           <Typography variant="body">
  // <ul>
  //   <li>
  //     View the RainFLOW map and nodes containing reports from RAFT
  //     devices and other mobile users
  //   </li>
  //   <li>
  //     Receive push notifications when you are near a marker with
  //     high rain and flood readings
  //   </li>
  // </ul>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={6}>
  //           <Typography variant="h5">Authenticated Users</Typography>
  //           <Typography variant="body">
  // <ul>
  //   <li>
  //     View the RainFLOW map and nodes containing reports from RAFT
  //     devices and other mobile users
  //   </li>
  //   <li>
  //     Receive push notifications when you are near a marker with
  //     high rain and flood readings
  //   </li>
  //   <li>Submit flood reports and view your report history</li>
  //   <li>Upvote/downvote reports made by other users</li>
  //   <li>
  //     Earn points to upgrad your badge when your reports receives a
  //     high number of upvotes
  //   </li>
  //   <li>
  //     Register your own RAFT (Rain and Flood Tracker) device or IoT
  //     device and monitor its status
  //   </li>
  // </ul>
  //           </Typography>
  //         </Grid>
  //       </Jumbotron>
  //     </Grid>
  //     <Grid item xs={12}>
  //       <Jumbotron>
  //         <Typography variant="h4">Our Team</Typography>
  //         <Typography variant="body">
  //           We are a team of dedicated Computer Engineering students from De La
  //           Salle University who believe that modern problems require modern
  //           solutions.
  //         </Typography>
  //       </Jumbotron>
  //     </Grid>
  //   </Grid>
  // </Container>
};
