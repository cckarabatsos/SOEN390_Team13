import { error } from "console";
import firebase from "firebase";
import "firebase/storage";
//import { Conversation, conversation_schema } from "../models/Messages";
const db = firebase.firestore();
//const ref = firebase.storage().ref();


const orderIds = (arr: string[]): string[] => {
    const len = arr.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return arr;
}

const findUserWithEmail = (
    email: string,
    callback: (data: any) => void
) => {
    db.collection("users")
        .where("email", "==", email)
        .get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                let data = processData(snapshot);
                callback(data);
            } else {
                callback(null);
            }
        })
        .catch((error) => {
            console.log("Error getting the document:", error);
            throw new Error(error.message);
        });
};

function processData(snapshot: any) {
    let data = snapshot.docs.map((doc: { data: () => any; id: string }) => ({
        data: doc.data(),
        id: doc.id,
    }));
    if (data !== null) {
        return data[0];
    } else {
        console.log("ERROR");
        throw error;
    }
}

async function fetchConversation(userIds: string[]){
    try {
       
        

        let conversation = await db.collection("conversations").where("userArray", "==", userIds).get();;

        //let b: any =conversation.data()

        //let c:any = b["messages"]

        //let d = await c[0].get()
        
        let convo= conversation.docs.map((doc: { data: () => any; id: string }) => ({
            data: doc.data(),
            id: doc.id,
        }));
        
        return convo; 
    } catch (error) {
        console.log(error);
        throw error;
        
    }
}


export async function initiateConversation(
    userEmails: string[],
) {
    let userList=true
    try {
        let userIds: string[] = new Array();
        for (var i = 0; i < userEmails.length; i++) {
            var sender: any;

            sender = await new Promise((resolve, _) => {
                findUserWithEmail(userEmails[i], (user) => {
                    // console.log(user);
                    if (user == null) {
                        resolve(null);
                    } else {
                        resolve(user);
                    }
                });
            });

            if (sender.data) {
                userIds.push(sender.data["userID"]);
            }
        }
        userIds =orderIds(userIds)

        let conversationFound:any = await fetchConversation(userIds)

         //check for duplicates:
         let findDuplicates = (arr: string[]) => arr.filter((item, index) => arr.indexOf(item) != index)
        
        if (conversationFound.length > 0 || findDuplicates(userIds).length>0) {
            userList=false
            throw new Error();
        }

        db.collection("conversations").add({
            messages: [],
            userArray: userIds
        })
        .then(() => {
            console.log("Document successfully written!");
        })


      
    } catch (error) {
        throw new Error("Error in initiateConversation");
    }
    console.log(userList);
    return userList;
}
