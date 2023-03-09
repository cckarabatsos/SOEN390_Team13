// import dependencies
import React from "react";
// import react-testing methods
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import JobPostingComponent from "../components/JobPostingComponent";

describe("JobPostingComponent", () => {
  
    const job = {
    position: "Position",
    location: "Location",
    company: "Company",
    contract: "Contract",
    jobPosterID: 1,
  };

  //tests if the job posting details are properly rendered
  test("renders job posting details", () => {
    render(
      <JobPostingComponent
        position={job.position}
        location={job.location}
        company={job.company}
        contract={job.contract}
      />
    );

    expect(screen.getByText(job.position)).toBeInTheDocument();
    expect(screen.getByText(job.location)).toBeInTheDocument();
    expect(screen.getByText(job.company)).toBeInTheDocument();
    expect(screen.getByText(job.contract)).toBeInTheDocument();
  });

  //tests that the data is being passed correctly from the job posting
  //that was selected to the parent component, when the "more info"
  //button is clicked
  test("calls setJob and viewDesc with correct parameters on button click", () => {
    const setJobTest = jest.fn();
    const viewDescTest = jest.fn();

    render(
      <JobPostingComponent
        position={job.position}
        location={job.location}
        company={job.company}
        contract={job.contract}
        jobPosterID={job.jobPosterID}
        setJob={setJobTest}
        viewDesc={viewDescTest}
      />
    );

    userEvent.click(screen.getByRole("button", { name: "MoreInfoText" }));

    expect(setJobTest).toHaveBeenCalledTimes(1);
    expect(setJobTest).toHaveBeenCalledWith(job.jobPosterID);
    expect(viewDescTest).toHaveBeenCalledTimes(1);
    expect(viewDescTest).toHaveBeenCalledWith(true);
  });
});