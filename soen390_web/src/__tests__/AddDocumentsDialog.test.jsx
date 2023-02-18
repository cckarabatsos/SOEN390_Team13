import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
const MemoryRouter = require("react-router-dom").MemoryRouter;

const AddDocumentsDialog = require("../components/AddDocumentsDialog").default;
const RouterWrapper = ({ children }) => <MemoryRouter>{children}</MemoryRouter>;

test("is rendered for upoading documents", () => {
  render(<AddDocumentsDialog />, { wrapper: RouterWrapper });

  const dialogButton = screen.getByTestId("document-dialog-button");
  const dialog = screen.getByTestId("dialog-box");

  fireEvent.click(dialogButton);

  expect(dialog).toBeVisible();
});
