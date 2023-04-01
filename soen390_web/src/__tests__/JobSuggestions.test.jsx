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
        it('fetches job suggestions and sets state', async () => {
            const userID = 'abc123';
            const suggestions = [
                { position: 'Software Developer', company: 'Acme Inc.', location: 'New York, NY', logo: 'acme-logo.png' },
                { position: 'Frontend Engineer', company: 'Widgets LLC', location: 'San Francisco, CA', logo: 'widgets-logo.png' }
            ];
            getJobSuggestions.mockResolvedValue(suggestions);
            localStorage.setItem('isAuth', JSON.stringify({ userID }));

            await act(async () => {
                render(<JobSuggestions />);
            });

            expect(getJobSuggestions).toHaveBeenCalledWith(userID);
            expect(screen.getByText('Software Developer')).toBeInTheDocument();
            expect(screen.getByText('Acme Inc.')).toBeInTheDocument();
            expect(screen.getByText('New York, NY')).toBeInTheDocument();
            expect(screen.getByAltText('logo')).toHaveAttribute('src', 'acme-logo.png');

            expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
            expect(screen.getByText('Widgets LLC')).toBeInTheDocument();
            expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
            expect(screen.getByAltText('logo')).toHaveAttribute('src', 'widgets-logo.png');
        });
    });
});


//

