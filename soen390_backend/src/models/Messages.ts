import * as yup from "yup";
export const message_schema = yup

.object()
.shape({
    content: yup.string().required(),
    isRead: yup.boolean().required(),
    senderId: yup.string().required(),
    timestamp: yup.string(),
    type: yup.string().required()

})


export const conversation_schema = yup
.object()
.shape({
    messages:yup.array(yup.string()).required().default([]),
    userArray:yup.array(yup.string()).required().default([]),
})


export type Conversation = yup.InferType<typeof conversation_schema>;

export type Message = yup.InferType<typeof message_schema>;