// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import UserConnection from '../pages/UserConnection'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render Login page', () => {
    render(<UserConnection/>, { wrapper: RouterWrapper });
    const UserConnectionElement = screen.getByTestId('userconnection-1');
    expect(UserConnectionElement).toBeInTheDocument();
})