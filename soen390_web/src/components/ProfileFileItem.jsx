import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { Typography } from "@mui/material";
import React from "react";
import "../styles/components/ProfileFileItem.css";

const ProfileFileItem = (props) => {
  return (
    <>
      <Typography className="file-item">
        <InsertDriveFileOutlinedIcon className="file-icon" />
        <a href={props.file} target="_blank" className="file-link">
          {props.filename}
        </a>
      </Typography>
    </>
  );
};

export default ProfileFileItem;
