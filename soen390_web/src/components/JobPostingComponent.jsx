import React from "react";
import "../styles/components/JobPostingComponent.css"
import {Link, useNavigate } from "react-router-dom";
import { Button} from "@material-ui/core"; 

function JobPostingComponent(){


    const navigate = useNavigate();
    return( 
<div class="container">
    <div>

  <div class="button-apply-position"><Button
                    className="button-apply"
                    variant="contained"
                    onClick={() => navigate("")
                    }
                    style={{
                        borderRadius: 27,
                        backgroundColor: "#a640f4b9",
                      }}>
                    Apply 
                    </Button>
                    </div>
                    
                <div class="button-moreinfo-position">  
                  <Button
                    className="button-moreinfo"
                    variant="contained"
                   
                    /* link to where clicking more info goes */
                    onClick={() => navigate("")
                    }
                    style={{
                        borderRadius: 27,
                        backgroundColor: "#a640f4b9",
                      }}>
                    More Info
                  </Button></div> 
              
                 

    <div class="position">
    <Link class="job-link" to="">Position</Link>   
    </div><br></br>
    <div class="company">Company name
                  </div><br></br>
                  
                  <div class="location">
                    Location
                    </div>
                    </div>
                    
                    </div>
        
    
    );
         
}
export default JobPostingComponent;
