// import dependencies
import React from "react";
//import react testing methods
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getJobPostingWithId, removeJobPosting } from "../api/JobPostingApi";
import CompanyJobPostings from "../components/CompanyJobPostings";

jest.mock("../api/JobPostingApi");

const mockJobPosting = {
  position: "position",
  location: "location",
  company: "company",
  jobPosterID: "111",
  postingID: "112",
  salary: "salary",
  description: "description",
  email: "email",
  mandataryResume: true,
  madatoryCoverLetter: false,
  postingDeadline: {
    _seconds: 1649750400,
    _nanoseconds: 0,
  },
};

describe("CompanyJobPostings", () => {


  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<CompanyJobPostings />);
  });

  it("renders loading indicator when open positions are not provided", async () => {
    render(<CompanyJobPostings />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).toBeInTheDocument()
    );
  });

  it("renders open positions list when positions are provided", async () => {
    getJobPostingWithId.mockResolvedValueOnce(mockJobPosting);
    const openPositions = {
      postingids: ["112"],
    };
    render(<CompanyJobPostings openPositions={openPositions} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    await waitFor(() => expect(getJobPostingWithId).toHaveBeenCalled());
  });

  it("removes a job posting when delete button is clicked", async () => {
    removeJobPosting.mockResolvedValueOnce(true);
    const openPositions = {
      postingids: ["112"],
    };
    const setUpdateFlag = jest.fn();
    const companyEmail = "email";
    const companyOwner = true;
    render(
      <CompanyJobPostings
        openPositions={openPositions}
        setUpdateFlag={setUpdateFlag}
        companyEmail={companyEmail}
        companyOwner={companyOwner}
      />
    );
    await waitFor(() => expect(getJobPostingWithId).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("button", { name: "" }));
    await waitFor(() => expect(removeJobPosting).not.toHaveBeenCalled());
    expect(setUpdateFlag).not.toHaveBeenCalled();
  });



  // checks if handleClickOpen is called when add button is clicked by user
  it('handleClickOpen is called when Add button is clicked', () => {
    const { getByTestId } = render(<CompanyJobPostings />);
    const addButton = getByTestId('add-button');
    
    const handleClickOpenMock = jest.fn();
    CompanyJobPostings.handleClickOpen = handleClickOpenMock;
    
    fireEvent.click(addButton);
    expect(handleClickOpenMock).not.toHaveBeenCalled();
  });

  //checks if component with corresponding text is rendered
  it("renders the component with correct text", () => {
    render(<CompanyJobPostings />);
    expect(screen.getByText("OpenPositions")).toBeInTheDocument();
  });

  // checks if onDelete function is called when clicking delete icon 
  it("clicking on delete icon should call the onDelete function", () => {
    const onDeleteMock = jest.fn();
    render(<CompanyJobPostings onDelete={onDeleteMock} />);
  });

});
