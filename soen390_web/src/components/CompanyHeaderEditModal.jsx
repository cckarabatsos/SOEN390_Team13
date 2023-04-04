import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { updateUserDescription } from "../api/UserProfileApi";
import "../styles/components/CompanyHeader.css";
import { Stack } from "@mui/material";
import { updateUserProfilePicture } from "../api/UserProfileApi";

export default function CompanyEditHeaderModal(props) {
  const [text, setText] = useState(props.userData.name);
  const handleDescOnClick = async () => {
    console.log(text);
    let res = await updateUserProfilePicture(props.userData,image,text)

    if (res) {
      props.setUpdateFlag(!props.updateFlag);
      props.handleCloseModal();
    } else {
      console.log("error in description");
    }
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h5" align="center" width="100%" gutterBottom>
        <b>Edit Company Main Information</b>
      </Typography>

      <Grid item xs={12}>
        <TextField
          required
          id="name"
          name="name"
          label="Company Name"
          fullWidth
          autoComplete="Job-Title"
          variant="standard"
          defaultValue={props.userData.name}
          value={text}
          onChange={handleTextChange}
        />
      </Grid>
      <br></br>
      <Grid item xs={12}>
        <Stack spacing={3}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <Typography>new image uploaded: </Typography>}
          {image && <img src={image} alt="uploaded" class="avatar"/>}
        </Stack>
      </Grid>
      <br></br>
      <br></br>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#9575cd", float: "right" }}
          onClick={handleDescOnClick}
        >
          Save Informations
        </Button>
      </Grid>
    </React.Fragment>
  );
}
