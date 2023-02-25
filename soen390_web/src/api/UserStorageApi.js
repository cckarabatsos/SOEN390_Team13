import axios from "axios";
import api from "../config.json";

export async function UploadFile({ files, setFiles }, file, formData) {
  try {
    const response = await axios
      .post(api.BACKEND_API + "user/uploadAccountFile/:userID", formData)
      .then((res) => {
        file.isUploading = false;
        setFiles([...files, file]);
      });
    return response;
  } catch (err) {
    console.error("yo", err);
  }
}

export async function DeleteFile(file) {}
