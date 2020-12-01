import React from "react";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Grid from "@material-ui/core/Grid";
import { Jumbotron } from "react-bootstrap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import tmpImage from "../assets/placeholder.png";
import Image from "react-bootstrap/Image";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 440,
  },
  banner: {
    width: "100%",
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: "#F8F8F8",
  },
});

export const BadgeIndex = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={false} className = {classes.banner}>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Jumbotron
            style={{
              backgroundColor: "#45B39D",
              marginTop: 10,
              marginBottom: 0
              //backgroundImage: `require(https://mdbootstrap.com/img/Photos/Others/gradient1.jpg)`,
            }}
          >
            <center>
              <h2 class="text-white">Badge Index</h2>
              <hr />
              <h6 class="text-white">
                Registered users have a badge affixed to their username. This signifies the amount of points
                they have accumulated. There is also a special badge indicating if a user owns a RAFT device.
              </h6>
            
            </center>
          </Jumbotron>
        </Grid>
   
        <Grid item xs={12}>
          <Card>
             {/*<CardMedia className={classes.media2} image={tmpImage} />*/}
            <CardContent>
              <Typography gutterBottom variant="h8" component="h6">
                How to gain points:
              </Typography>
              <Typography variant="body2" component="p">
                <ul>
                  <li>
                  Registered users gain a point for every upvote on their flood reports.
                  </li>
                  <li>
                  Likewise, they lose a point for every downvote.
                  </li>
                  <li>
                  Points are added once a report has been archived.
                  </li>
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            {/*<CardMedia className={classes.media2} image={tmpImage} />*/}
            <CardContent>
              <Typography variant="body2" component="p">
                <ul className = "mainlist">
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/raft.png`}
                height="30"
              />&emsp; RAFT owner
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/0.png`}
                height="30"
              />&emsp; 10 - 19 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/1.png`}
                height="30"
              />&emsp; 20 - 29 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/2.png`}
                height="30"
              />&emsp; 30 - 39 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/3.png`}
                height="30"
              />&emsp; 40 - 49 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/4.png`}
                height="30"
              />&emsp; 50 - 59 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/5.png`}
                height="30"
              />&emsp; 60 - 69 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/6.png`}
                height="30"
              />&emsp; 70 - 79 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/7.png`}
                height="30"
              />&emsp; 80 - 89 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/8.png`}
                height="30"
              />&emsp; 90 - 99 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/9.png`}
                height="30"
              />&emsp; 100 - 109 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/10.png`}
                height="30"
              />&emsp; 110 - 119 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/11.png`}
                height="30"
              />&emsp; 120 - 129 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/12.png`}
                height="30"
              />&emsp; 130 - 139 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/13.png`}
                height="30"
              />&emsp; 140 - 149 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/14.png`}
                height="30"
              />&emsp; 150 - 159 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/15.png`}
                height="30"
              />&emsp; 160 - 169 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/16.png`}
                height="30"
              />&emsp; 170 - 179 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/17.png`}
                height="30"
              />&emsp; 180 - 189 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/18.png`}
                height="30"
              />&emsp; 190 - 199 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/19.png`}
                height="30"
              />&emsp; 200 - 209 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/20.png`}
                height="30"
              />&emsp; 210 - 219 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/21.png`}
                height="30"
              />&emsp; 220 - 229 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/22.png`}
                height="30"
              />&emsp; 230 - 239 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/23.png`}
                height="30"
              />&emsp; 240 - 249 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/24.png`}
                height="30"
              />&emsp; 250 - 259 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/25.png`}
                height="30"
              />&emsp; 260 - 269 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/26.png`}
                height="30"
              />&emsp; 270 - 279 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/27.png`}
                height="30"
              />&emsp; 280 - 289 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/28.png`}
                height="30"
              />&emsp; 290 - 299 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/29.png`}
                height="30"
              />&emsp; 300 - 309 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/30.png`}
                height="30"
              />&emsp; 310 - 319 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/31.png`}
                height="30"
              />&emsp; 320 - 329 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/32.png`}
                height="30"
              />&emsp; 330 - 339 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/33.png`}
                height="30"
              />&emsp; 340 - 349 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/34.png`}
                height="30"
              />&emsp; 350 - 359 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/35.png`}
                height="30"
              />&emsp; 360 - 369 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/36.png`}
                height="30"
              />&emsp; 370 - 379 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/37.png`}
                height="30"
              />&emsp; 380 - 389 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/38.png`}
                height="30"
              />&emsp; 390 - 399 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/39.png`}
                height="30"
              />&emsp; 400 - 409 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/40.png`}
                height="30"
              />&emsp; 410 - 419 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/41.png`}
                height="30"
              />&emsp; 420 - 429 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/42.png`}
                height="30"
              />&emsp; 430 - 439 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/43.png`}
                height="30"
              />&emsp; 440 - 449 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/44.png`}
                height="30"
              />&emsp; 450 - 459 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/45.png`}
                height="30"
              />&emsp; 460 - 469 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/46.png`}
                height="30"
              />&emsp; 470 - 479 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/47.png`}
                height="30"
              />&emsp; 480 - 489 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/48.png`}
                height="30"
              />&emsp; 490 - 499 pts.
              </li>
                <li className = "listitem">
                {" "}
                <Image
                src={`https://rainflow.live/api/images/badges/49.png`}
                height="30"
              />&emsp; 500+ pts.
              </li>
                 
                </ul>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* </Jumbotron> */}
    </Container>
  );

};
