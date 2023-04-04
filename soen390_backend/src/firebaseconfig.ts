import firebase from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();
// const firebaseConfig = {
//     apiKey: "AIzaSyAKE7H7FT_UPAzne8zWBDVGQyUmsRB2GS4",
//     authDomain: "soen-390-7f4fc.firebaseapp.com",
//     projectId: "soen-390-7f4fc",
//     storageBucket: "soen-390-7f4fc.appspot.com",
//     messagingSenderId: "821988806720",
//     appId: "1:821988806720:web:88e28c1df416e8a3f60fa5",
//     measurementId: "G-870JS5PTLN",
// };
//console.log(process.env.FIREBASECONFIG!);
const cfg = JSON.parse(process.env.FIREBASECONFIG!);
firebase.initializeApp({
    storageBucket: "soen-390-7f4fc.appspot.com",
    credential: firebase.credential.cert({
        clientEmail: cfg.client_email,
        projectId: cfg.project_id,
        privateKey: cfg.private_key,
    }),
});
export const db = firebase.firestore();
/*
Connecting all of the database to the backend
*/
export const awardDB = db.collection("awards");
export const chatDB = db.collection("chats");
export const experienceDB = db.collection("experiences");
export const followDB = db.collection("follows");
export const jobPostingDB = db.collection("jobpostings");
export const projectDB = db.collection("projects");
export const skillDB = db.collection("skills");
export const userDB = db.collection("users");
export const conversationDB = db.collection("conversations");
export const applicationDB = db.collection("applications");
export const notificationDB = db.collection("notifications");
export const reportDB = db.collection("reports");
