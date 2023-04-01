import React from "react";
import "../styles/components/ContactComponents.css";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
export default function ContactsComponent(props) {

  const image = props.image;
  const name = props.name;
  const job = props.job;
  const location = props.location;
  const { t } = useTranslation();
  return (
    <div className="friend-request">
      <div className="friend-request-header">
        <img
          src={image}
          alt="Profile Pic"
          className="friend-request-avatar"
        />
        <p className="friend-request-name">{name}</p>
        <p class="friend-request-job">{job}</p>
        <p class="friend-request-mutual">{location}</p>
      </div>
      <div className="friend-request-actions">
        <Button className="button-lookup"
          style={{
            borderRadius: 27,
            border: "2px solid #8f8aff",
            fontSize: "14px",
            margin: "auto"
          }}
          color="info"
        >
          {t("ViewProfileText")}
        </Button>
        <Button className="button-removecontact"
          style={{
            borderRadius: 27,
            border: "2px solid #8f8aff",
            fontSize: "14px",
            margin: "auto"
          }}
          color="info"
          onClick={() => props.handleRemoveContact(props.contactEmail)}
        >{t("RemoveContact")}</Button>
      </div>
    </div>
  );
}
