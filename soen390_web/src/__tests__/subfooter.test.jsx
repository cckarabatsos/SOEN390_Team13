// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import SubFooter from '../components/SubFooter'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render footer component', () => {
    render(<SubFooter/>, { wrapper: RouterWrapper });
    const SubFooterElement = screen.getByTestId('subfooter-1');
    expect(SubFooterElement).toBeInTheDocument();
})