/**
 * Model for the Post entity
 */
import * as yup from "yup";
//Some types are to be changed later
export const post_schema = yup
    .object()
    .shape({
        postID: yup.string().required(),
        ownerID: yup.string().required(),
        timestamp: yup.string().required(),
        content: yup.string().required(),
    })
    .required();

export type Post = yup.InferType<typeof post_schema>;
