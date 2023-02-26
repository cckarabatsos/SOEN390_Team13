import React, { useEffect, useState } from "react";
import JobPostingComponent from "../components/JobPostingComponent";



  function ApplicationHistory() {
    return (
      <div>
        <h1>Application History</h1>
        <JobPostingComponent 
         position={'software engineer'}
         location={'mtl'}
         company={'BRP'}
         contract={'100 000$'}
        
         jobPosterID={1}
         />
      </div>
    );
  }
  
  export default ApplicationHistory;