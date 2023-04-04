import { fireEvent, render } from "@testing-library/react";
import React from "react";
import {
  getActiveConvos,
  getAllMessages,
  sendMessage,
} from "../api/messagesApi";
import { findUserById } from "../api/UserProfileApi";
import Messages from "../pages/MessagingPage";
import { MemoryRouter as Router } from "react-router-dom";

jest.mock("../firebaseConfig");
jest.mock("../api/messagesApi");
jest.mock("../api/UserProfileApi");

describe("Messages", () => {
  const mockUserData = {
    userID: "testUserID",
    name: "Test User",
    avatar: "test-avatar.jpg",
    status: "Online",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the Messages component", () => {
    const { getByText } = render(<Router><Messages userData={mockUserData} /></Router>);
    const drawerTitle = getByText(
      "Please select a user to start a conversation."
    );
    expect(drawerTitle).toBeInTheDocument();
  });

  test("fetches active conversations and messages on load", async () => {
    getActiveConvos.mockResolvedValueOnce([
      {
        ActiveUser: {
          userID: "testUserID1",
          name: "Test User 1",
          avatar: "test-avatar1.jpg",
          status: "Online",
        },
      },
    ]);
    findUserById.mockResolvedValueOnce({
      data: {
        userID: "testUserID1",
        name: "Test User 1",
        avatar: "test-avatar1.jpg",
        status: "Online",
      },
    });

    getAllMessages.mockResolvedValueOnce({
      data: {
        usersChat: {
          listOfMessages: [
            {
              message: {
                content: "Hello!",
                senderId: "testUserID1",
                timestamp: new Date(),
              },
            },
          ],
          conversationID: "testConversationID1",
        },
      },
    });

    const { findByText } = render(<Router><Messages userData={mockUserData} /></Router>);
    const userName = await findByText("Test User 1");
    expect(userName).toBeInTheDocument();
    expect(getActiveConvos).toHaveBeenCalledWith("testUserID");
    expect(findUserById).toHaveBeenCalledWith("testUserID1");
    expect(getAllMessages).toHaveBeenCalledWith("testUserID", "testUserID1");
  });

  test("sends message when send button is clicked", async () => {
    getActiveConvos.mockResolvedValueOnce([
      {
        ActiveUser: {
          userID: "testUserID1",
          name: "Test User 1",
          avatar: "test-avatar1.jpg",
          status: "Online",
        },
      },
    ]);
    findUserById.mockResolvedValueOnce({
      data: {
        userID: "testUserID1",
        name: "Test User 1",
        avatar: "test-avatar1.jpg",
        status: "Online",
      },
    });

    getAllMessages.mockResolvedValueOnce({
      data: {
        usersChat: {
          listOfMessages: [
            {
              message: {
                content: "Hello!",
                senderId: "testUserID1",
                timestamp: new Date(),
              },
            },
          ],
          conversationID: "testConversationID1",
        },
      },
    });

    sendMessage.mockResolvedValueOnce();

    const { findByText, getByLabelText, getByText } = render(
      <Router><Messages userData={mockUserData} /></Router>
    );
    const userName = await findByText("Test User 1");
    expect(userName).toBeInTheDocument();

    const messageInput = getByLabelText("Type a message");
    const sendButton = getByText("Send");
    const messageValue = "Test message value";

    fireEvent.change(messageInput, { target: { value: messageValue } });
    fireEvent.click(sendButton);

    expect(sendMessage).toHaveBeenCalledWith(
      "testUserID1",
      "testUserID",
      messageValue
    );
  });

  test("refreshes conversations when refresh button is clicked", async () => {
    getActiveConvos.mockResolvedValueOnce([
      {
        ActiveUser: {
          userID: "testUserID1",
          name: "Test User 1",
          avatar: "test-avatar1.jpg",
          status: "Online",
        },
      },
    ]);
    findUserById.mockResolvedValueOnce({
      data: {
        userID: "testUserID1",
        name: "Test User 1",
        avatar: "test-avatar1.jpg",
        status: "Online",
      },
    });

    getAllMessages.mockResolvedValueOnce({
      data: {
        usersChat: {
          listOfMessages: [
            {
              message: {
                content: "Hello!",
                senderId: "testUserID1",
                timestamp: new Date(),
              },
            },
          ],
          conversationID: "testConversationID1",
        },
      },
    });

    const { findByText, getByText } = render(
      <Router><Messages userData={mockUserData} /></Router>
    );
    const userName = await findByText("Test User 1");
    expect(userName).toBeInTheDocument();

    const refreshButton = getByText("Refresh Conversations");
    fireEvent.click(refreshButton);

    expect(findUserById).toHaveBeenCalledTimes(2);
    expect(getAllMessages).toHaveBeenCalledTimes(2);
  });
});