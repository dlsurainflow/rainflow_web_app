import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: theme.palette.common.black,
    background: "#2196F3",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  table: {
    marginTop: theme.spacing(4),
    minWidth: 700,
  },
}));

export const Report = () => {
  const classes = useStyles();
  // var rows = [];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://rainflow.live/api/report/user/35"
      )
      .then((response) => {
        console.log(response);
        console.log("Data: " + response.data);
        // rows = response.data;
        setRows(response.data);
        console.log("Rows: " + rows);
      });
  };

  return (
    <Container>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Report History
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Rainfall Rate</StyledTableCell>
                <StyledTableCell>Flood Depth</StyledTableCell>
                <StyledTableCell>Vote</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>{row.createdAt}</StyledTableCell>
                  <StyledTableCell>
                    {row.latitude},{row.longitude}
                  </StyledTableCell>
                  <StyledTableCell>{row.rainfall_rate}</StyledTableCell>
                  <StyledTableCell>{row.flood_depth}</StyledTableCell>
                  <StyledTableCell> </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};
