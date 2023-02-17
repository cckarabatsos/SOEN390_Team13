import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import JobPostingComponent from "../components/JobPostingComponent";
import Modal from "../components/Modal";
import SearchBar from "../components/SearchBar";
import SubFooter from "../components/SubFooter";
import JobsOverview from "../models/JobsOverview.ts";

const jobArray = [];
var job1 = new JobsOverview(
  "Position1",
  "Location1",
  "Company1",
  "Contract1",
  1,
  25,
  "Description1",
  "123@yay.com"
);
var job2 = new JobsOverview(
  "Position2",
  "Location2",
  "Company2",
  "Contract2",
  2,
  33,
  "Description2",
  "122223@yay.com"
);
var job3 = new JobsOverview(
  "Position3",
  "Location3",
  "Company3",
  "Contract3",
  3,
  30,
  "Description3",
  "12344444@yay.com"
);
var job4 = new JobsOverview(
  "Position4",
  "Location4",
  "mcdonaldssss",
  "Contract4",
  4,
  20,
  "Description4",
  "1111111111123@yay.com"
);
jobArray.push(job1);
jobArray.push(job2);
jobArray.push(job3);
jobArray.push(job4);

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

  useEffect(() => {
    console.log("description");
    console.log(modalOpen);
    console.log(jobPosterID);
  }, [modalOpen]);

  console.log("job array" + jobArray.length);
  return (
    <div>
      <div>
        <h2>
          Start your job searching journey here. Browse available jobs down
          below.
        </h2>
        <SearchBar />
        <h1>Please search for your desired job.</h1>
        {modalOpen && (
          <Modal
            setOpenModal={setModalOpen}
            viewDesc={jobArray[jobPosterID - 1].description}
            viewPosition={jobArray[jobPosterID - 1].position}
            viewLocation={jobArray[jobPosterID - 1].location}
            viewCompany={jobArray[jobPosterID - 1].company}
            viewEmail={jobArray[jobPosterID - 1].email}
            viewContract={jobArray[jobPosterID - 1].contract}
            viewSalary={jobArray[jobPosterID - 1].salary}
          />
        )}

        {jobArray.map((job) => (
          <JobPostingComponent
            key={job.jobPosterID}
            position={job.position}
            location={job.location}
            company={job.company}
            contract={job.contract}
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
