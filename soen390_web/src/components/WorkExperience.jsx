import React from "react";
import { TextField, Button, Chip } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/JobApplication.css";

const WorkExperience = ({
  expierienceInputValue,
  setExpierienceInputValue,
  handleKeyPress,
  handleAddExperience,
  error,
  experience,
  lastApplication,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="header">{t("WorkExperience")}</div>
      <div className="experience-list">
        {experience.map((exp, index) => (
          <Chip key={index} label={exp} className="experience-circle" />
        ))}
      </div>
      <TextField
        value={expierienceInputValue}
        onChange={(e) => setExpierienceInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        autoFocus
        className="input"
        margin="dense"
        label={t("Experience")}
        type="text"
        variant="outlined"
        size="small"
      />
      <Button onClick={handleAddExperience} variant="contained">
        {t("AddExperience")}
      </Button>
    </>
  );
};

export default WorkExperience;
