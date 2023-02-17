import { TextField } from "@material-ui/core";
import React from "react";
import '../styles/components/userconnection.css'

import {Button} from '@material-ui/core'
import {Grid } from "@material-ui/core";
import Person from "../assets/UserConnectionImages/image.jpg"

export default function UserConnectionComponent(props){

    const name=props.name

    const job = props.job

    const location = props.location


    return(
        <Grid item xs={12} sm={6} md={6}>
        <div className="rectangle-1"> 
            <img className='image' src={Person}></img>              
            <h3>{name}</h3>
            <p>{job}</p>
            <p>{location}</p>
            <Button className='decline-button' style={{ borderRadius: 40, backgroundColor: "rgb(255,0,0)", fontSize: 10}} > Decline </Button>
            <Button className='confirm-button' style={{ borderRadius: 40, backgroundColor: "rgb(0, 181, 0)", fontSize: 10}} > Confirm </Button>              
        </div>
        </Grid>




    )



}