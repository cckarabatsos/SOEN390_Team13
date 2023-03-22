import React from "react";
import "../styles/components/Drawer.css";
import Button from "@mui/material/Button";
import { Popper } from "@mui/material";
import { Box } from "@mui/system";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import ActionButton from "../components/ActionButton";
import { useEffect, useState } from "react";
import { getAllApplication } from "../api/ApplicationHistoryApi";

/*
function createData(position, location, company, contract, JobId) {
  return { position, location, company, contract, JobId };
}
*/
export default function BasicTable() {
  /* const [userData, setUseData] = useState({});

const [currentID, setCurrentID] = useState(""); */
  const [application, setApplication] = useState([]);
  var Application = [];
  /*const getApplications = async (ID) => {
    var responce = await getAllApplication(ID);
    console.log(responce[0]);

    // setApplication(responce);
    if (responce[0]) {
      setApplication(responce);
    }
  };
*/
  useEffect(() => {
    const getApplications = async (ID) => {
      const response = await getAllApplication(ID);
      console.log(response[0]);
      if (response[0]) {
        setApplication(response);
      }
    };

    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      getApplications(data.userID);
    }
  }, []); // empty dependency array to run only once

  console.log(Application);
  return (

    <TableContainer component={Paper} sx={{ width: "80%", margin: "0 auto", marginTop: "35px" }}>
      <Table sx={{ minWidth: 650, backgroundColor: 'rgba(217, 217, 217, 0.7)' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontSize: "40px",
                fontWeight: "bold",
                paddingBottom: "100px",

              }}
              colSpan={6}
            >
              My applications
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              sx={{ fontSize: "20px", paddingBottom: "16px" }}
              align="left"
            >
              Position
            </TableCell>
            <TableCell
              sx={{ fontSize: "20px", paddingBottom: "16px" }}
              align="left"
            >
              Location&nbsp;
            </TableCell>
            <TableCell
              sx={{ fontSize: "20px", paddingBottom: "16px" }}
              align="left"
            >
              Company&nbsp;
            </TableCell>
            <TableCell
              sx={{ fontSize: "20px", paddingBottom: "16px" }}
              align="left"
            >
              Status&nbsp;
            </TableCell>
            <TableCell
              sx={{ fontSize: "20px", paddingBottom: "16px" }}
              align="left"
            >
              Action&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {application.map((row) => (
            <TableRow data-testid='row'
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.position}</TableCell>
              <TableCell align="left">{row.location}</TableCell>
              <TableCell align="left">{row.company}</TableCell>
              <TableCell align="left">{row.contract}</TableCell>
              <TableCell align="left">
                <ActionButton postingID={row.postingID}></ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
