import * as yup from "yup";
//Some types are to be changed later
export const userNode_schema = yup
  .object()
  .shape({
    userID: yup.string().required(),
    name: yup.string().required(),
    picture: yup.string(),
    email: yup.string().required(),})
    .required()
export type UserNode = yup.InferType<typeof userNode_schema>;