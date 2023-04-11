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
  setExperience,
  lastApplication,
}) => {
  const { t } = useTranslation();

  const handleRemoveExperience = (indexToRemove) => {
    setExperience(experience.filter((_, index) => index !== indexToRemove));
  };

  return (
    <>
      <div className="header">{t("Work Experience")}</div>
      <div className="experience-list">
        {experience.map((exp, index) => (
          <Chip
            key={index}
            label={exp}
            className="experience-circle"
            onClick={() => handleRemoveExperience(index)}
          />
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
        {t("AddExpText")}
      </Button>
    </>
  );
};

export default WorkExperience;
