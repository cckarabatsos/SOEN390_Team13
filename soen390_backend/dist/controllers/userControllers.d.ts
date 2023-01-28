export declare function getUserWithID(userID: string): Promise<(number | import("firebase").default.firestore.DocumentData)[]>;
export declare function getUserWithEmail(email: string): Promise<unknown>;
export declare function comparePasswords(pwd: string, password: string): Promise<boolean>;
