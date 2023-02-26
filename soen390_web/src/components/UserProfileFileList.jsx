import React from "react";
import "../styles/components/FileItem.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Typography } from "@mui/material";
import UserProfileFileItem from "../components/UserProfileFileItem";

const FileItem = ({ fileList }) => {
  return (
    <div>
      <UserProfileFileItem />
    </div>
  );
};

export default FileItem;
