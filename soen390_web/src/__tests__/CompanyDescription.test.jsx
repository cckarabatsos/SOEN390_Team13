// import dependencies
import React from "react";
// import react testing methods
import { render, screen } from "@testing-library/react";
import CompanyDescription from "../components/CompanyDescription";

describe("CompanyDescription", () => {
  const mockDescription = "This is a test description";

  // checks if company component description is rendered with corresponding
  // description
  it("should render the component with the correct description", () => {
    render(<CompanyDescription description={mockDescription} />);
    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });
});