import { TextField } from "@material-ui/core";
import React from "react";
import "../styles/components/userconnection.css";

import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
function handleDecline() {
  // Do something when the decline button is clicked
  console.log("Decline button clicked");
}

function handleConfirm() {
  // Do something when the confirm button is clicked
  console.log("Confirm button clicked");
}

export default function UserConnectionComponent(props) {
  const image = props.image;

  const name = props.name;

  const job = props.job;

  const location = props.location;

  const currentEmail = props.currentEmail;
  const senderEmail = props.senderEmail;

  const accept = props.accept
  const decline = props.decline

  // const handleAccept = () => {
  //   console.log("sender : " + senderEmail + " receiver " + currentEmail);
  // };

  return (
    <div className="friend-request">
      <div className="friend-request-header">
        <img
          src="profile-pic.jpg"
          alt="Profile Picture"
          class="friend-request-avatar"
        ></img>
        <h2 className="friend-request-name">{name}</h2>
        <p class="friend-request-job">{job}</p>
        <p class="friend-request-mutual">2 mutual friends</p>
      </div>
      <div className="friend-request-actions">
        <Button
          style={{
            backgroundColor: "#21b6ae",
          }}
          color="success"
          onClick={()=>accept(currentEmail,senderEmail)}
        >
          Accept
        </Button>
        <Button
          style={{
            backgroundColor: "#ff5252",
          }}
          onClick={()=>decline(currentEmail,senderEmail)}
        >
          Decline
        </Button>
      </div>
    </div>
  );
}
