const UserDB = require("../firebaseconfig.ts");
export async function findUserWithID(userID: number) {
    try {
        var user = UserDB.where("__name__", "==", userID).get;
    } catch (error) {
        console.log(error);
    }
    return user;
}
