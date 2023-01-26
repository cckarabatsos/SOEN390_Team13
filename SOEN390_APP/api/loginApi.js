import { auth, db } from "../firebaseConfig";
import { addDoc, collection, query,where } from "../soen390_backend/firebase/firestore";
import { ILoginUser } from "../Models/UsersModel";

export async function CreateUser() {
  console.log("Create User API call");
  const usersCollectionRef = collection(db, "users");
  await addDoc(usersCollectionRef, {
    email: auth.currentUser.email,
    name: auth.currentUser.displayName,
  });
}

export async function LoginUser(user) {
  console.log("Login User API call");
  const usersCollectionRef = collection(db, "users");
  const res =  await query(usersCollectionRef, where('email','==',user.email));
  console.log(res.data())
  return res.data().password == user.password

}
export async function LoginUserGoogle() {
  console.log("Login User API call");
  const usersCollectionRef = collection(db, "users");
  await query(usersCollectionRef, where('email','==',''));
}
