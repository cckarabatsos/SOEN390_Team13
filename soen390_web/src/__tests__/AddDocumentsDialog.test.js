// import dependencies
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import AddDocumentsDialog from "../components/AddDocumentsDialog"

const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

test("can open dialog for uploading documents and close it with save and apply", async () => {
  render(<AddDocumentsDialog />, { wrapper: RouterWrapper });
  const dialogButton = screen.getByTestId("document-dialog-button");

  fireEvent.click(dialogButton);
  const dialog = screen.getByTestId("dialog-box");

  expect(dialog).toBeVisible();

  const saveButton = screen.getByText("Save and Apply");
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(dialog).not.toBeVisible();
  });
});

test("can open dialog for uploading documents and close it with cancel", async () => {
  render(<AddDocumentsDialog />, { wrapper: RouterWrapper });
  const dialogButton = screen.getByTestId("document-dialog-button");

  fireEvent.click(dialogButton);
  const dialog = screen.getByTestId("dialog-box");

  expect(dialog).toBeVisible();

  const saveButton = screen.getByText("Cancel");
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(dialog).not.toBeVisible();
  });
});


test("allows cover letter upload on button click", async () => {
  const file = new File(["test content"], "test.pdf", { type: "application/pdf" });
  
  render(<AddDocumentsDialog />, { wrapper: RouterWrapper });
  const dialogButton = screen.getByTestId("document-dialog-button");
  fireEvent.click(dialogButton);

  const input = screen.getByLabelText("Cover Letter");

  await waitFor(() => {
    userEvent.upload(input, file);
  });

  expect(input.files.length).toBe(1);
});

test("allows resume upload on button click", async () => {
  const file = new File(["test content"], "test.pdf", { type: "application/pdf" });
  
  render(<AddDocumentsDialog />, { wrapper: RouterWrapper });
  const dialogButton = screen.getByTestId("document-dialog-button");
  fireEvent.click(dialogButton);

  const input = screen.getByLabelText("CV");

  await waitFor(() => {
    userEvent.upload(input, file);
  });

  expect(input.files.length).toBe(1);
});

test("allows picture upload on button click", async () => {
  const file = new File(["dummy content"], "example.png", {
    type: "image/png",
  });
  
  render(<AddDocumentsDialog />, { wrapper: RouterWrapper });
  const dialogButton = screen.getByTestId("document-dialog-button");
  fireEvent.click(dialogButton);

  const input = screen.getByLabelText("Picture");

  await waitFor(() => {
    userEvent.upload(input, file);
  });

  expect(input.files.length).toBe(1);
});




