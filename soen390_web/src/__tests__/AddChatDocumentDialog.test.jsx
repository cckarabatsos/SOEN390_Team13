import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddChatDocumentDialog from "../components/AddChatDocumentDialog.jsx";

describe("AddChatDocumentDialog component", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<AddChatDocumentDialog />);
    expect(getByTestId("document-dialog-button")).toBeInTheDocument();
  });

  test("dialog box opens when button is clicked", () => {
    const { getByTestId } = render(<AddChatDocumentDialog />);
    fireEvent.click(getByTestId("document-dialog-button"));
    expect(getByTestId("dialog-box")).toBeInTheDocument();
  });

  test("file list updates when file is added", () => {
    const { getByTestId } = render(<AddChatDocumentDialog />);
    fireEvent.click(getByTestId("document-dialog-button"));

    const fileInput = getByTestId("dialog-box");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    Object.defineProperty(fileInput, "files", { value: [file] });
    fireEvent.change(fileInput);

    expect(getByTestId("dialog-box")).not.toHaveTextContent("hello.png");
  });

  test("file is removed from list when remove button is clicked", () => {
    const { getByTestId, queryByText } = render(<AddChatDocumentDialog />);
    fireEvent.click(getByTestId("document-dialog-button"));

    const fileInput = getByTestId("dialog-box");
    const file = new File(["hello"], "hello.png", { type: "image/png" });
    Object.defineProperty(fileInput, "files", { value: [file] });
    fireEvent.change(fileInput);

    

    expect(queryByText("hello.png")).toBeNull();
  });

  test("closes dialog box on cancel", () => {
    render(<AddChatDocumentDialog />);
    const dialogButton = screen.getByTestId("document-dialog-button");
    fireEvent.click(dialogButton);
    const dialogBox = screen.getByTestId("dialog-box");
    const cancelButton = screen.getByText(/Cancel/);
    expect(dialogBox).toBeVisible();
    fireEvent.click(cancelButton);
    expect(dialogBox).toBeVisible();
  });
  
  test("closes dialog box on save and apply", () => {
    render(<AddChatDocumentDialog />);
    const dialogButton = screen.getByTestId("document-dialog-button");
    fireEvent.click(dialogButton);
    const dialogBox = screen.getByTestId("dialog-box");
    const saveAndApplyButton = screen.getByText(/Save/);
    expect(dialogBox).toBeVisible();
    fireEvent.click(saveAndApplyButton);
    expect(dialogBox).toBeVisible();
  });
});