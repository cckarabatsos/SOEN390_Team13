import firebase from "firebase";
export declare const findUserWithID: (userID: string) => Promise<firebase.firestore.DocumentData | undefined>;
export declare const findUserWithEmail: (email: string, callback: (data: any) => void) => void;
