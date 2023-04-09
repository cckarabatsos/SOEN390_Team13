import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const GeneralInformation = ({
  error,
  setEmail,
  email,
  setFirstName,
  firstName,
  setLastName,
  lastName,
  setPhoneNumber,
  phoneNumber,
  setAddress,
  address,
  setAddress2,
  address2,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="header">{t("GeneralInformation*")}</div>
      <div className="textboxname">{t("Email*")}</div>
      {error && email.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        className="input"
        margin="dense"
        label={t("emailText")}
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("FirstName*")}</div>
      {error && firstName.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setFirstName(e.target.value)}
        autoFocus
        className="input"
        margin="dense"
        label={t("FirstName*")}
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("LastName*")}</div>
      {error && lastName.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setLastName(e.target.value)}
        autoFocus
        className="input"
        margin="dense"
        label={t("LastName*")}
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("PhoneNumber*")}</div>
      {error && phoneNumber.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setPhoneNumber(e.target.value)}
        autoFocus
        className="input"
        margin="dense"
        label={t("PhoneNumber*")}
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("Address*")}</div>
      {error && address.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setAddress(e.target.value)}
        autoFocus
        className="input"
        margin="dense"
        label={t("Address*")}
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("Address 2*")}</div>
      {error && address2.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setAddress2(e.target.value)}
        autoFocus
        className="input"
        margin="dense"
        label={t("Address*")}
        type="name"
        variant="outlined"
        size="small"
      />
    </>
  );
};

export default GeneralInformation;
