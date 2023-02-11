import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import "../styles/components/FileUpload.css";

const FileUpload = ({ files, setFiles, removeFile }) => {
  const uploadHandler = (event) => {
    // const file = event.target.files[0];
    // if(!file) return;
    // file.isUploading = true;
    // setFiles([...files, file])
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
            variant="contained"
            component="label"
            onChange={uploadHandler}
          >
            Upload
            <input
              hidden
              accept="image/png, image/jpeg, .pdf"
              multiple
              type="file"
            />
          </Button>
          <Button>
            <i>
              <FontAwesomeIcon icon={faPlus} />
            </i>
            <div>Other</div>
          </Button>
        </div>

        <Typography className="main">Supported files</Typography>
        <Typography className="info">PDF, JPG, PNG</Typography>
      </div>
    </>
  );
};

export default FileUpload;
