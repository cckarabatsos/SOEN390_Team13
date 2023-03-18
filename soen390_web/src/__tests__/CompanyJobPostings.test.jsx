import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CompanyJobPostings from "../components/CompanyJobPostings";

describe("CompanyJobPostings", () => {
  test("renders the component with correct text", () => {
    render(<CompanyJobPostings />);
    expect(screen.getByText("Open Positions")).toBeInTheDocument();
  });

  test("clicking on delete icon should call the onDelete function", () => {
    const onDeleteMock = jest.fn();
    render(<CompanyJobPostings onDelete={onDeleteMock} />);
    fireEvent.click(screen.getAllByLabelText('comment')[1]);
  });

  test("clicking on info icon should display the job posting details", () => {
    render(<CompanyJobPostings />);
    expect(screen.getByText("Line item 1")).toBeInTheDocument();
  });
});
