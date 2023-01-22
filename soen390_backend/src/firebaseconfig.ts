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
const db = firebase.firestore();
const User = db.collection("users");
module.exports = User;
