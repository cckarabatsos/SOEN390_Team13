import axios from "axios";
import api from "../config.json";
import { findUserById } from "./UserProfileApi";

export async function getAllMessages(reqUserID, reqSenderID) {
    try {
        const response = await axios.get(
            api.BACKEND_API + "/messages/getAllMessages",
            {
                params: {
                    userIds: [reqSenderID, reqUserID],
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
        const Ids = JSON.stringify([reqUserID, reqSenderID]);
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

export async function getActiveConvos(reqID) {
    try {
        const queryString = `id=${reqID}&returnEmail=false`;

        const response = await axios.get(
            api.BACKEND_API + "/messages/getActiveConversation?" + queryString
        );

        const activeConvos = response.data.activeConvos;

        const updatedActiveConvos = [];

        for (let i = 0; i < activeConvos.length; i++) {
            const activeUserIds = activeConvos[i].ActiveUser;
            const otherUserId = activeUserIds.find((id) => id !== reqID);
            const userDataResponse = await findUserById(otherUserId);
            const userData = userDataResponse.data;

            activeConvos[i].ActiveUser = userData;

            updatedActiveConvos.push(activeConvos[i]);
        }
        return updatedActiveConvos;
    } catch (error) {
        console.error("error", error);
        return false;
    }
}
