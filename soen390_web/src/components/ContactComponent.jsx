import React from "react";
import "../styles/components/ContactComponents.css";
import { Button } from "@material-ui/core";

export default function ContactsComponent(props) {
  
  const image = props.image;
  const name = props.name;
  const job = props.job;
  const location = props.location;

  return (
    <div className="friend-request">
      <div className="friend-request-header">
        <img
          src={image}
          alt="Profile Pic"
          className="friend-request-avatar"
        />
        <h2 className="friend-request-name">{name}</h2>
        <p class="friend-request-job">{job}</p>
        <p class="friend-request-mutual">{location}</p>
      </div>
      <div className="friend-request-actions">
        <Button
          style={{
            backgroundColor: "#d59bf6",
            margin: "auto",
          }}
          color="info"
        >
          Look up Profile
        </Button>
        <Button
        style={{
          backgroundColor: "#d59bf6",
          margin: "auto",
        }}
        color="info"
        onClick={() => props.handleRemoveContact(props.contactEmail)}
        >Remove Contact</Button>
      </div>
    </div>
  );
}
