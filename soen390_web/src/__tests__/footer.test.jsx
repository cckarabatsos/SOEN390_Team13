// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import Footer from '../components/Footer'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render footer component', () => {
    render(<Footer/>, { wrapper: RouterWrapper });
    const FooterElement = screen.getByTestId('footer-1');
    expect(FooterElement).toBeInTheDocument();
})