import React from "react";
import SubFooter from "../components/SubFooter";
import Footer from "../components/Footer";
import "../styles/components/userconnection.css";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Person from "../assets/UserConnectionImages/image.jpg";
import Person1 from "../assets/UserConnectionImages/image (1).jpg";
import Person2 from "../assets/UserConnectionImages/image (2).jpg";
import Person3 from "../assets/UserConnectionImages/image (3).jpg";
import Person4 from "../assets/UserConnectionImages/image (4).jpg";
import Person5 from "../assets/UserConnectionImages/image (5).jpg";
import Person6 from "../assets/UserConnectionImages/image (6).jpg";
import Person7 from "../assets/UserConnectionImages/image (7).jpg";
import Person8 from "../assets/UserConnectionImages/image (8).jpg";
import Person9 from "../assets/UserConnectionImages/image (9).jpg";
import Person10 from "../assets/UserConnectionImages/image (10).jpg";
import Person11 from "../assets/UserConnectionImages/image (11).jpg";
import UserConnectionComponent from "../components/UserConectionComponent";
import { GetPendingInvitations } from "../api/userConectionApi";
import { useEffect, useState } from "react";

const UserConnection = () => {
  const [userData, setUseData] = React.useState({});

  const [users, setUsers] = useState([]);

  const[currentEmail, setCurrentEmail]= useState("")

  const getInvitations = async (email) => {
    console.log("text: ");

    var responce = await GetPendingInvitations(email);
    console.log(responce);
    setUsers(responce);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUseData(JSON.parse(localStorage.getItem("isAuth")));
      setCurrentEmail(data.email)
    } else {
      setUseData(false);
    }
    getInvitations(data.email);
  }, []);

  
  
  console.log(users.length);
  return (
    <>
    <h1 className="center">Request Center</h1>
      <div className="request-section">
        
        <Grid  container spacing={2}>
          {users.map((aUser) => (
            <Grid item xs={6}>
              <UserConnectionComponent
                image={aUser.image}
                name={aUser.name}
                job={aUser.currentPosition}
                location={aUser.location}
                currentEmail={currentEmail}
                senderEmail={aUser.email}
              ></UserConnectionComponent>
            </Grid>
          ))}
        </Grid>

      </div>

      <SubFooter />
      <Footer />
    </>
  );
};

export default UserConnection;
