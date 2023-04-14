import React, { useState, useEffect } from "react";
import {Button} from "@mui/material";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { updateUserDescription } from "../api/UserProfileApi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { GetContacts } from "../api/userContactsApi";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

export default function AddConversationModal(props) {



  const [text, setText] = useState(props.descriptionText);
  
  const [checked, setChecked] = React.useState([1]);
  const [contacts, setContacts] = React.useState([])


  const getContactsList = async (email) => {
    var responce = await GetContacts(email);
    console.log(responce);
    setContacts(responce);
  };

  useEffect(() => {


getContactsList(props.userData.email);


  },[props.userData])

  const handleAcceptOnClick=async ()=>{


    props.handleCloseModal()
  }

  const handledeclineOnClick=async ()=>{
   
    props.handleCloseModal()

  }

  

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  return (
    <React.Fragment>
      <Typography variant="h5" align="center" width="100%" gutterBottom>
        <b>Create a New Conversation</b>
      </Typography>

      <Grid
  container
 
  
  alignItems="center"
  justifyContent="center"
  style={{ maxHeight: '60vh', overflow:"auto",}}
  
>
<List dense sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}>
      {contacts.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              
              <ListItemText id={labelId} primary={value.name} secondary={value.email} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
</Grid>
<Grid item xs={12}>
              <Button
                color="success"
                onClick={handleAcceptOnClick}
                style={{float: 'right'}}
                >
                Approve
              </Button>
            </Grid>
           
       
    </React.Fragment>
  );
}
