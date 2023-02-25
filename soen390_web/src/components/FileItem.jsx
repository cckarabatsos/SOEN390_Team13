import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Typography } from "@mui/material";
import React from "react";
import "../styles/components/FileItem.css";

const FileItem = ({ file, deleteFile }) => {
  return (
    <li className="file-item" key={file.name}>
      <span>
        <AttachFileIcon className="attach-icon" />
      </span>
      <span>
        <Typography>{file.name}</Typography>
      </span>
    </li>
  );
};

export default FileItem;
