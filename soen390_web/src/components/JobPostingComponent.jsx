import React from "react";
import "../styles/components/JobPostingComponent.css"
import {useNavigate } from "react-router-dom";
import { Button} from "@material-ui/core";


function JobPostingComponent(props){

    const navigate = useNavigate();
    const position = props.position;
    const location = props.location;
    const company = props.company;
    const contract = props.contract;
    const viewDesc = props.viewDesc;
    const jobPosterID = props.jobPosterID;
    const setJob= props.setJob;


    return( 

<div class="container">
    <div>

                    
                <div class="button-moreinfo-position">  
                  <Button
                    className="button-moreinfo"
                    variant="contained"
                   
                    
                    onClick={()=>{setJob(jobPosterID); viewDesc(true);}}
                    style={{
                        borderRadius: 27,
                        backgroundColor: "#a640f4b9",
                      }}>
                    More Info
                  </Button></div> 
                  
    <div class="position">
   <h3> {position} </h3>
    </div>
    <div class="company">{company}
                  </div><br></br>
                  
                  <div class="location">
                    {location}
                    </div>
<div>
  {contract}
</div>


                    </div>
                    
                    </div>
    );
         
}
export default JobPostingComponent;
