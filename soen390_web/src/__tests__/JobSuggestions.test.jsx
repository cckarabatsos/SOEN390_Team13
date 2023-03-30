import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import JobSuggestions from '../components/JobSuggestions';
import { getJobSuggestions } from '../api/JobSuggestionsApi';


jest.mock('../api/JobSuggestionsApi', () => ({
    getJobSuggestions: jest.fn(() => Promise.resolve([
        {
            logo: 'https://example.com/logo.png',
            position: 'Software Developer',
            company: 'Example Company',
            location: 'New York, NY',
        },
        {
            logo: 'https://example.com/logo2.png',
            position: 'Frontend Developer',
            company: 'Another Company',
            location: 'San Francisco, CA',
        },
    ])),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: key => key }),
}));

describe('JobSuggestions', () => {
    it('should render "AddSkills" message if there are no job suggestions', async () => {
        render(<JobSuggestions userID="123" />);
        await waitFor(() => {
            expect(screen.getByText('AddSkills')).toBeInTheDocument();
        });
    });


    describe('JobSuggestions', () => {
        const mockSuggestions = [
            {
                position: 'Software Developer',
                company: 'Example Company',
                location: 'New York, NY',
                logo: 'example.png',
            },
            {
                position: 'Data Analyst',
                company: 'Another Company',
                location: 'San Francisco, CA',
                logo: 'another.png',
            },
        ];

        it('should render job suggestions with unique keys and class name', async () => {
            render(<JobSuggestions userID="123" jobSuggestions={mockSuggestions} />);
            await waitFor(() => {
                mockSuggestions.forEach((suggestion, index) => {
                    const jobElement = screen.getByText(suggestion.position).closest('.job');
                    expect(jobElement).toHaveClass('job');
                    expect(jobElement).toHaveAttribute('key', index.toString());
                });
            });
        });
    });
});


