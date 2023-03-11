import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import ActionButton from "../components/ActionButton";

jest.mock("axios");

describe("ActionButton", () => {
  const userID = "user123";
  const postingID = "posting123";
  const withdrawSuccessMessage = "Application withdrawn successfully!";
  const withdrawFailMessage = "Failed to withdraw application. Please try again.";
  const mockedHandleWithdrawApplication = jest.fn();
  
  beforeEach(() => {
    mockedHandleWithdrawApplication.mockClear();
    axios.post.mockClear();
  });

  test("should render the component with a button", () => {
    render(<ActionButton userID={userID} postingID={postingID} />);
    const button = screen.getByRole("button", { name: "..." });
    expect(button).toBeInTheDocument();
  });

  test("should show the popper on button click", async () => {
    render(<ActionButton userID={userID} postingID={postingID} />);
    const button = screen.getByRole("button", { name: "..." });
    fireEvent.click(button);
    await waitFor(() => {
      const viewApplicationOption = screen.getByText("View application");
      const withdrawApplicationOption = screen.getByText("Withdraw application");
      expect(viewApplicationOption).toBeInTheDocument();
      expect(withdrawApplicationOption).toBeInTheDocument();
    });
  });

  test("should withdraw application on option click", async () => {
    axios.post.mockResolvedValueOnce({});
    render(<ActionButton userID={userID} postingID={postingID} />);
    const button = screen.getByRole("button", { name: "..." });
    fireEvent.click(button);
    await waitFor(() => {
      const withdrawOption = screen.getByText("Withdraw application");
      userEvent.click(withdrawOption);
      expect(mockedHandleWithdrawApplication).toHaveBeenCalledTimes(1);
    });
  });

  test("should show success message on successful application withdrawal", async () => {
    axios.post.mockResolvedValueOnce({});
    window.alert = jest.fn();
    render(<ActionButton userID={userID} postingID={postingID} handleWithdrawApplication={mockedHandleWithdrawApplication} />);
    const button = screen.getByRole("button", { name: "..." });
    fireEvent.click(button);
    await waitFor(() => {
      const withdrawOption = screen.getByText("Withdraw application");
      userEvent.click(withdrawOption);
      expect(mockedHandleWithdrawApplication).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(withdrawSuccessMessage);
    });
  });

  test("should show error message on failed application withdrawal", async () => {
    axios.post.mockRejectedValueOnce({});
    window.alert = jest.fn();
    render(<ActionButton userID={userID} postingID={postingID} handleWithdrawApplication={mockedHandleWithdrawApplication} />);
    const button = screen.getByRole("button", { name: "..." });
    fireEvent.click(button);
    await waitFor(() => {
      const withdrawOption = screen.getByText("Withdraw application");
      userEvent.click(withdrawOption);
      expect(mockedHandleWithdrawApplication).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith(withdrawFailMessage);
    });
  });
});
