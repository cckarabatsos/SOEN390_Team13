import { IconButton, MenuItem, Select } from "@material-ui/core";
import AddIcon from "@mui/icons-material/Add";
import { DialogContentText } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import "../styles/components/Drawer.css";
import { useTranslation } from "react-i18next";

const years = Array.from({ length: 51 }, (_, i) => 1980 + i);

function AddEducationDialog() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <span data-testid="education-1">
      <>
        <IconButton onClick={handleClickOpen}>
          <AddIcon className="add-icon" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t("AddEducationText")}</DialogTitle>
          <DialogContentText style={{ marginLeft: "5%" }}>
          {t("SchoolNameText")}
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              className="inputRounded"
              margin="dense"
              label="Name of School or University"
              type="university"
              variant="outlined"
              size="small"
            />
          </DialogContent>
          <DialogContentText style={{ marginLeft: "5%" }}>
          {t("ProgramText")}
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              className="inputRounded"
              margin="dense"
              label="Program of Study"
              type="program"
              variant="outlined"
              size="small"
            />
          </DialogContent>
          <DialogContentText style={{ marginLeft: "5%" }}>
          {t("StartDateText")}
          </DialogContentText>
          <DialogContent>
            <Select value={1}>
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
              onChange={(e) => setSelectedYear(e.target.value)}
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
            <Select value={1}>
              <MenuItem value={1}> {t("JanuaryText")}</MenuItem>
              <MenuItem value={2}>{t("FebruaryText")}</MenuItem>
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
              onChange={(e) => setSelectedYear(e.target.value)}
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
