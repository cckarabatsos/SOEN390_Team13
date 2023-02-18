import { TextField } from "@material-ui/core";
import React from "react";
import '../styles/components/userconnection.css'

import {Button} from '@material-ui/core'
import {Grid } from "@material-ui/core";
function handleDecline() {
    // Do something when the decline button is clicked
    console.log('Decline button clicked');
  }
  
  function handleConfirm() {
    // Do something when the confirm button is clicked
    console.log('Confirm button clicked');
  }


export default function UserConnectionComponent(props){
    const image = props.image

    const name=props.name

    const job = props.job

    const location = props.location


    return(
        <Grid item xs={12} sm={6} md={6}>
        <div className="rectangle rectangle-1"> 
            <img className='image' src={image}></img>              
            <h3 className="field">{name}</h3>
            <p className="field">{job}</p>
            <p className="field">{location}</p>
            <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10, marginLeft: 500, marginTop: -150}} onClick={handleDecline} > Decline </Button>
            <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10, marginTop: -150}} onClick={handleConfirm} > Confirm </Button>
            <Button className="view" style={{borderRadius: 40, backgroundColor: "rgb(165, 55, 253)", fontSize: 8, marginLeft: 500, marginTop: -90}}>View Profile</Button>              
        </div>
        </Grid>




    )



}