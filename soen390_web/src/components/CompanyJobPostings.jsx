import React, { useState } from "react";
import { Button, Dialog, DialogContent, Grid, TextField, Typography, FormControlLabel, Checkbox } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import "../styles/components/CompanyJobPostings.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Delete from "@mui/icons-material/Delete";
import Divider from '@mui/material/Divider';
import AddressForm from "../components/JobPostingsCompanyPage";

export default function CompanyJobPostings(props) {
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="JobsContainer">
      <div className="JobHeaderWrap">
        <div className="postings">{t("OpenPositions")}</div>
        <div className="editButtonJobs">
          <Button onClick={handleClickOpen} data-testid="add-button">
            <PlaylistAddIcon />
          </Button>
        </div>
      </div>
      <div className="postingsText">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
            <div>
              <ListItem
                key={value}
                secondaryAction={
                  <>
                    <IconButton aria-label="comment" color="info">
                      <InfoIcon />
                    </IconButton>
                    <IconButton aria-label="comment" color="error">
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={`Line item ${value}`} />
              </ListItem>
              <Divider variant="middle" />
            </div>
          ))}
        </List>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>

          <AddressForm />
          <Button onClick={handleClose}>{t("CancelText")}</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
