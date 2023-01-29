// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import Drawer from '../components/Drawer'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render footer component', () => {
    render(<Drawer/>, { wrapper: RouterWrapper });
    const DrawerElement = screen.getByTestId('drawer-1');
    expect(DrawerElement).toBeInTheDocument();
})