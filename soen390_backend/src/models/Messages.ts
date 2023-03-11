import firebase from "firebase";
// Model for the chatMessage entity
export type chatMessage = {
    content: string;
    isRead: boolean;
    senderId: string;
    timestamp: firebase.firestore.Timestamp | Date;
    type: string;
};
// Model for the messageListElements
export type messagesListElement = {
    email: string;
    message: chatMessage;
};
