import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import JobSearch from '../pages/JobSearch';
import JobPostingComponent from '../components/JobPostingComponent';

describe('JobSearch', () => {

    test("renders without crashing", () => {
        render(<JobSearch />);
      });

      it('renders job searching journey text', () => {
        const { getByText } = render(<JobSearch />);
        expect(getByText('JobSearchingJourneyText')).toBeInTheDocument();
      });

      it('renders desired job text', () => {
        const { getByText } = render(<JobSearch />);
        expect(getByText('DesiredJobText')).toBeInTheDocument();
      });

      it('updates the job postings when the search bar is used', () => {
        const { getByTestId } = render(<JobSearch />);
        const searchInput = getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'engineer' } });
        expect(screen.getByText('SearchText')).toBeInTheDocument();
      });

      it('opens the modal when a job posting is clicked', () => {
        const { getByTestId } = render(<JobSearch />);
        const jobPosting = getByTestId('job-posting');
        fireEvent.click(jobPosting);
      });

      const job = {
        jobPosterID: 1,
        position: 'Position',
        location: 'Location',
        company: 'Company',
        contract: 'Contract',
      };
    
      it('should render the job information correctly', () => {
        render(
          <JobPostingComponent
            key={job.jobPosterID}
            position={job.position}
            location={job.location}
            company={job.company}
            contract={job.contract}
            
          />
        );
    
        const positionElement = screen.getByText(job.position);
        expect(positionElement).toBeInTheDocument();
    
        const locationElement = screen.getByText(job.location);
        expect(locationElement).toBeInTheDocument();
    
        const companyElement = screen.getByText(job.company);
        expect(companyElement).toBeInTheDocument();
    
        const contractElement = screen.getByText(job.contract);
        expect(contractElement).toBeInTheDocument();
      });
});

