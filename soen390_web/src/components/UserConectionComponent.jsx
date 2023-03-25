import { Button } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import Person from "../assets/UserConnectionImages/image (1).jpg";
import "../styles/components/userconnection.css";
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

  const accept = props.accept;
  const decline = props.decline;
  const { t } = useTranslation();

  return (
    <div className="friend-request">
      <div className="friend-request-header">
        <img
          src={Person}
          alt="Profile Picture"
          class="friend-request-avatar"
        ></img>
        <h2 className="friend-request-name">{name}</h2>
        <p class="friend-request-job">{job}</p>
        <p class="friend-request-mutual">2 mutual friends</p>
      </div>
      <div className="friend-request-actions">
        <Button className="button-accept"
            style={{
              borderRadius: 27,
              border: "2px solid #8f8aff",
              fontSize: "14px",
              margin: "auto"
            }}
          color="success"
          onClick={() => accept(currentEmail, senderEmail)}
        >
          {t("AcceptText")}
        </Button>
        <Button className="button-decline"
          style={{
            borderRadius: 27,
            border: "2px solid #8f8aff",
            fontSize: "14px",
            margin: "auto"
          }}
          onClick={() => decline(currentEmail, senderEmail)}
        >
          {t("DeclineText")}
        </Button>
      </div>
    </div>
  );
}
