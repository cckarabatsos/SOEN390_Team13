// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAKE7H7FT_UPAzne8zWBDVGQyUmsRB2GS4",
    authDomain: "soen-390-7f4fc.firebaseapp.com",
    databaseURL: "https://soen-390-7f4fc-default-rtdb.firebaseio.com",
    projectId: "soen-390-7f4fc",
    storageBucket: "soen-390-7f4fc.appspot.com",
    messagingSenderId: "821988806720",
    appId: "1:821988806720:web:3e5be6cd05453026f60fa5",
    measurementId: "G-2BWDKBFRWL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Other exports
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, provider, db, auth };
