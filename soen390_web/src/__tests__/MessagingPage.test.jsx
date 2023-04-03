import React from 'react';
import { render, screen } from '@testing-library/react';
import Messages from '../pages/MessagingPage';
import { makeStyles } from "@material-ui/core/styles";
import ReactDOM from 'react-dom';

describe('Messages', () => {
  test('renders Messages component', () => {
    render(<Messages />);
    const messagesElement = screen.getByTestId('messages-component');
    expect(messagesElement).toBeInTheDocument();
  });
});

describe("useStyles", () => {
    it("should return the expected object", () => {
      const expected = {
        root: {
          display: "flex",
          marginBottom: "40%",
        },
        drawer: {
          width: 240,
          flexShrink: 0,
        },
        drawerPaper: {
          width: 240,
          borderRight: `1px solid rgba(0, 0, 0, 0.12)`,
        },
        toolbar: {
          minHeight: 64,
        },
        content: {
          flexGrow: 1,
          padding: "24px",
        },
        listItemText: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
        conversation: {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        },
        messageContainer: {
          display: "flex",
          flexDirection: "column",
          marginTop: "auto",
          marginBottom: "8px",
        },
        message: {
          maxWidth: "80%",
          padding: "8px",
          borderRadius: "16px",
          backgroundColor: "#9993FF",
          alignSelf: "flex-start",
          marginBottom: "8px",
          boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
        },
        sentMessage: {
          alignSelf: "flex-end",
          backgroundColor: "#EDEDED",
          color: "black",
          borderRadius: "16px",
          padding: "8px",
          maxWidth: "80%",
          marginBottom: "8px",
          boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
        },
        messagesContainer: {
          overflowY: "auto",
          paddingBottom: "8px",
        },
        refreshButton: {
          marginTop: "8px",
        },
        refreshButtonContainer: {
          marginTop: "8px",
        },
        messageInputContainer: {
          display: "flex",
          marginTop: "8px",
        },
        messageInput: {
          flexGrow: 1,
          marginRight: "8px",
        },
      };
  
      const useStylesResult = makeStyles(() => expected)();
  
      expect(useStylesResult).toEqual(expected);
    });
  });