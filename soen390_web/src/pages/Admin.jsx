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
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "../api/reportsApi";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Admin(props) {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reports = await getReports(props.userData.userID);
        console.log(reports);
        console.log("hi");
        const temp = [
          {
            id: 1,
            name: "John Doe",
            email: "johndoe@example.com",
            approved: undefined,
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "janesmith@example.com",
            approved: undefined,
          },
          {
            id: 3,
            name: "Bob Johnson",
            email: "bobjohnson@example.com",
            approved: undefined,
          },
        ];
        setUsers(temp);
        // setUsers(reports);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = (userId) => {
    axios.put(`/api/users/${userId}/approve`).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, approved: true } : user
        )
      );
      setAlertMessage(`User ${userId} has been approved!`);
      setAlertOpen(true);
    });
  };

  const handleDisapprove = (userId) => {
    axios.put(`/api/users/${userId}/disapprove`).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, approved: false } : user
        )
      );
      setAlertMessage(`User ${userId} has been disapproved!`);
      setAlertOpen(true);
    });
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.approved
                    ? "Approved"
                    : user.approved === false
                    ? "Disapproved"
                    : "Undecided"}
                </TableCell>
                <TableCell>
                  {user.approved === false && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleApprove(user.id)}
                    >
                      Approve
                    </Button>
                  )}
                  {user.approved === true && (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDisapprove(user.id)}
                    >
                      Disapprove
                    </Button>
                  )}
                  {user.approved === undefined && (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(user.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDisapprove(user.id)}
                      >
                        Disapprove
                      </Button>
                    </>
                  )}
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
