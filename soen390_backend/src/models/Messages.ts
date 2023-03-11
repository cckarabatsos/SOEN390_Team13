import firebase from "firebase";

export type chatMessage = {
  content: string;
  isRead: boolean;
  senderId: string;
  timestamp: firebase.firestore.Timestamp | Date;
  type: string;
};

export type messagesListElement = {
  email: string;
  message: chatMessage;
};

export type conversationListElement = {
  ActiveUser: string[];
  message: chatMessage;
};