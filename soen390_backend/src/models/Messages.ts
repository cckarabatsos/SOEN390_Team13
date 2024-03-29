import firebase from "firebase";
// Model for the chatMessage entity
export type chatMessage = {
    content: string;
    isRead: boolean;
    senderId: string;
    timestamp: firebase.firestore.Timestamp | Date;
    type: string;
    iv: String;
    senderName: String;
};

export type messagesListElement = {
    Id: string;
    message: chatMessage;
};

export type conversationListElement = {
    ActiveUser: string[];
    message: chatMessage | null;
};
