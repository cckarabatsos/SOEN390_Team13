// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import Login from '../pages/Login'
const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render Login page', () => {
    render(<Login/>, { wrapper: RouterWrapper });
    const LoginElement = screen.getByTestId('login-1');
    expect(LoginElement).toBeInTheDocument();
})