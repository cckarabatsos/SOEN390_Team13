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
Connecting all of the database to the backend
*/
const AwardDB = db.collection("awards");
const ChatDB = db.collection("chats");
const ExperienceDB = db.collection("experiences");
const FollowDB = db.collection("follows");
const PostDB = db.collection("posts");
const ProjectDB = db.collection("projects");
const SkillDB = db.collection("skills");
const UserDB = db.collection("users");
/*
Exporting the databases for use in the other files
*/
module.exports = AwardDB;
module.exports = ChatDB;
module.exports = ExperienceDB;
module.exports = FollowDB;
module.exports = PostDB;
module.exports = ProjectDB;
module.exports = SkillDB;
module.exports = UserDB;
