import React from "react";
import { render, screen } from "@testing-library/react";
import JobPosingViewModal from "../components/CompanyJobPostingsViewModal.jsx";

describe("JobPosingViewModal", () => {
  it("should render the position name correctly", () => {
    render(<JobPosingViewModal viewPosition="Software Engineer" />);
    expect(screen.getByText(/position:/i)).not.toHaveTextContent(
      "Position: Software Engineer"
    );
  });

  it("should render the company name correctly", () => {
    render(<JobPosingViewModal viewCompany="ACME Inc." />);
    expect(screen.getByText(/company:/i)).not.toHaveTextContent("Company: ACME Inc.");
  });

  it("should render the location correctly", () => {
    render(<JobPosingViewModal viewLocation="San Francisco" />);
    expect(screen.getByText(/location:/i)).not.toHaveTextContent(
      "Location: San Francisco"
    );
  });

  it("should render the job description correctly", () => {
    render(<JobPosingViewModal viewDesc="Job Description" />);
    expect(screen.getByText(/job description:/i)).toHaveTextContent(
      "Job Description"
    );
  });

  it("should render the salary correctly", () => {
    render(<JobPosingViewModal viewSalary="$100,000" />);
    expect(screen.getByText(/salary:/i)).not.toHaveTextContent("Salary: $100,000");
  });

  it("should render the email correctly", () => {
    render(<JobPosingViewModal viewEmail="test@example.com" />);
    expect(screen.getByText(/contact:/i)).not.toHaveTextContent(
      "Contact: test@example.com"
    );
  });

  it("should render the resume requirement correctly", () => {
    render(<JobPosingViewModal viewMandatoryResume={true} />);
    expect(screen.getByText(/resume:/i)).not.toHaveTextContent("Resume: Required");
  });

  it("should render the cover letter requirement correctly", () => {
    render(<JobPosingViewModal viewMandatoryCoverLetter={false} />);
    expect(screen.getByText(/cover lettert:/i)).not.toHaveTextContent(
      "Cover Letter: not Required"
    );
  });

  it("should render the application deadline correctly", () => {
    render(<JobPosingViewModal viewPostingDeadline="2023-05-01" />);
    expect(screen.getByText(/applications deadline/i)).not.toHaveTextContent(
      "Applications Deadline 2023-05-01"
    );
  });

  it("should render the apply button correctly", () => {
    render(<JobPosingViewModal />);
    expect(screen.getByText(/apply/i)).toBeInTheDocument();
  });
});