import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { updateUserDescription } from "../api/UserProfileApi";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}


export default function CompanyEditDescriptionModal(props) {

  const [text, setText] = useState(props.descriptionText);
    const handleDescOnClick=async ()=>{
      console.log(text)
      let res = await updateUserDescription(props.userData,text)

      if(res){
        await timeout(500);
        props.setUpdateFlag(!props.updateFlag)
        props.handleCloseModal()
      }
      else{
        console.log("error in description")
      }
    }


    const handleTextChange = (e) => {
      setText(e.target.value);
      
    };
  return (
    <React.Fragment>
      <Typography variant="h5" align="center" width="100%" gutterBottom>
       <b>Edit Company description</b> 
      </Typography>

      <Grid item xs={12}>
        <TextField
          required
          id="description"
          name="description"
          label="Company Description"
          floatingLabelText="MultiLine and FloatingLabel"
            multiline
        rows={6}
          fullWidth
          autoComplete="Job-Title"
          variant="standard"
          defaultValue={props.descriptionText}
          value={text}
          onChange={handleTextChange}
        />
      </Grid>
      <br></br>

      <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: "#9575cd", float: "right" }}
            onClick={handleDescOnClick}
          >
            Save Description
          </Button>
        </Grid>
      


    </React.Fragment>
  );
}