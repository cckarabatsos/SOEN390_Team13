import { findUserWithID, findUserWithEmail } from "../services/userServices";

export async function getUserWithID(userID: string) {
  let user = await findUserWithID(userID);
  console.log(user);
  if (user) {
    return [200, user];
  } else {
    return [404, { msg: "User not found" }];
  }
}
export async function getUserWithEmail(email: string) {
  return new Promise((resolve, _) => {
    findUserWithEmail(email, (user) => {
      if (user == null) {
        resolve([404, null]);
      } else {
        resolve([200, user]);
      }
    });
  });
}
//This is to be later updated to have the compare encrypted passwords
export async function comparePasswords(pwd: string, password: string) {
  let match: boolean = password == pwd;
  console.log(match);
  return match;
}
