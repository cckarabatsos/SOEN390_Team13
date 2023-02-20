import React from "react";
import "../styles/components/FileItem.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Typography } from "@mui/material";

const FileItem = ({ fileList }) => {
  return (
    <div>
      <AttachFileIcon />
    </div>
  );
};

export default FileItem;
