import React from "react";
import "../styles/components/ProfileFileItem.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

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
