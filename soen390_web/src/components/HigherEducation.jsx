import React from "react";
import { TextField } from "@material-ui/core";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const HigherEducation = ({
  error,
  setSchoolName,
  schoolName,
  setSchoolCountry,
  schoolCountry,
  setDegree,
  schoolDegree,
  schoolEnd,
  setSchoolEnd,
  setMajor,
  schoolMajor,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="header">{t("HigherEducation")}</div>
      <div className="textboxname">{t("SchoolName*")}</div>
      {error && schoolName.length <= 0 ? (
        <label className="label">Cannot be empty!</label>
      ) : (
        ""
      )}
      <TextField
        onChange={(e) => setSchoolName(e.target.value)}
        value={schoolName}
        autoFocus
        className="input"
        margin="dense"
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
        value={schoolCountry}
        autoFocus
        className="input"
        margin="dense"
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
        value={schoolDegree}
        autoFocus
        className="input"
        margin="dense"
        type="name"
        variant="outlined"
        size="small"
      />
      <div className="textboxname">{t("EndDateText")}</div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          onChange={(date) => setSchoolEnd(dayjs(date))}
          defaultValue={schoolEnd}
          autoFocus
          className="input"
          margin="dense"
          label={""}
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
        value={schoolMajor}
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

export default HigherEducation;
