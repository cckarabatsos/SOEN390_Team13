import * as yup from "yup";
//Some types are to be changed later
export const chat_schema = yup
    .object()
    .shape({
        chatID: yup.string().required(),
        senderID: yup.string().required(),
        receiverID: yup.string().required(),
        content: yup.string().required(),
        timestamp: yup.timestamp().required(),
        attachement: yup.string().required(),
    })
    .required();

export type Chat = yup.InferType<typeof chat_schema>;
