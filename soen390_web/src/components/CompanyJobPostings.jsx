import React from "react";
import { Button } from "@material-ui/core";
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

export default function CompanyJobPostings(props) {
  return (
    <div className="JobsContainer">
      <div className="JobHeaderWrap">
        <div className="postings">Open Positions</div>
        <div className="editButtonJobs">
          <Button>
            <PlaylistAddIcon></PlaylistAddIcon>
          </Button>
        </div>
      </div>
      <div className="postingsText">
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {[1, 2, 3, 4, 5, 6, 7].map((value) => (
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
          ))}
        </List>
      </div>
    </div>
  );
}
