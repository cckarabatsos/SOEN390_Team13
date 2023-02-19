import React from "react";
import "../styles/components/FileItem.css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Typography } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import DeleteIcon from "@mui/icons-material/Delete";

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
