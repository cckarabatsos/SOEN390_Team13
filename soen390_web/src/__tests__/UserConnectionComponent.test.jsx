// import dependencies
import React from "react";
// import react-testing methods
import { render, fireEvent } from "@testing-library/react";
import UserConectionComponent from "../components/UserConectionComponent";

const props = {
  image: "image",
  name: "name",
  job: "job",
  location: "location",
  currentEmail: "current@example.com",
  senderEmail: "sender@example.com",
  accept: jest.fn(),
  decline: jest.fn(),
};

describe("UserConnectionComponent", () => {
    
    //checks that user connection details are rendered correctly
    it("should render user connection details correctly", () => {
        const { getByText } = render(<UserConectionComponent {...props} />);
        expect(getByText("name")).toBeInTheDocument();
        expect(getByText("job")).toBeInTheDocument();
        expect(getByText("2 mutual friends")).toBeInTheDocument();
  });
  
  //checks that accept function is called when clicking on accept button
  it("should call accept function when clicking on accept button", () => {
    const { getByText } = render(<UserConectionComponent {...props} />);
    fireEvent.click(getByText("AcceptText"));
    expect(props.accept).toHaveBeenCalledWith("current@example.com", "sender@example.com");
  });

  //checks that decline function is called when clicking on decline button
  it("should call decline function when clicking on decline button", () => {
    const { getByText } = render(<UserConectionComponent {...props} />);
    fireEvent.click(getByText("DeclineText"));
    expect(props.decline).toHaveBeenCalledWith("current@example.com", "sender@example.com");
  });
});
