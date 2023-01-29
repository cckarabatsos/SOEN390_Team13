// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import SignUp from '../pages/Signup'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render signup component', () => {
    render(<SignUp/>, { wrapper: RouterWrapper });
    const SignUpElement = screen.getByTestId('signup-1');
    expect(SignUpElement).toBeInTheDocument();
})