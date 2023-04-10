import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import GeneralInformation from "./GeneralInformation";
import HigherEducation from "./HigherEducation";
import WorkExperience from "./WorkExperience";
import {
  createApplication,
  getLastestApplication,
} from "../api/JobApplicationApi";
import { useTranslation } from "react-i18next";
import { Alert } from "@mui/material";

export default function JobApplicationFill(props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [area, setAreaCode] = useState("");
  const [school, setSchoolName] = useState("");
  const [schoolCountry, setSchoolCountry] = useState("");
  const [schoolDegree, setDegree] = useState("");
  const [schoolEnd, setSchoolEnd] = useState("");
  const [schoolMajor, setMajor] = useState("");
  const [experience, setExperience] = useState([]);
  const [expierienceInputValue, setExpierienceInputValue] = useState("");
  const [attachResume, setAttachResume] = useState(false);
  const [attachCoverLetter, setAttachCoverLetter] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();
  const posting = window.location.pathname.split("/").pop();
  const [lastApplication, setLastApplication] = useState(null);
  const [error, setError] = useState(false);
  const { t } = useTranslation();

  const fetchLastApplication = async () => {
    const lastApplication = await getLastestApplication(props.userData.userID);
    if (lastApplication[0] === 400) {
      setAlertMessage(lastApplication[1]);
    } else if (Object.keys(lastApplication[1]).length !== 0) {
      console.log("clicky", lastApplication);
      setEmail(lastApplication[1].email || "");
      setFirstName(lastApplication[1].firstName || "");
      setLastName(lastApplication[1].lastName || "");
      setPhoneNumber(lastApplication[1].phone || "");
      setAddress(lastApplication[1].address || "");
      setAddress2(lastApplication[1].address2 || "");
      setCity(lastApplication[1].city || "");
      setProvince(lastApplication[1].province || "");
      setAreaCode(lastApplication[1].area || "");
      setSchoolName(lastApplication[1].school || "");
      setSchoolCountry(lastApplication[1].schoolCountry || "");
      setDegree(lastApplication[1].schoolDegree || "");
      setSchoolEnd(lastApplication[1].schoolEnd || "");
      setMajor(lastApplication[1].schoolMajor || "");
      setExperience(lastApplication[1].experience || []);
      setAttachResume(lastApplication[1].attachResume || false);
      setAttachCoverLetter(lastApplication[1].attachCoverLetter || false);
    }
  };

  useEffect(() => {
    fetchLastApplication();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      address === "" ||
      city === "" ||
      province === "" ||
      area === "" ||
      school === "" ||
      schoolCountry === "" ||
      schoolDegree === "" ||
      schoolMajor === ""
    ) {
      setError(true);
      return;
    }
    const success = await createApplication(
      props.userData.userID,
      email,
      firstName,
      lastName,
      phone,
      address,
      address2,
      city,
      area,
      province,
      school,
      schoolCountry,
      schoolDegree,
      schoolEnd,
      schoolMajor,
      attachResume,
      attachCoverLetter,
      experience,
      posting
    );
    if (success) {
      navigate("/Search");
    } else {
      setAlertMessage("An error has occured");
    }
    setError(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddExperience();
    }
  };

  const handleAddExperience = () => {
    if (expierienceInputValue !== "") {
      setExperience((prevExp) => [...prevExp, expierienceInputValue]);
      setExpierienceInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formoutline">
        <Grid container spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <GeneralInformation
                setEmail={setEmail}
                email={email}
                setFirstName={setFirstName}
                firstName={firstName}
                setLastName={setLastName}
                lastName={lastName}
                setPhoneNumber={setPhoneNumber}
                phoneNumber={phone}
                setAddress={setAddress}
                address={address}
                setAddress2={setAddress2}
                address2={address2}
                setCity={setCity}
                city={city}
                setProvince={setProvince}
                province={province}
                setAreaCode={setAreaCode}
                areaCode={area}
                error={error}
                lastApplication={lastApplication}
              />
              <HigherEducation
                setSchoolName={setSchoolName}
                schoolName={school}
                setSchoolCountry={setSchoolCountry}
                schoolCountry={schoolCountry}
                setDegree={setDegree}
                schoolDegree={schoolDegree}
                setSchoolEnd={setSchoolEnd}
                schoolEnd={schoolEnd}
                setMajor={setMajor}
                schoolMajor={schoolMajor}
                error={error}
                lastApplication={lastApplication}
              />

              <WorkExperience
                setExpierienceInputValue={setExpierienceInputValue}
                expierienceInputValue={expierienceInputValue}
                handleKeyPress={handleKeyPress}
                handleAddExperience={handleAddExperience}
                error={error}
                experience={experience}
                setExperience={setExperience}
                lastApplication={lastApplication}
              />
              <div className="buttons">
                <Button
                  className="button"
                  variant="contained"
                  style={{
                    borderRadius: 27,
                    backgroundColor: "#6C63FF",
                    width: 135,
                    padding: 10,
                  }}
                >
                  {t("importcv")}
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="button"
                  variant="contained"
                  style={{
                    borderRadius: 27,
                    backgroundColor: "#6C63FF",
                    width: 135,
                    padding: 10,
                  }}
                >
                  {t("Apply")}
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        {alertMessage && (
          <Alert severity="error" onClose={() => setAlertMessage(null)}>
            {alertMessage}
          </Alert>
        )}
      </div>
    </form>
  );
}
