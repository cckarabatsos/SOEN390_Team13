import { Button, Chip, Grid } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createApplication } from "../api/JobApplicationApi";
import "../styles/components/JobApplication.css";

const JobApplicationComponent = (props) => {
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [province, setProvince] = React.useState("");
  const [area, setAreaCode] = React.useState("");

  const [school, setSchoolName] = React.useState("");
  const [schoolCountry, setSchoolCountry] = React.useState("");
  const [schoolDegree, setDegree] = React.useState("");
  const [schoolEnd, setSchoolEnd] = React.useState(dayjs());
  const [schoolMajor, setMajor] = React.useState("");
  const [attachResume, setAttachResume] = React.useState(false);
  const [attachCoverLetter, setAttachCoverLetter] = React.useState(false);
  const [experience, setExperience] = React.useState([]);
  const [Country, setCountry] = React.useState("");
  const [Company, setCompany] = React.useState("");
  const [JobTitle, setJobTitle] = React.useState("");
  const [Start, setStart] = React.useState(dayjs());

  const [End, setEnd] = React.useState(dayjs());
  const [error, setError] = React.useState(false);

  const { t } = useTranslation();
  const [userData, setUserData] = React.useState({});
  const [Resume, setResume] = React.useState();
  const [Coverletter, setCoverletter] = React.useState();
  const [coverletterFilename, setCoverletterFilename] = React.useState();
  const [ResumeFilename, setResumeFilename] = React.useState();
  const navigate = useNavigate();
  const posting = window.location.pathname.split("/").pop();
  console.log(posting);
  //"NAzQgPUr8iCooLCqtPUT";

  const [expierienceInputValue, setExpierienceInputValue] = React.useState("");

  const handleAddExperience = () => {
    if (expierienceInputValue.trim()) {
      setExperience([...experience, expierienceInputValue]);
      setExpierienceInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddExperience();
    }
  };

  const handleSubmit = async (e) => {
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
    e.preventDefault(success);
    if (
      email.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      address.length === 0 ||
      city.length === 0 ||
      province.length === 0 ||
      area.length === 0 ||
      phone.length === 0 ||
      school.length === 0 ||
      schoolDegree.length === 0 ||
      schoolCountry.length === 0 ||
      schoolMajor.length === 0 ||
      Country.length === 0 ||
      Company.length === 0 ||
      JobTitle.length === 0 ||
      schoolEnd.length === 0 ||
      attachResume.length === 0 ||
      attachCoverLetter.length === 0 ||
      experience.length === 0
    ) {
      setError(true);
    } else {
      navigate("/JobSearch");
      alert("Form was submitted");
      console.log(
        email,
        firstName,
        lastName,
        address,
        city,
        province,
        area,
        phone,
        school,
        schoolDegree,
        schoolCountry,
        schoolMajor,
        Country,
        Company,
        JobTitle,
        Start,
        End
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formoutline">
        <Grid container spacing={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
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
              {error && phone.length <= 0 ? (
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
              <div className="textboxname">{t("Address2")}</div>
              <TextField
                autoFocus
                className="input"
                margin="dense"
                label={t("Address2")}
                type="name"
                variant="outlined"
                size="small"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <div className="city">
                    <div className="textboxname">{t("City*")}</div>
                    {error && city.length <= 0 ? (
                      <label className="label">Cannot be empty!</label>
                    ) : (
                      ""
                    )}
                    <TextField
                      onChange={(e) => setCity(e.target.value)}
                      autoFocus
                      className="input2"
                      margin="dense"
                      label={t("City*")}
                      type="name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="province">
                    <div className="textboxname">{t("Province*")}</div>
                    {error && province.length <= 0 ? (
                      <label className="label">Cannot be empty!</label>
                    ) : (
                      ""
                    )}
                    <TextField
                      onChange={(e) => setProvince(e.target.value)}
                      autoFocus
                      className="input2"
                      margin="dense"
                      label={t("Province*")}
                      type="name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="areacode">
                    <div className="textboxname">{t("AreaCode*")}</div>
                    {error && area.length <= 0 ? (
                      <label className="label">Cannot be empty!</label>
                    ) : (
                      ""
                    )}
                    <TextField
                      onChange={(e) => setAreaCode(e.target.value)}
                      autoFocus
                      className="input2"
                      margin="dense"
                      label={t("AreaCode*")}
                      type="name"
                      variant="outlined"
                      size="small"
                    />
                  </div>
                </Grid>
              </Grid>

              <div className="header">{t("HigherEducation")}</div>
              <div className="textboxname">{t("SchoolName*")}</div>
              {error && school.length <= 0 ? (
                <label className="label">Cannot be empty!</label>
              ) : (
                ""
              )}
              <TextField
                onChange={(e) => setSchoolName(e.target.value)}
                autoFocus
                className="input"
                margin="dense"
                label={t("SchoolName*")}
                type="name"
                variant="outlined"
                size="small"
              />
              <div className="textboxname">{t("Country*")}</div>
              {error && schoolCountry.length <= 0 ? (
                <label className="label">Cannot be empty!</label>
              ) : (
                ""
              )}
              <TextField
                onChange={(e) => setSchoolCountry(e.target.value)}
                autoFocus
                className="input"
                margin="dense"
                label={t("Country*")}
                type="name"
                variant="outlined"
                size="small"
              />
              <div className="textboxname">{t("Degree*")}</div>
              {error && schoolDegree.length <= 0 ? (
                <label className="label">Cannot be empty!</label>
              ) : (
                ""
              )}
              <TextField
                onChange={(e) => setDegree(e.target.value)}
                autoFocus
                className="input"
                margin="dense"
                label={t("Degree*")}
                type="name"
                variant="outlined"
                size="small"
              />
              <div className="textboxname">{t("EndDateText")}</div>
              {error && <label className="label">Cannot be empty!</label>}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(date) => setSchoolEnd(date.format("DD-MM-YYYY"))}
                  autoFocus
                  className="input"
                  margin="dense"
                  label={t("DegreeStatus*")}
                  format="DD-MM-yyyy"
                  inputVariant="outlined"
                  size="small"
                  value={schoolEnd}
                  clearable
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <div className="textboxname">{t("Major*")}</div>
              {error && schoolMajor.length <= 0 ? (
                <label className="label">Cannot be empty!</label>
              ) : (
                ""
              )}
              <TextField
                onChange={(e) => setMajor(e.target.value)}
                autoFocus
                className="input"
                margin="dense"
                label={t("Major*")}
                type="name"
                variant="outlined"
                size="small"
              />
              <div>
                <div className="textboxname">{t("Work Experience")}</div>
                {experience.length === 0 && (
                  <label className="label">Cannot be empty!</label>
                )}
                <div className="experience-list">
                  {experience.map((exp, index) => (
                    <Chip
                      key={index}
                      label={exp}
                      className="experience-circle"
                    />
                  ))}
                </div>
                <TextField
                  onChange={(e) => setExpierienceInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  className="input"
                  margin="dense"
                  label={t("Work Experience")}
                  type="name"
                  variant="outlined"
                  size="small"
                  value={expierienceInputValue}
                />
                <Button
                  onClick={handleAddExperience}
                  variant="contained"
                  color="primary"
                >
                  Add Experience
                </Button>
              </div>

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
      </div>
    </form>
  );
};

export default JobApplicationComponent;
