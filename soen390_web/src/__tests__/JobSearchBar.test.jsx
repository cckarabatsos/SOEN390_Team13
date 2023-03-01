// import dependencies
import React from 'react';
// import react-testing methods
import { render, fireEvent, screen} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import JobSearchBar from '../components/JobSearchBar';


describe('JobSearchBar', () => {

  //checks if search bar component is rendered
  it('renders search bar component', () => {
    const { getByPlaceholderText, getByText} = render(
      <MemoryRouter>
            <JobSearchBar />
        </MemoryRouter>
    );
    expect(getByPlaceholderText('Search here...')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
  });

  //checks if handleSearch function is called when user clicks search
  //test does not pass!!!!
  it("calls handleSearch function when search button is clicked", () => {
    const setJobs = jest.fn();
    render(<JobSearchBar setJobs={setJobs} />);
    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);
    expect(setJobs).toHaveBeenCalledTimes(1);
  });

  // checks if category is updated when user selects a new category
  it("updates category when user selects an option from the category selection", () => {
    render(<JobSearchBar />);
    const categorySelect = screen.getByRole("combobox");
    fireEvent.change(categorySelect, { target: { value: "location" } });
    expect(categorySelect.value).toBe("location");
  });

  //checks if input field box and search button are rendered
  it("renders input field and search button", () => {
    render(<JobSearchBar />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

//checks if the input box, search button, and category search filter are 
//all rendered  
    it('renders input box, search button and category search filter', () => {
        const { getByPlaceholderText, getByText} = render(
        <MemoryRouter>
            <JobSearchBar />
        </MemoryRouter>
        );

        expect(getByPlaceholderText('Search here...')).toBeInTheDocument();
        expect(getByText('Search')).toBeInTheDocument();
  });

  //checks if the users input is updated when typing into input
  it("updates text input value when user types into input field", () => {
    render(<JobSearchBar />);
    const searchInput = screen.getByRole("textbox");
    fireEvent.change(searchInput, { target: { value: "test" } });
    expect(searchInput.value).toBe("test");
  });

//checks if it updates the text state in the handleTextChange function,
//which is called when the user types into the input box 
  it('sets the text when typing into the input', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <JobSearchBar />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('Search here...');
    fireEvent.change(input, { target: { value: 'Test' } });

    expect(input.value).toBe('Test');
  });
});
