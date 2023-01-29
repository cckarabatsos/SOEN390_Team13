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

// test('should display text when you write in textbox', async () => {
//     render(<Login/>, { wrapper: RouterWrapper });
//     const input = await screen.getByTestId('email-1');
//     userEvent.type(input, "test@test.com");
//     expect(mockedOnChange).toHaveBeenCalledWith("test@test.com");
// })