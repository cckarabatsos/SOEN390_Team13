"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserWithID = void 0;
// const UserDB = require("../firebaseconfig.ts");
//import { firestore } from "firebase-admin";
//const db = firestore();
function findUserWithID(userID) {
    return __awaiter(this, void 0, void 0, function* () {
        //const userRef = await db.collection("users").doc(userID).get();
        // Small bug just need to get one document
        // console.log(userID);
        // const userRef = db.collection("users");
        // const snapshot = await userRef.get();
        // snapshot.forEach((doc) => {
        //     console.log(doc.id, "=>", doc.data());
        // });
        console.log(userID);
        return "1234";
    });
}
exports.findUserWithID = findUserWithID;
