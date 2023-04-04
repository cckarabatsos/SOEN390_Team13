// import dependencies
import React from "react";

// import react-testing methods
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
  getByRole,
  getAllByText,
  userEvent,
} from "@testing-library/react";
import UserEvent from "@testing-library/user-event";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";
import AddEducationDialog from "../components/AddEducationDialog";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

const theme = createTheme();

const openDialog = () => {
  // render the component that contains the dialog
  render(<AddEducationDialog />, { wrapper: RouterWrapper });

  // get the icon button and click it
  const addIcon = screen.getByTestId("add-icon");
  fireEvent.click(addIcon);
};

test("should render component", () => {
  render(<AddEducationDialog />, { wrapper: RouterWrapper });
  const AddEducationDialogElement = screen.getByTestId("experience-1");
  expect(AddEducationDialogElement).toBeInTheDocument();
});

test("should open dialog when pressing the + button", () => {
  openDialog();

  // check that the dialog is open
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeVisible();
});

test("should be able to check the checkbox", () => {
  openDialog();

  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');
  expect(checkbox).toHaveProperty("checked", false); // make sure the checkbox is initially unchecked

  fireEvent.click(checkbox); // simulate a click on the checkbox

  expect(checkbox.checked).toBe(true); // make sure the checkbox is checked after the click
});

test("should be able to add an education", () => {
  openDialog();

  const positionTextField = screen.getByTestId("school-text-field");
  fireEvent.change(positionTextField, {
    target: { textContent: "Front-end developer" },
  });

  const companyTextField = screen.getByTestId("program-text-field");
  fireEvent.change(companyTextField, { target: { textContent: "CAE" } });

  const startSourceInput = screen.getByTestId("start-month"); // get the select element by data-testid
  // correct way to set the value
  // fireEvent.mouseDown(startSourceInput); // open the dropdown
  // const startJanuaryOption = screen.getByText("January"); // get the option element by its text
  // fireEvent.click(startJanuaryOption); // select the option

  // const endSourceInput = screen.getByTestId("end-month"); // get the select element by data-testid
  // // correct way to set the value
  // fireEvent.mouseDown(endSourceInput); // open the dropdown
  // const endJanuaryOption = screen.getByText("January"); // get the option element by its text
  // fireEvent.click(endJanuaryOption); // select the option

  const button = screen.getByTestId("save-button");
  fireEvent.click(button);

  const newExperience = screen.getByText("Front-end developer");
  expect(newExperience).toBeInTheDocument();
});

test("should be able to add education without an end date", () => {
  openDialog();
  const dialog = screen.getByRole("dialog");

  const positionTextField = screen.getByTestId("school-text-field");
  fireEvent.change(positionTextField, {
    target: { textContent: "Concordia" },
  });

  const companyTextField = screen.getByTestId("program-text-field");
  fireEvent.change(companyTextField, {
    target: { textContent: "Software Engineering" },
  });

  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');

  fireEvent.click(checkbox); // simulate a click on the checkbox

  // const startSourceInput = screen.getByTestId("start-month"); // get the select element by data-testid
  // // correct way to set the value
  // fireEvent.mouseDown(startSourceInput); // open the dropdown
  // const startJanuaryOption = screen.getByText("January"); // get the option element by its text
  // fireEvent.click(startJanuaryOption); // select the option

  const button = screen.getByTestId("save-button");
  fireEvent.click(button);

  const newExperience = screen.getByText("Front-end developer");
  expect(newExperience).toBeInTheDocument();
});
