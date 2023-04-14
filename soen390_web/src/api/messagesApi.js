import axios from "axios";
import api from "../config.json";
import { findUserById } from "./UserProfileApi";
import  UserMessage from "../models/UserMessage.ts";

export async function getAllMessages(reqUserID, reqSenderID) {
  try {
    //console.log(reqSenderID)
    var embeddedId = [reqSenderID]
    if(reqUserID.includes(",")){
      let tempId= reqUserID.split(",")
      embeddedId= embeddedId.concat(tempId)
    }
    else{
      embeddedId.push(reqUserID)
    }

    const response = await axios.get(
      api.BACKEND_API + "/messages/getAllMessages",
      {
        params: {
          userIds: embeddedId,
          senderId: reqSenderID,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
export async function sendMessage(reqUserID, reqSenderID, reqMessage) {
  try {

    var embeddedId = [reqSenderID]
    if(reqUserID.includes(",")){
      let tempId= reqUserID.split(",")
      embeddedId= embeddedId.concat(tempId)
    }
    else{
      embeddedId.push(reqUserID)
    }
    const Ids = JSON.stringify(embeddedId);
    const queryString = `senderId=${reqSenderID}&Ids=${Ids}&message=${reqMessage}`;

    const response = await axios.get(
      api.BACKEND_API + "/messages/sendMessage?" + queryString
    );
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
export async function sendMessageDocument(reqUserID, reqSenderID, reqMessage) {
  try {
    var embeddedId = [reqSenderID]
    if(reqUserID.includes(",")){
      let tempId= reqUserID.split(",")
      embeddedId= embeddedId.concat(tempId)
    }
    else{
      embeddedId.push(reqUserID)
    }
    const Ids = JSON.stringify([reqUserID, reqSenderID]);
    const queryString = `senderId=${reqSenderID}&Ids=${Ids}&message=${reqMessage}&type=document`;

    const response = await axios.get(
      api.BACKEND_API + "/messages/sendMessage?" + queryString
    );
    return response;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}

export async function getActiveConvos(reqID) {
  try {
    const queryString = `id=${reqID}&returnEmail=false`;

    const response = await axios.get(
      api.BACKEND_API + "/messages/getActiveConversation?" + queryString
    );

    const activeConvos = response.data.activeConvos;
    console.log(response.data)

    const updatedActiveConvos = [];

    for (let i = 0; i < activeConvos.length; i++) {
      const activeUserIds = activeConvos[i].ActiveUser;
      const otherUserId = activeUserIds.filter((id) => id !== reqID);
      console.log(otherUserId);
      

      let name="";
      let avatar="";
      let userID=[];
      
      for(let j=0;j<otherUserId.length;j++){
        const userDataResponse = await findUserById(otherUserId[j]);
        const userData = userDataResponse.data;

        userID.push(userData.userID)

        if(j==0){
          avatar=userData.picture
          name=userData.name
        }
        else{
          name = name +", "+userData.name
        }
      }

      let userTemp= new UserMessage(name,[...userID],avatar)

      activeConvos[i].ActiveUser = userTemp;

      updatedActiveConvos.push(activeConvos[i]);
    }
    return updatedActiveConvos;
  } catch (error) {
    console.error("error", error);
    return false;
  }
}
export async function handleDocumentDecrypt(downloadURL, conversationID) {
  try {
    const encodedDownloadURL = encodeURIComponent(downloadURL);
    const response = await axios.get(
      api.BACKEND_API +
        `/messages/downloadDocument?encryptedUrl=${encodedDownloadURL}&conversationID=${conversationID}`
    );
    const decryptedUrl = response.data;
    return decryptedUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createConversation(arrayOfIds) {
  try {
    const idsString = (JSON.stringify(arrayOfIds));
    const url = `${api.BACKEND_API}/messages/createConversation?ids=${idsString}`;
    console.log(url)
    const response = await axios.get(url);
    if(response.status==200){
      console.log(response.data)
    return response.data;
    }
    else{
      return false;
    }
  } catch (error) {
    console.error(error);
    return false
  }
}
