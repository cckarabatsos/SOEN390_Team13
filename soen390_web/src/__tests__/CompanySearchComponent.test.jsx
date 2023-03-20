// import dependencies
import React from 'react';
// import react testing methods
import { render, fireEvent, screen } from '@testing-library/react';
import CompanySearchComponent from '../components/CompanySearchComponent';

const mockedUsedNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
       ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedUsedNavigate,
    }));

describe('CompanySearchComponent', () => {
    
    const company = {
        name: "Name",
        location: 'Location'
      };

    //tests if the company details are properly rendered
  test("renders company details", () => {
    render(
      <CompanySearchComponent
        name={company.name}
        location={company.location}
      />
    );
   
    expect(screen.getByText(company.name)).toBeInTheDocument();
    expect(screen.getByText(company.location)).toBeInTheDocument();
  });

  //checks if navigates to company profile upon click
  it("navigates to CompanyProfile with correct state on button click", () => {
    const { getByText } = render(<CompanySearchComponent {...company} />);

    const button = getByText("MoreInfoText");
    fireEvent.click(button);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/CompanyProfile", {
      state: {
        name: company.name,
        description: company.description,
      },
    });
  });
});
