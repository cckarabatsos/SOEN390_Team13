import React, { useState, useEffect } from "react";
import ContactsComponent from "../components/ContactComponent";
import { Grid } from "@material-ui/core";
import { GetContacts } from "../api/userContactsApi";
import { Navigate } from "react-router-dom";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";

export default function Contacts() {
  const [userData, setUseData] = React.useState({});

  const [users, setUsers] = useState([]);

  const [currentEmail, setCurrentEmail] = useState("");

  const getContactsList = async (email) => {
    var responce = await GetContacts(email);
    console.log(responce);
    setUsers(responce);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUseData(JSON.parse(localStorage.getItem("isAuth")));
      setCurrentEmail(data.email);
    } else {
      setUseData(false);
    }
    getContactsList(data.email);
  }, []);

  const handleLookUpProfile = () => {};
  return (
    <div>
      <h1 className="center">Contacts List</h1>
      <div className="request-section">
        <Grid container spacing={2}>
          {users.map((aUser) => (
            <Grid item xs={6}>
              <ContactsComponent
                image={aUser.image}
                name={aUser.name}
                job={aUser.currentPosition}
                location={aUser.location}
                currentEmail={currentEmail}
              ></ContactsComponent>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
