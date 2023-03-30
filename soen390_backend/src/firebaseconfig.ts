import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAKE7H7FT_UPAzne8zWBDVGQyUmsRB2GS4",
    authDomain: "soen-390-7f4fc.firebaseapp.com",
    projectId: "soen-390-7f4fc",
    storageBucket: "soen-390-7f4fc.appspot.com",
    messagingSenderId: "821988806720",
    appId: "1:821988806720:web:88e28c1df416e8a3f60fa5",
    measurementId: "G-870JS5PTLN",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

/*
Exporting the databases for use in the other files
*/
export const AwardDB = db.collection("awards");
export const ChatDB = db.collection("chats");
export const ExperienceDB = db.collection("experiences");
export const FollowDB = db.collection("follows");
export const PostDB = db.collection("posts");
export const ProjectDB = db.collection("projects");
export const SkillDB = db.collection("skills");
export const UserDB = db.collection("users");
