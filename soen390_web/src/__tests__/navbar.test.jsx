// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import NavBar from '../components/NavBar'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('test', () => {
    expect(true).toBe(true);
   })

test('should render navbar component', () => {
    render(<NavBar/>, { wrapper: RouterWrapper });
    const NavBarElement = screen.getByTestId('navbar-1');
    expect(NavBarElement).toBeInTheDocument();
})