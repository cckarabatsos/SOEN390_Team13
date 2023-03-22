import React, { useState, useEffect } from "react";
import "../styles/components/Drawer.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContentText } from "@mui/material";
import { IconButton } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { Select, MenuItem } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { addExperience } from "../api/UserProfileApi";
import Checkbox from "@mui/material/Checkbox";

const years = Array.from({ length: 44 }, (_, i) => 1980 + i);

function AddExperienceDialog({ userID, setIsExperienceUpdated }) {
  const { t } = useTranslation();
  const [atPresent, setAtPresent] = React.useState(false);
  const [startMonth, setStartMonth] = React.useState(t("JanuaryText"));
  const [startYear, setStartYear] = React.useState(2023);
  const [endMonth, setEndMonth] = React.useState(t("JanuaryText"));
  const [endYear, setEndYear] = React.useState(2023);
  const [company, setCompany] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [isExperienceAdded, setIsExperienceAdded] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetValues();
  };

  const handleCloseSave = async () => {
    await handleFormData();
    setOpen(false);
    resetValues();
    setIsExperienceAdded(true);
  };

  const resetValues = () => {
    setAtPresent(false);
    setStartMonth(t("JanuaryText"));
    setStartYear(2023);
    setEndMonth(t("JanuaryText"));
    setEndYear(2023);
    setCompany("");
    setPosition("");
  };

  const handleFormData = async () => {
    const formattedStartDate = startMonth + " " + startYear;
    let formattedEndDate = null;
    if (atPresent == false) {
      formattedEndDate = endMonth + " " + endYear;
    }
    await addExperience(
      userID,
      atPresent,
      formattedStartDate,
      formattedEndDate,
      company,
      position,
      "Work"
    );
  };

  useEffect(() => {
    if (isExperienceAdded) {
      setIsExperienceUpdated(true);
      setIsExperienceAdded(false);
    }
  }, [isExperienceAdded]);

  return (
    <span data-testid="experience-1">
      <>
        <IconButton onClick={handleClickOpen}>
          <AddIcon className="add-icon" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t("AddExpText")}</DialogTitle>
          <DialogContentText style={{ marginLeft: "5%" }}>
            {t("PositionText")}
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              className="inputRounded"
              margin="dense"
              label={t("PositionText")}
              type="position"
              variant="outlined"
              size="small"
              onChange={(e) => setPosition(e.target.value)}
            />
          </DialogContent>
          <DialogContentText style={{ marginLeft: "5%" }}>
            {t("CompanyText")}
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              className="inputRounded"
              margin="dense"
              label={t("CompanyText")}
              type="Company"
              variant="outlined"
              size="small"
              onChange={(e) => setCompany(e.target.value)}
            />
          </DialogContent>
          <DialogContent>
            <DialogContentText>
              I am currently working for this position
            </DialogContentText>
            <Checkbox onChange={(e) => setAtPresent(e.target.checked)} />
          </DialogContent>
          <DialogContentText style={{ marginLeft: "5%" }}>
            {t("StartDateText")}
          </DialogContentText>
          <DialogContent>
            <Select
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
            >
              <MenuItem value={t("JanuaryText")}> {t("JanuaryText")}</MenuItem>
              <MenuItem value={t("FebruaryText")}>
                {" "}
                {t("FebruaryText")}
              </MenuItem>
              <MenuItem value={t("MarchText")}>{t("MarchText")}</MenuItem>
              <MenuItem value={t("AprilText")}>{t("AprilText")}</MenuItem>
              <MenuItem value={t("MayText")}>{t("MayText")}</MenuItem>
              <MenuItem value={t("JuneText")}>{t("JuneText")}</MenuItem>
              <MenuItem value={t("JulyText")}>{t("JulyText")}</MenuItem>
              <MenuItem value={t("AugustText")}>{t("AugustText")}</MenuItem>
              <MenuItem value={t("SeptemberText")}>
                {t("SeptemberText")}
              </MenuItem>
              <MenuItem value={t("OctoberText")}>{t("OctoberText")}</MenuItem>
              <MenuItem value={t("NovemberText")}>{t("NovemberText")}</MenuItem>
              <MenuItem value={t("DecemberText")}>{t("DecemberText")}</MenuItem>
            </Select>
            <Select
              style={{ marginLeft: "10px" }}
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          {!atPresent && (
            <>
              <DialogContentText style={{ marginLeft: "5%" }}>
                {t("EndDateText")}
              </DialogContentText>
              <DialogContent>
                <Select
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                >
                  <MenuItem value={t("JanuaryText")}>
                    {" "}
                    {t("JanuaryText")}
                  </MenuItem>
                  <MenuItem value={t("FebruaryText")}>
                    {" "}
                    {t("FebruaryText")}
                  </MenuItem>
                  <MenuItem value={t("MarchText")}>{t("MarchText")}</MenuItem>
                  <MenuItem value={t("AprilText")}>{t("AprilText")}</MenuItem>
                  <MenuItem value={t("MayText")}>{t("MayText")}</MenuItem>
                  <MenuItem value={t("JuneText")}>{t("JuneText")}</MenuItem>
                  <MenuItem value={t("JulyText")}>{t("JulyText")}</MenuItem>
                  <MenuItem value={t("AugustText")}>{t("AugustText")}</MenuItem>
                  <MenuItem value={t("SeptemberText")}>
                    {t("SeptemberText")}
                  </MenuItem>
                  <MenuItem value={t("OctoberText")}>
                    {t("OctoberText")}
                  </MenuItem>
                  <MenuItem value={t("NovemberText")}>
                    {t("NovemberText")}
                  </MenuItem>
                  <MenuItem value={t("DecemberText")}>
                    {t("DecemberText")}
                  </MenuItem>
                </Select>
                <Select
                  style={{ marginLeft: "10px" }}
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </DialogContent>
            </>
          )}

          <DialogActions>
            <Button
              className="button"
              variant="contained"
              style={{
                borderRadius: 27,
                backgroundColor: "rgba(100, 69, 227, 0.85)",
              }}
              onClick={handleClose}
            >
              {t("CancelText")}
            </Button>
            <Button
              className="button"
              variant="contained"
              style={{
                borderRadius: 27,
                backgroundColor: "rgba(100, 69, 227, 0.85)",
              }}
              onClick={handleCloseSave}
            >
              {t("SaveApplyText")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </span>
  );
}

export default AddExperienceDialog;
