import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import JobPostingComponent from "../components/JobPostingComponent";
import JobSearchBar from "../components/JobSearchBar";
import Modal from "../components/Modal";
import JobsOverview from "../models/JobsOverview.ts";

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
  const { t } = useTranslation();
  const [jobDisplay, setJobDisplay] = useState([]);

  useEffect(() => {
    console.log(jobs);
    var jobArray = [];

    for (var i = 0; i < jobs.length; i++) {
      jobArray.push(
        new JobsOverview(
          jobs[i].position,
          jobs[i].location,
          jobs[i].company,
          jobs[i].contract,
          i,
          20,  //jobs[i].salary
          jobs[i].description,
          jobs[i].email
        )
      );
    }

    console.log(jobArray);

    setJobDisplay(jobArray);
  }, [jobs]);

  return (
    <div>
      <div data-testid="job-posting">
        <div className="jobSearchingText">
        <p>{t("JobSearchingJourneyText")}</p>
        </div>
        <div className="desiredJobText">
        <p>{t("DesiredJobText")}</p>
        </div>
        <JobSearchBar setJobs={setJobs} />
        {modalOpen && (
          <Modal
            setOpenModal={setModalOpen}
            viewDesc={jobDisplay[jobPosterID].description}
            viewPosition={jobDisplay[jobPosterID].position}
            viewLocation={jobDisplay[jobPosterID].location}
            viewCompany={jobDisplay[jobPosterID].company}
            viewEmail={jobDisplay[jobPosterID].email}
            viewContract={jobDisplay[jobPosterID].contract}
            viewSalary={jobDisplay[jobPosterID].salary}
          />
        )}

        {jobDisplay.map((job) => (
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
    </div>
  );
}
