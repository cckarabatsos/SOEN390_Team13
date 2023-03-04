import React, { useEffect } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import "../styles/components/FileUpload.css";
import api from "../config.json";
import { useTranslation } from "react-i18next";
const FileUpload = ({ files, setFiles, removeFile }) => {
  const [userData, setUserData] = React.useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("isAuth"));
    if (data != null) {
      setUserData(JSON.parse(localStorage.getItem("isAuth")));
    } else {
      setUserData(false);
    }
  }, []);

  const uploadHandler = async (fileType, event) => {
    const file = event.target.files[0];
    file.isUploading = true;
    setFiles([...files, file]);
    // upload file
    const formData = new FormData();
    formData.append("file", file);

    // calling the backend
    try {
      console.log(userData.userID);
      console.log(fileType);
      console.log(file);
      console.log(
        `${api.BACKEND_API}/user/uploadAccountFile/${userData.userID}`
      );
      const response = await axios
        .post(
          `${api.BACKEND_API}/user/uploadAccountFile/${userData.userID}?type=${fileType}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            params: {
              type: fileType,
            },
          }
        )
        .then((res) => {
          file.isUploading = false;
          setFiles([...files, file]);
          console.log("success");
          return res.data;
        });
      console.log(response);
      if (response == 200) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      removeFile(file.name);
    }
  };

  return (
    <>
      <div className="file-card">
        <div className="file-inputs">
          <Button
            variant="text"
            component="label"
            onChange={(event) => uploadHandler("Resume", event)}
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
            onChange={(event) => uploadHandler("coverLetter", event)}
            className="file-button"
            style={{
              outline: "5px solid #EEEEEE",
              margin: "2em",
              borderRadius: "none",
              backgroundColor: "#D9D9D9",
              color: "#9606D9",
          
            }}
          >
            <div>&nbsp;{t("CoverLetterText")}</div>
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
            onChange={(event) => uploadHandler("Picture", event)}
            className="file-button"
            style={{
              outline: "5px solid #EEEEEE",
              margin: "2em",
              borderRadius: "none",
              backgroundColor: "#D9D9D9",
              color: "#9606D9",
            }}
          >
            <div>&nbsp;{t("PictureText")}</div>
            <input
              hidden
              accept="image/png, image/jpeg, .pdf"
              multiple
              type="file"
            />
          </Button>
        </div>
        <Typography className="main">{t("FilesText")}</Typography>
        <Typography className="info">PDF, JPG, PNG</Typography>
      </div>
    </>
  );
};

export default FileUpload;
