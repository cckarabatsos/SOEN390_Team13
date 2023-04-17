import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import JobPostingComponent from "../components/JobPostingComponent";
import JobSearchBar from "../components/JobSearchBar";
import Modal from "../components/Modal";
import JobsOverview from "../models/JobsOverview.ts";

const fireBaseTime = (seconds, nanoseconds) =>
  new Date(seconds * 1000 + nanoseconds / 1000000);

export default function JobSearch() {
  // define state variables with useState hook
  const [modalOpen, setModalOpen] = useState(false);
  const [jobPosterID, setjobPosterID] = useState(false);
  const [position, setPosition] = useState(false);
  const [location, setLocation] = useState(false);
  const [company, setCompany] = useState(false);
  const [contract, setContract] = useState(false);
  const [salary, setSalary] = useState(false);
  const [description, setDescription] = useState(false);
  const [email, setEmail] = useState(false);
  const [mandatoryResume, setMandatoryResume] = useState(false);
  const [mandatoryCoverLetter, setMandatoryCoverLetter] = useState(false);
  const [jobs, setJobs] = useState([]);
  const { t } = useTranslation();
  const [jobDisplay, setJobDisplay] = useState([]);

  // useEffect to create jobDisplay array whenever jobs array changes
  useEffect(() => {
    var jobArray = [];
    console.log(jobs);
    for (var i = 0; i < jobs.length; i++) {
      jobArray.push(
        new JobsOverview(
          jobs[i].position,
          jobs[i].location,
          jobs[i].company,
          jobs[i].contract,
          i,
          jobs[i].jobPosterID,
          jobs[i].id,
          20, //jobs[i].salary
          jobs[i].description,
          jobs[i].email,
          jobs[i].mandatoryResume,
          jobs[i].mandatoryCoverLetter,
          fireBaseTime(
            jobs[i].postingDeadline._seconds,
            jobs[i].postingDeadline._nanoseconds
          ).toString()
        )
      );
    }

    setJobDisplay(jobArray);
  }, [jobs]);

  // render JobSearch component
  // map over jobDisplay array and render JobPostingComponent for each job

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
          <>
            <Modal
              setOpenModal={setModalOpen}
              viewDesc={jobDisplay[jobPosterID].description}
              postingID={jobDisplay[jobPosterID].postingID}
              jobID={jobDisplay[jobPosterID].jobID}
              viewPosition={jobDisplay[jobPosterID].position}
              viewLocation={jobDisplay[jobPosterID].location}
              viewCompany={jobDisplay[jobPosterID].company}
              viewEmail={jobDisplay[jobPosterID].email}
              viewContract={jobDisplay[jobPosterID].contract}
              viewSalary={jobDisplay[jobPosterID].salary}
              viewMandatoryResume={jobDisplay[jobPosterID].mandatoryResume}
              viewMandatoryCoverLetter={
                jobDisplay[jobPosterID].mandatoryCoverLetter
              }
              viewPostingDeadline={jobDisplay[jobPosterID].postingDeadline}
            />
            {console.log(jobDisplay[jobPosterID])}
          </>
        )}
         {jobDisplay.length == 0 &&
          <div className="noJobsFound">No Jobs found</div>
        }
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
            mandatoryResume={job.mandatoryResume}
            postingID={job.postingID}
            mandatoryCoverLetter={job.mandatoryCoverLetter}
          ></JobPostingComponent>
        ))}
      </div>
    </div>
  );
}
