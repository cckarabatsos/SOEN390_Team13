// import dependencies
import React from "react";
//import react testing methods
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { CompanySearchBar } from "../components/CompanySearchBar";

describe("CompanySearchBar", () => {
    
    // checks if search bar component is rendered
    it('renders search bar component', () => {
        const { getByPlaceholderText, getByText} = render(
          <MemoryRouter>
                <CompanySearchBar />
            </MemoryRouter>
        );
        expect(getByPlaceholderText('SearchText')).toBeInTheDocument();
        expect(getByText('SearchText')).toBeInTheDocument();
      });
      
      //checks if handleSearch function is called when user clicks search
      it("calls handleSearch function when search button is clicked", () => {
        const setCompanies = jest.fn();
        render(<CompanySearchBar setCompanies={setCompanies} />);
        const searchButton = screen.getByRole("button", { name: "SearchText" });
        fireEvent.click(searchButton);
    });
    
    // checks if it searches for company when user clicks the search button
    it('should search for jobs when search button is clicked', async () => {
        const setCompanies = jest.fn();
        const { getByText, getByPlaceholderText } = render(<CompanySearchBar setCompanies={setCompanies} />);
        const searchButton = getByText('SearchText');
        const searchInput = getByPlaceholderText('SearchText');
        fireEvent.change(searchInput, { target: { value: 'Company Name' } });
        fireEvent.click(searchButton);
        
        await waitFor(() => expect(setCompanies).toHaveBeenCalled());
    
    });

     // checks if category is updated when user selects a new category
     it("updates category when user selects an option from the category selection", () => {
        render(<CompanySearchBar/>);
        const categorySelect = screen.getByRole("combobox");
        fireEvent.change(categorySelect, { target: { value: "name" } });
        expect(categorySelect.value).toBe("name");
    });

  //checks if it updates the text state in the handleTextChange function,
    //which is called when the user types into the input box 
    it('sets the text when typing into the input', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <CompanySearchBar />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('SearchText');
    fireEvent.change(input, { target: { value: 'Test' } });
    expect(input.value).toBe('Test');
  });
});
