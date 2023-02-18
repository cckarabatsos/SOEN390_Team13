import React from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import "../styles/components/FileUpload.css";

const FileUpload = ({ files, setFiles, removeFile }) => {
  const uploadHandler = (event) => {
    const file = event.target.files[0];
    if(!file) return;
    file.isUploading = true;
    setFiles([...files, file])
    // // upload file
    // const formData = new FormData();
    // formData.append(
    //     "newFile",
    //     file,
    //     file.name
    // )
    // axios.post('http://localhost:8080/upload', formData)
    //     .then((res) => {
    //         file.isUploading = false;
    //         setFiles([...files, file])
    //     })
    //     .catch((err) => {
    //         // inform the user
    //         console.error(err)
    //         removeFile(file.name)
    //     });
  };

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <Button
            variant="text"
            component="label"
            onChange={uploadHandler}
            className="file-button"
            style={{
              outline: "5px solid #EEEEEE",
              margin: "2em",
              borderRadius: "none",
              backgroundColor: "#D9D9D9",
              color: "#9606D9",
            }}
          >
            <div>&nbsp;CV</div>
            <input
              hidden
              accept="image/png, image/jpeg, .pdf"
              multiple
              type="file"
            />
          </Button>

          <Button
            variant="text"
            component="label"
            onChange={uploadHandler}
            className="file-button"
            style={{
              outline: "5px solid #EEEEEE",
              margin: "2em",
              borderRadius: "none",
              backgroundColor: "#D9D9D9",
              color: "#9606D9",
            }}
          >
            <div>&nbsp;Cover Letter</div>
            <input
              hidden
              accept="image/png, image/jpeg, .pdf"
              multiple
              type="file"
            />
          </Button>
          <Button
            variant="text"
            component="label"
            onChange={uploadHandler}
            className="file-button"
            style={{
              outline: "5px solid #EEEEEE",
              margin: "2em",
              borderRadius: "none",
              backgroundColor: "#D9D9D9",
              color: "#9606D9",
            }}
          >
            <div>&nbsp;Other</div>
            <input
              hidden
              accept="image/png, image/jpeg, .pdf"
              multiple
              type="file"
            />
          </Button>
        </div>
        <Typography className="main">Supported files</Typography>
        <Typography className="info">PDF, JPG, PNG</Typography>
      </div>
    </>
  );
};

export default FileUpload;
