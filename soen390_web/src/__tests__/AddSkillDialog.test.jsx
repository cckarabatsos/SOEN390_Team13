// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen } from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import AddSkillDialog from '../components/AddSkillDialog'

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

test('should render footer component', () => {
    render(<AddSkillDialog/>, { wrapper: RouterWrapper });
    const AddSkillDialogElement = screen.getByTestId('skill-1');
    expect(AddSkillDialogElement).toBeInTheDocument();
})