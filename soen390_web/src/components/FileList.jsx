import axios from "axios";
import React from "react";
import FileItem from "./FileItem";
import api from "../config.json";

const FileList = ({ files, removeFile }) => {
  const deleteFileHandler = ({ files, removeFile }) => {
    console.log("file to be deleted! hi :)");
  };
  return (
    <ul className="file-list">
      {files &&
        files.map((f) => (
          <FileItem key={f.name} file={f} deleteFile={deleteFileHandler} />
        ))}
    </ul>
  );
};

export default FileList;
