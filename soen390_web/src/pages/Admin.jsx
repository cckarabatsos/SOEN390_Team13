import {
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReports, reportDecision } from "../api/reportsApi";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    minHeight: 650,
    marginLeft: 50
  },
});

function Admin(props) {
  const classes = useStyles();
  const [reports, setReports] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reports = await getReports(props.userData.userID);
        console.log(reports);
        console.log("hi");

        setReports(reports);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (reportID, reportedID) => {
    const sendApproval = await reportDecision(reportID, reportedID, true);
    console.log(sendApproval);
  };

  const handleDisapprove = async (reportID, reportedID) => {
    const sendDisapproval = await reportDecision(reportID, reportedID, false);
    console.log(sendDisapproval);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Approval
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ReportID</TableCell>
              <TableCell>Reporter ID</TableCell>
              <TableCell>Reported ID</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.reportID}>
                <TableCell component="th" scope="row">
                  {report.reportID}
                </TableCell>
                <TableCell>{report.reporterID}</TableCell>
                <TableCell>{report.reportedID}</TableCell>
                <TableCell>{report.reason}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      handleApprove(report.reportID, report.reportedID)
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      handleDisapprove(report.reportID, report.reportedID)
                    }
                  >
                    Disapprove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Admin;
