import React, { useEffect } from "react";
import axios from "axios";
import { Button, Typography } from "@mui/material";
import "../styles/components/FileUpload.css";
import api from "../config.json";
import { useTranslation } from "react-i18next";
const FileUploadChat = ({ files, reqUserID, reqSenderID, conversationID }) => {
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

    const uploadChatHandler = async (event, reqUserID, reqSenderID) => {
        var embeddedId = [reqSenderID]
        if(reqUserID.includes(",")){
          let tempId= reqUserID.split(",")
          embeddedId= embeddedId.concat(tempId)
        }
        else{
          embeddedId.push(reqUserID)
        }
        console.log(embeddedId)
        const Ids = JSON.stringify(embeddedId);
        const file = event.target.files[0];
        file.isUploading = true;
        // setFiles([...files, file]);
        // upload file
        const formData = new FormData();
        formData.append("file", file);

        // calling the backend
        try {
            // http://localhost:7000/messages/uploadChatFile?senderId=rgwu3p8IKmp0H3yYPdNO&Ids=["3Ri6yXlYSo7rCQk4t4ks","rgwu3p8IKmp0H3yYPdNO"]&conversationID=UCoA5lmz3FGIBjlRhuyG
            console.log(userData.senderID);
            console.log(Ids);
            console.log(file);
            console.log(
                `${api.BACKEND_API}/messages/uploadChatFile?senderId=${reqSenderID}&Ids=${Ids}&conversationID=${conversationID}`
            );
            const response = await axios
                .post(
                    `${api.BACKEND_API}/messages/uploadChatFile?senderId=${reqSenderID}&Ids=${Ids}&conversationID=${conversationID}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                )
                .then((res) => {
                    file.isUploading = false;
                    console.log("success");
                    return res.data;
                });
            console.log(response);
            if (response === 200) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="file-card">
                <div className="file-inputs">
                    <Button
                        variant="text"
                        component="label"
                        onChange={(event) =>
                            uploadChatHandler(event, reqUserID, reqSenderID)
                        }
                        className="file-button"
                        style={{
                            outline: "5px solid #EEEEEE",
                            margin: "2em",
                            borderRadius: "none",
                            backgroundColor: "#D9D9D9",
                            color: "#9606D9",
                        }}
                    >
                        <div>&nbsp;Document</div>
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

export default FileUploadChat;
