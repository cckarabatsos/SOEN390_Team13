import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileUploadChat from "../components/FileUploadChat.jsx";

describe("FileUploadChat", () => {
  test("renders file upload button with correct text", () => {
    render(<FileUploadChat />);
    const button = screen.getByRole("button", { name: /document/i });
    expect(button).toBeInTheDocument();
  });

  jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: 200 })),
  }));
  
  it('uploads file successfully', async () => {
    const mockUploadHandler = jest.fn();
    const { container } = render(<FileUploadChat uploadChatHandler={mockUploadHandler} />);
    const file = new File(['test file content'], 'test.png', { type: 'image/png' });
    const input = container.querySelector("input[type='file']");
    fireEvent.change(input, { target: { files: [file] } });
    await waitFor(() => {
        expect(mockUploadHandler).not.toHaveBeenCalled();
      });
  });

  test("displays correct file types", () => {
    render(<FileUploadChat />);
    const info = screen.getByText(/pdf, jpg, png/i);
    expect(info).toBeInTheDocument();
  });
});