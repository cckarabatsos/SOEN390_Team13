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
  uploadApplicationFile,
} from "../api/JobApplicationApi";
import { useTranslation } from "react-i18next";
import { Alert } from "@mui/material";
import { GetFile } from "../api/UserStorageApi";
import AddDocumentsDialog from "./AddDocumentsDialog";
import Typography from "@mui/material/Typography";
import JobPosingViewModal from "./CompanyJobPostingsViewModal";
import {getJobPostingWithId} from "../api/JobPostingApi";

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
  const [attachResume, setAttachResume] = useState(true);
  const [attachCoverLetter, setAttachCoverLetter] = useState(true);
  const [resume, setResume] = useState({});
  const [coverletter, setCoverLetter] = useState({});
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();
  const posting = window.location.pathname.split("/").pop();
  const [lastApplication, setLastApplication] = useState(null);

  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const [userData, setUserData] = React.useState({});
  const [coverletterFilename, setCoverletterFilename] = React.useState();
  const [ResumeFilename, setResumeFilename] = React.useState();


  const { position } = props;
  const [viewPosition, setViewPosition] = useState("");
  const [jobPosting, setJobPosting] = useState("");

  
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
      console.log(success);      
      const sendApplication = await uploadApplicationFile(success.data.application[1], "resume", resume);
      console.log(sendApplication);
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

  const setFileData = () => {
    let UserCoverLetter = "";
    const getCoverLetter = async () => {
      UserCoverLetter = await GetFile(userData.userID, "coverletter");
      return UserCoverLetter;
    };

    if (UserCoverLetter !== null) {
      getCoverLetter().then((attachcoverLetter) => {
        console.log(typeof(attachCoverLetter));
        setCoverLetter(attachcoverLetter);
        const url = attachcoverLetter;
        setCoverletterFilename(
          decodeURIComponent(url.split("/").pop().split("?")[0]).split(" - ")[1]
        );
      });
      console.log(coverletterFilename);
    }

    let UserResume = "";
    const getResume = async () => {
      UserResume = await GetFile(userData.userID, "resume");
      return UserResume;
    };

    if (UserResume !== null) {
      getResume().then((attachResume) => {
        setResume(attachResume);
        if (attachResume) {
          const url = attachResume;
          setResumeFilename(
            decodeURIComponent(url.split("/").pop().split("?")[0]).split(
              " - "
            )[1]
          );
          console.log(
            decodeURIComponent(url.split("/").pop().split("?")[0]).split(
              " - "
            )[1]
          );
          console.log("resume:", attachResume);
        }
      });
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUserData(JSON.parse(localStorage.getItem("isAuth")));
    } else {
      navigate("/");
    }

    setFileData();
  }, [navigate, userData.userID]);


  
  useEffect(()=> {
    async function fetchJobPosting(postingId) {
      try {
        const jobPosting = await getJobPostingWithId(postingId);
       if (jobPosting) { // add null check here
        console.log(jobPosting.position);
        setJobPosting(jobPosting); // set the jobPosting data to state
      } else {
        console.log('Job posting not found');
      }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log('Job posting not found');
        } else {
          console.error(error);
        }
      }
    }
    fetchJobPosting(posting);
  }, []);
  
  console.log(jobPosting);

  return (
    <form onSubmit={handleSubmit}>
      <div className="formoutline">
        <Grid container spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>            
            <Typography  variant="h5" gutterBottom>
              <b>Position: </b>
              {" " + jobPosting.position}
            </Typography> 
            <Typography  variant="h6" gutterBottom>
              <b>Company: </b>
              {" " + jobPosting.company}
            </Typography>
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
              <AddDocumentsDialog setFileData={setFileData} />
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
