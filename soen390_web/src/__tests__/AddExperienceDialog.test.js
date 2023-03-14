// import dependencies
import React from 'react'

// import react-testing methods
import { render, screen, fireEvent, waitFor, within, getByRole, getAllByText } from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import { MemoryRouter } from 'react-router-dom'
import AddExperienceDialog from '../components/AddExperienceDialog'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const RouterWrapper = ({ children }) => (
    <MemoryRouter>
      {children}
    </MemoryRouter>
  );

const theme = createTheme();

const openDialog = () => {
    // render the component that contains the dialog
    render(<AddExperienceDialog/>, { wrapper: RouterWrapper });

    // get the icon button and click it
    const addIcon = screen.getByTestId('add-icon');
    fireEvent.click(addIcon);
}

test('should render component', () => {
    render(<AddExperienceDialog/>, { wrapper: RouterWrapper });
    const AddExperienceDialogElement = screen.getByTestId('experience-1');
    expect(AddExperienceDialogElement).toBeInTheDocument();
});

test('should open dialog when pressing the + button', () => {
    openDialog();
    
    // check that the dialog is open
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeVisible();

});

test('should be able to input position text', () => {
    openDialog();

    const positionTextField = screen.getByTestId('position-text-field');
    fireEvent.change(positionTextField, { target: { textContent: 'Front-end developer' } });
    expect(positionTextField.textContent).toBe('Front-end developer');

})

test('should be able to input company text', () => {
    openDialog()
    const positionTextField = screen.getByTestId('company-text-field');
    fireEvent.change(positionTextField, { target: { textContent: 'CAE' } });
    expect(positionTextField.textContent).toBe('CAE');

})

// test('should be able to select start month', async () => {
//     const { container, getByTestId } = openDialog();
  
//     const select = screen.getByTestId("start-month"); // get the select element by data-testid
    
//     fireEvent.click(select); // open the select menu
    
//     const januaryOption = getByRole(container, "option", { name: "January" }); // get the January option element
    
//     fireEvent.click(januaryOption); // select January
    
//     expect(select).toHaveValue("January"); // check that the selected value is January
//   });
  