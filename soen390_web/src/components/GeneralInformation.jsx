import React from "react";
import { TextField } from "@material-ui/core";
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
  setCity,
  city,
  setProvince,
  province,
  setAreaCode,
  areaCode,
  lastApplication,
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
        value={email}
        autoFocus
        className="input"
        margin="dense"
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
        value={firstName}
        autoFocus
        className="input"
        margin="dense"
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
        value={lastName}
        autoFocus
        className="input"
        margin="dense"
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
        value={phoneNumber}
        autoFocus
        className="input"
        margin="dense"
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
        value={address}
        autoFocus
        className="input"
        margin="dense"
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
        value={address2}
        autoFocus
        className="input"
        margin="dense"
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("City*")}</div>
      {error && city.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setCity(e.target.value)}
        value={city}
        autoFocus
        className="input"
        margin="dense"
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("Province*")}</div>
      {error && province.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setProvince(e.target.value)}
        value={province}
        autoFocus
        className="input"
        margin="dense"
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("AreaCode*")}</div>
      {error && areaCode.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setAreaCode(e.target.value)}
        value={areaCode}
        autoFocus
        className="input"
        margin="dense"
        type="name"
        variant="outlined"
        size="small"
      />
    </>
  );
};

export default GeneralInformation;
