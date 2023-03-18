import React from 'react';
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

    //tests if the job posting details are properly rendered
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
