import * as yup from "yup";
export const conversationSchema = yup.object().shape({
    conversationID: yup.string().required(),
    key: yup.string().required(),
    ssages: yup.array().of(yup.string()),
    userArray: yup.array(yup.string()).required(),
});
export type Conversation = yup.InferType<typeof conversationSchema>;
