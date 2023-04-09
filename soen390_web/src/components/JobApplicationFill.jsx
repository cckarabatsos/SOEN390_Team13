import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import GeneralInformation from "./GeneralInformation";
import HigherEducation from "./HigherEducation";
import WorkExperience from "./WorkExperience";
import { createApplication } from "../api/JobApplicationApi";
import { useTranslation } from "react-i18next";

export default function JobApplicationFill(props) {
  // All the state and other logic goes here
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
  const [attachResume, setAttachResume] = React.useState(false);
  const [attachCoverLetter, setAttachCoverLetter] = React.useState(false);
  const navigate = useNavigate();
  const posting = window.location.pathname.split("/").pop();
  const [lastApplication, setLastApplication] = useState(null);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    getLastApplication();
  }, []);

  const getLastApplication = async () => {
    // Fetch the last application data here (using temp data for now)
    const tempData = {
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      // Add more fields as needed
    };

    // If the data is empty, don't update the state
    if (Object.keys(tempData).length === 0) {
      return;
    }

    setLastApplication(tempData);
  };

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
      navigate("/JobSearch");
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
      console.log("click");
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
                setFirstName={setFirstName}
                setLastName={setLastName}
                setPhoneNumber={setPhoneNumber}
                setAddress={setAddress}
                setAddress2={setAddress2}
                setCity={setCity}
                setProvince={setProvince}
                setAreaCode={setAreaCode}
                error={error}
                lastApplication={lastApplication}
              />
              <HigherEducation
                setSchoolName={setSchoolName}
                setSchoolCountry={setSchoolCountry}
                setDegree={setDegree}
                setSchoolEnd={setSchoolEnd}
                setMajor={setMajor}
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
                  {t("Apply")}yo?
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </form>
  );
}
