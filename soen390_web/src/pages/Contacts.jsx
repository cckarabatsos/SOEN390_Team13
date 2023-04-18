import { Grid } from "@material-ui/core";
import { fontFamily } from "@mui/system";
import React, { useEffect, useState } from "react";
import { GetContacts } from "../api/userContactsApi";
import { removeContact } from "../api/userContactsApi";
import ContactsComponent from "../components/ContactComponent";
import CircularProgress from "@mui/material/CircularProgress";

export default function Contacts() {
  const [userData, setUseData] = React.useState({});

  const [users, setUsers] = useState([]);

  const [currentEmail, setCurrentEmail] = useState("");
  const [loadingState, setLoadingState] = useState(true);

  const getContactsList = async (email) => {
    var responce = await GetContacts(email);
    console.log(responce);
    setUsers(responce);
    setLoadingState(false)
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

  //remove contact with given email from list of contacts
const handleRemoveContact = async (removedEmail) => {
  if (window.confirm("Are you sure you want to remove this contact?")) {
    var senderEmail = userData.email;
    var response = await removeContact(senderEmail, removedEmail);
    if (response) {
      getContactsList(userData.email);
    }
  }
};

  const handleLookUpProfile = () => {};
  return (
    <div>
      <h1 className="center" style={{
       fontWeight: "normal"
      }}>Contacts List</h1>
      <div className="request-section">
      {loadingState && <CircularProgress color="info" />}
        <Grid container spacing={2} 
  alignItems="center"
  justifyContent="center" >
          {users.map((aUser) => (
            <Grid item sm={6} xs={12}>
              <ContactsComponent
                image={aUser.picture}
                name={aUser.name}
                job={aUser.currentPosition}
                location={aUser.location}
                currentEmail={currentEmail}
                contactEmail={aUser.email}
                handleRemoveContact={handleRemoveContact}
              ></ContactsComponent>
            </Grid>
          ))}
           {users.length == 0 && !loadingState&&<h2>No Contacts, feel free to add new users</h2>}
        </Grid>
       
      </div>
    </div>
  );
}
