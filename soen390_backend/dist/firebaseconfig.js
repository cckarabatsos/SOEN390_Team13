"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = __importDefault(require("firebase"));
var firebaseConfig = {
    apiKey: "AIzaSyAKE7H7FT_UPAzne8zWBDVGQyUmsRB2GS4",
    authDomain: "soen-390-7f4fc.firebaseapp.com",
    projectId: "soen-390-7f4fc",
    storageBucket: "soen-390-7f4fc.appspot.com",
    messagingSenderId: "821988806720",
    appId: "1:821988806720:web:88e28c1df416e8a3f60fa5",
    measurementId: "G-870JS5PTLN",
};
firebase_1.default.initializeApp(firebaseConfig);
var db = firebase_1.default.firestore();
/*
Connecting all of the database to the backend
*/
var AwardDB = db.collection("awards");
var ChatDB = db.collection("chats");
var ExperienceDB = db.collection("experiences");
var FollowDB = db.collection("follows");
var PostDB = db.collection("posts");
var ProjectDB = db.collection("projects");
var SkillDB = db.collection("skills");
var UserDB = db.collection("users");
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
