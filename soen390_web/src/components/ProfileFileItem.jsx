import React from "react";
import "../styles/components/FileItem.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Typography } from "@mui/material";

const ProfileFileItem = (file) => {
  return <Typography>{file}</Typography>;
};

export default ProfileFileItem;
