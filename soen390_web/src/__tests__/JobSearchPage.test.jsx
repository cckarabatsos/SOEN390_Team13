import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import JobSearch from '../pages/JobSearch';

describe('JobSearch', () => {

    test("renders without crashing", () => {
        render(<JobSearch />);
      });

      //tests if job searching journey text is shown
      it('renders job searching journey text', () => {
        const { getByText } = render(<JobSearch />);
        expect(getByText('JobSearchingJourneyText')).toBeInTheDocument();
      });

      // checks if desired job text is shown
      it('renders desired job text', () => {
        const { getByText } = render(<JobSearch />);
        expect(getByText('DesiredJobText')).toBeInTheDocument();
      });

      //checks if it updates the job postings when the search bar is used
      it('updates the job postings when the search bar is used', () => {
        const { getByTestId } = render(<JobSearch />);
        const searchInput = getByTestId('search-input');
        fireEvent.change(searchInput, { target: { value: 'engineer' } });
        expect(screen.getByText('SearchText')).toBeInTheDocument();
      });

      //checks if it opens the modal when job posting is clicked
      it('opens the modal when a job posting is clicked', () => {
        const { getByTestId } = render(<JobSearch />);
        const jobPosting = getByTestId('job-posting');
        fireEvent.click(jobPosting);
      });

});

