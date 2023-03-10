import React, { useState } from "react";
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

const years = Array.from({ length: 51 }, (_, i) => 1980 + i);

function AddEducationDialog(userID) {
  const [atPresent, setAtPresent] = React.useState(false);
  const [startDate, setStartDate] = React.useState();
  const [startMonth, setStartMonth] = React.useState();
  const [startYear, setStartYear] = React.useState();
  const [endDate, setEndDate] = React.useState(null);
  const [endMonth, setEndMonth] = React.useState(null);
  const [endYear, setEndYear] = React.useState(null);
  const [company, setCompany] = React.useState();
  const [position, setPosition] = React.useState();

  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if ((atPresent, startMonth, startYear, company, position)) handleFormData();
    setOpen(false);
  };

  // userID, atPresent, startDate, endDate, company, position, type
  const addEducation = () => {
    addExperience(
      userID,
      atPresent,
      startDate,
      endDate,
      company,
      position,
      "Work"
    );
  };

  const handleFormData = () => {
    setStartDate(startMonth + " " + startYear);
    if (endMonth && endYear != null) {
      setEndDate(endMonth + " " + endYear);
    }
    addEducation();
  };

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
          <DialogContentText>
            I am currently working for this position
          </DialogContentText>
          <DialogContent>
            <Checkbox onChange={(e) => setAtPresent(e.target.value)} />
          </DialogContent>
          <DialogContentText style={{ marginLeft: "5%" }}>
            {t("StartDateText")}
          </DialogContentText>
          <DialogContent>
            <Select value={1} onChange={(e) => setStartMonth(e.target.value)}>
              <MenuItem value={1}> {t("JanuaryText")}</MenuItem>
              <MenuItem value={2}> {t("FebruaryText")}</MenuItem>
              <MenuItem value={3}>{t("MarchText")}</MenuItem>
              <MenuItem value={4}>{t("AprilText")}</MenuItem>
              <MenuItem value={5}>{t("MayText")}</MenuItem>
              <MenuItem value={6}>{t("JuneText")}</MenuItem>
              <MenuItem value={7}>{t("JulyText")}</MenuItem>
              <MenuItem value={8}>{t("AugustText")}</MenuItem>
              <MenuItem value={9}>{t("SeptemberText")}</MenuItem>
              <MenuItem value={10}>{t("OctoberText")}</MenuItem>
              <MenuItem value={11}>{t("NovemberText")}</MenuItem>
              <MenuItem value={12}>{t("DecemberText")}</MenuItem>
            </Select>
            <Select
              style={{ marginLeft: "10px" }}
              value={2023}
              onChange={(e) => setStartYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
          <DialogContentText style={{ marginLeft: "5%" }}>
            {t("EndDateText")}
          </DialogContentText>
          <DialogContent>
            <Select value={1} onChange={(e) => setEndMonth(e.target.value)}>
              <MenuItem value={1}> {t("JanuaryText")}</MenuItem>
              <MenuItem value={2}> {t("FebruaryText")}</MenuItem>
              <MenuItem value={3}>{t("MarchText")}</MenuItem>
              <MenuItem value={4}>{t("AprilText")}</MenuItem>
              <MenuItem value={5}>{t("MayText")}</MenuItem>
              <MenuItem value={6}>{t("JuneText")}</MenuItem>
              <MenuItem value={7}>{t("JulyText")}</MenuItem>
              <MenuItem value={8}>{t("AugustText")}</MenuItem>
              <MenuItem value={9}>{t("SeptemberText")}</MenuItem>
              <MenuItem value={10}>{t("OctoberText")}</MenuItem>
              <MenuItem value={11}>{t("NovemberText")}</MenuItem>
              <MenuItem value={12}>{t("DecemberText")}</MenuItem>
            </Select>
            <Select
              style={{ marginLeft: "10px" }}
              value={2023}
              onChange={(e) => setEndYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </DialogContent>
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
              onClick={handleClose}
            >
              {t("SaveApplyText")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </span>
  );
}

export default AddEducationDialog;
