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
import { useNavigate } from "react-router-dom";
import {createConversation} from "../api/messagesApi";

function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

export default function AddConversationModal(props) {

    const navigate = useNavigate();
  const [text, setText] = useState(props.descriptionText);
  
  const [checked, setChecked] = React.useState([]);
  const [contacts, setContacts] = React.useState([])
  const [disabled, setDisabled] = React.useState(false);


  const getContactsList = async (email) => {
    var responce = await GetContacts(email);
    setContacts(responce);
  };

  useEffect(() => {


getContactsList(props.userData.email);


  },[props.userData])

  const handleAcceptOnClick=async ()=>{


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

  const handleCreateOnclick= async () =>{
    setDisabled(true)

    let userIds =[]

    checked.forEach(element => {
        userIds.push(element.userID)
        
    });
    if(userIds.length>0){
        userIds.push(props.userData.userID)
        const newConvoStatus = await createConversation(userIds)

        if(newConvoStatus){
            
            await timeout(2300)
            navigate("/Messages/12345");
           
        }
        else{
            console.log("error when creating conversation")
            
        }
    }
    setDisabled(false)
    props.handleCloseModal()
  }


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
            key={value.userID}
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
                onClick={handleCreateOnclick}
                style={{float: 'right'}}
                disabled={disabled}
                >
                Create
              </Button>
            </Grid>
           
       
    </React.Fragment>
  );
}
