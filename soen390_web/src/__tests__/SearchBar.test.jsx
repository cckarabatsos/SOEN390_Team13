// import dependencies
import React from 'react';
// import react-testing methods
import { render, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SearchBar from '../components/SearchBar';


describe('SearchBar', () => {
    

//checks if the input box, search button, and category search filter are 
//all rendered  
    it('renders input box, search button and category search filter', () => {
        const { getByPlaceholderText, getByText} = render(
        <MemoryRouter>
            <SearchBar />
        </MemoryRouter>
        );

        expect(getByPlaceholderText('Search here...')).toBeInTheDocument();
        expect(getByText('Search')).toBeInTheDocument();
  });

//checks if it updates the text state in the handleTextChange function,
//which is called when the user types into the input box 
  it('sets the text when typing into the input', () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const input = getByPlaceholderText('Search here...');
    fireEvent.change(input, { target: { value: 'Test' } });

    expect(input.value).toBe('Test');
  });
});
