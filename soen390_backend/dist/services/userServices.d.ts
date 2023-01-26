import firebase from "firebase";
export declare const findUserWithID: (userID: string) => Promise<firebase.firestore.DocumentData | undefined>;
