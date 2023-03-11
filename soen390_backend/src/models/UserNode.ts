/**
 * Model for the User Node entity
 */
import * as yup from "yup";

export const userNode_schema = yup
    .object()
    .shape({
        userID: yup.string().required(),
        name: yup.string().required(),
        picture: yup.string(),
        email: yup.string().required(),
    })
    .required();
export type UserNode = yup.InferType<typeof userNode_schema>;
