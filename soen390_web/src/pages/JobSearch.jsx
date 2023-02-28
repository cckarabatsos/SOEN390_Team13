import React, { useEffect } from "react";
import Footer from "../components/Footer";
import SubFooter from "../components/SubFooter";
import JobPostingComponent from "../components/JobPostingComponent";
import JobSearchBar from "../components/JobSearchBar";
import JobsOverview from "../models/JobsOverview.ts";
import Modal from "../components/Modal";
import { useState } from "react";
export default function JobSearch() {
 
  const [modalOpen, setModalOpen] = useState(false);
  const [jobPosterID, setjobPosterID] = useState(false);
  const [position, setPosition] = useState(false);
  const [location, setLocation] = useState(false);
  const [company, setCompany] = useState(false);
  const [contract, setContract] = useState(false);
  const [salary, setSalary] = useState(false);
  const [description, setDescription] = useState(false);
  const [email, setEmail] = useState(false);
  const [jobs, setJobs] = useState([]);

  const [jobDisplay, setJobDisplay] = useState([]);


useEffect(() => {
    console.log(jobs);
    var jobArray=[]
    

    for( var i =0; i<jobs.length;i++){
        jobArray.push(new JobsOverview(jobs[i].position,jobs[i].location,jobs[i].company,jobs[i].contract,i,20,jobs[i].description,jobs[i].email))


    }

    console.log(jobArray)

    setJobDisplay(jobArray)
    
    
  }, [jobs]);

  return (
    <div>
      <div>
        <h2>
          Start your job searching journey here. Browse available jobs down
          below.
        </h2>
        <JobSearchBar 
        setJobs={setJobs}/>
        <h1>Please search for your desired job.</h1>
        {modalOpen && (
          <Modal
            setOpenModal={setModalOpen}
            viewDesc={jobDisplay[jobPosterID ].description}
            viewPosition={jobDisplay[jobPosterID].position}
            viewLocation={jobDisplay[jobPosterID].location}
            viewCompany={jobDisplay[jobPosterID].company}
            viewEmail={jobDisplay[jobPosterID].email}
            viewContract={jobDisplay[jobPosterID].contract}
            viewSalary={jobDisplay[jobPosterID ].salary}
          />
        )}

{jobDisplay.map((job) => (
  <JobPostingComponent
    key={job.jobPosterID}
    position={
      <div>
        <span style={{fontWeight: 'bold', color: '#0072b1', marginRight: '8px'}}>Position:</span>
        <span style={{fontWeight: 'normal', color: '#1c1e21'}}>{job.position}</span>
      </div>
    }
    location={
      <div>
        <span style={{fontWeight: 'bold', color: '#0072b1', marginRight: '8px'}}>Location:</span>
        <span style={{fontWeight: 'normal', color: '#1c1e21'}}>{job.location}</span>
      </div>
    }
    company={
      <div>
        <span style={{fontWeight: 'bold', color: '#0072b1', marginRight: '8px'}}>Company:</span>
        <span style={{fontWeight: 'normal', color: '#1c1e21'}}>{job.company}</span>
      </div>
    }
    contract={
      <div>
        <span style={{fontWeight: 'bold', color: '#0072b1', marginRight: '8px'}}>Contract:</span>
        <span style={{fontWeight: 'normal', color: '#1c1e21'}}>{job.contract}</span>
      </div>
    }
    viewDesc={setModalOpen}
    jobPosterID={job.jobPosterID}
    setJob={setjobPosterID}
  ></JobPostingComponent>
))}

      </div>

      <SubFooter />
      <Footer />
    </div>
  );
}
