import React from "react";
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
import { useTranslation } from "react-i18next";

function AddEducationDialog() {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span data-testid="skill-1">
      <>
        <IconButton onClick={handleClickOpen}>
          <AddIcon className="add-icon" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t("AddSkillText")}</DialogTitle>
          <DialogContentText style={{ marginLeft: "5%" }}>
          {t("WhatSkillText")}
          </DialogContentText>
          <DialogContent>
            <TextField
              autoFocus
              className="inputRounded"
              margin="dense"
              label={t("SkillsText")}
              type="skill"
              variant="outlined"
              size="small"
            />
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
