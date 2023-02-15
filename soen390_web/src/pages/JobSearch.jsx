import React, { useEffect } from "react";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import JobPostingComponent from "../components/JobPostingComponent";
import SearchBar from "../components/SearchBar";
import JobsOverview from "../models/JobsOverview.ts";
import Modal from "../components/Modal";
import { useState } from "react";


const jobArray = []
var job1 = new JobsOverview("Position", "Location", "Company", "Contract", 1, 25,"Description", "123@yay.com");
var job2 = new JobsOverview("Position", "Location", "Company", "Contract", 2, 33,"Description", "123@yay.com");
var job3 = new JobsOverview("Position", "Location", "Company", "Contract", 3, 30,"Description", "123@yay.com");
var job4 = new JobsOverview("Position", "Location", "Company", "Contract", 4, 20,"Description", "123@yay.com");
jobArray.push(job1);
jobArray.push(job2);
jobArray.push(job3);
jobArray.push(job4);

export default function JobSearch(){
    const [modalOpen, setModalOpen] = useState(false);  

    useEffect(()=>{

        console.log("description");
        console.log(modalOpen)

    },[modalOpen]);

  
console.log("job array" + jobArray.length);
    return(

<div>
<button
        onClick={() => {
          setModalOpen(true);
        }}
      >Open
</button>
      

<div>
<h2>Start your job searching journey here. Browse available jobs down below.</h2>
<SearchBar/>
<h1>Please search for your desired job.</h1>
{modalOpen && <Modal setOpenModal={setModalOpen} />}

{
    jobArray.map((job) =>
    <JobPostingComponent
    key={job.jobPosterID}
    position = {job.position}
    location = {job.location}
    company = {job.company}
    contract = {job.contract}
    viewDesc ={setModalOpen}
    
    >


    </JobPostingComponent>
   

    
    )
}


</div>

<SubFooter/>
<Footer/>


          </div>
    );

}