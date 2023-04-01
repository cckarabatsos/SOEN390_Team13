import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactComponent from "../components/ContactComponent";

describe("ContactsComponent", () => {
  const props = {
    image: "https://example.com/image.png",
    name: "Name",
    job: "Job",
    location: "Location",
    contactEmail: "email",
    handleRemoveContact: jest.fn(),
  };

  it("should render the contact information", () => {
    const { getByAltText, getByText } = render(<ContactComponent {...props} />);
    expect(getByAltText("Profile Pic")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Job")).toBeInTheDocument();
    expect(getByText("Location")).toBeInTheDocument();
  });

  it("should call handleRemoveContact when clicking on remove button", () => {
    const { getByText } = render(<ContactComponent {...props} />);
    fireEvent.click(getByText("RemoveContact"));
    expect(props.handleRemoveContact).toHaveBeenCalledWith("email");
  });


});
