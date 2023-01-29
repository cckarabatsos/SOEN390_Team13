// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen, fireEvent, waitFor, getByTestId  } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter, Route, Routes } from 'react-router-dom'
import NavBar from '../components/NavBar'
import SignUp from '../pages/Signup'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render navbar component', () => {
    render(<NavBar/>, { wrapper: RouterWrapper });
    const NavBarElement = screen.getByTestId('navbar-1');
    expect(NavBarElement).toBeInTheDocument();
})

// test('Home link should redirect to home page', async () => {
//     render(<NavBar/>, { wrapper: RouterWrapper });
//     const link = getByTestId('home-1');
//     fireEvent.click(link);
//     expect(window.location.href).toBe('/');
// })

// test('Job link should redirect to job page', async () => {
//     render(<NavBar/>, { wrapper: RouterWrapper });
//     const JobElement = screen.getByTestId('job-1');
//     fireEvent.click(JobElement);
//     await waitFor(() => expect(window.location.pathname).toBe('/Jobs'));
// })

// test('Signup link should redirect to Signup page', () => {
//     render(<NavBar/>, { wrapper: RouterWrapper });
//     const SignUpElement = screen.getByTestId('signup-1');
//     fireEvent.click(SignUpElement);
//     // render(<SignUp/>, { wrapper: RouterWrapper });
//     // const SignUpTitle = screen.getByTestId('signuptitle-1');
//     expect("Sign Up").toBeInTheDocument();
// })