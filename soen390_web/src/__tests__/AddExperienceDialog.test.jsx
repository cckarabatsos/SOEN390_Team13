// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import AddExperienceDialog from '../components/AddExperienceDialog'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render footer component', () => {
    render(<AddExperienceDialog/>, { wrapper: RouterWrapper });
    const AddExperienceDialogElement = screen.getByTestId('experience-1');
    expect(AddExperienceDialogElement).toBeInTheDocument();
})