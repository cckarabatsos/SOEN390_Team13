// import dependencies
import React from "react";
// import react testing methods
import { render, screen, fireEvent } from "@testing-library/react";
import CompanyDescription from "../components/CompanyDescription";

describe("CompanyDescription", () => {
  const mockDescription = "This is a test description";

  const props = {
    description: "description",
    companyOwner: true,
    setUpdateFlag: jest.fn(),
    updateFlag: true,
    userData: {
      name: "name",
      email: "email",
    },
  };

  it("renders description text", () => {
    const { getByText } = render(<CompanyDescription {...props} />);
    expect(getByText(props.description)).toBeInTheDocument();
  });

  it("renders edit button when companyOwner is true", () => {
    const { getByRole } = render(<CompanyDescription {...props} />);
    const editButton = getByRole("button", { name: "" });
    expect(editButton).toBeInTheDocument();
  });

  it("does not render edit button when companyOwner is false", () => {
    const { queryByRole } = render(<CompanyDescription {...props} companyOwner={false} />);
    const editButton = queryByRole("button", { name: "" });
    expect(editButton).toBeNull();
  });

  it("opens description modal when edit button is clicked", () => {
    const { getByRole} = render(<CompanyDescription {...props} />);
    const editButton = getByRole("button", { name: "" });
    fireEvent.click(editButton);
  });

  it("closes description modal when cancel button is clicked", () => {
    const { getByRole, queryByLabelText } = render(<CompanyDescription {...props} />);
    const editButton = getByRole("button", { name: "" });
    fireEvent.click(editButton);
    const cancelButton = getByRole("button", { name: "CancelText" });
    fireEvent.click(cancelButton);
    expect(queryByLabelText("")).toBeNull();
  });


  // checks if company component description is rendered with corresponding
  // description
  it("should render the component with the correct description", () => {
    render(<CompanyDescription description={mockDescription} />);
    expect(screen.getByText(mockDescription)).toBeInTheDocument();
  });

});
