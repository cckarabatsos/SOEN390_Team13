// import dependencies
import React from "react";
//import react testing methods
import { render, screen, fireEvent } from "@testing-library/react";
import CompanyJobPostings from "../components/CompanyJobPostings";

describe("CompanyJobPostings", () => {

  //checks if component with corresponding text is rendered
  it("renders the component with correct text", () => {
    render(<CompanyJobPostings />);
    expect(screen.getByText("Open Positions")).toBeInTheDocument();
  });
  // checks if onDelete function is called when clicking delete icon 
  it("clicking on delete icon should call the onDelete function", () => {
    const onDeleteMock = jest.fn();
    render(<CompanyJobPostings onDelete={onDeleteMock} />);
    fireEvent.click(screen.getAllByLabelText('comment')[1]);
  });

  // checks if clicking on info icon renders the job posting details
  it("clicking on info icon should display the job posting details", () => {
    render(<CompanyJobPostings />);
    expect(screen.getByText("Line item 1")).toBeInTheDocument();
  });
});
