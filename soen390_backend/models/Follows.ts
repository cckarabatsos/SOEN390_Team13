import * as yup from "yup";
//Some types are to be changed later
export const follows_schema = yup
    .object()
    .shape({
        followerID: yup.number().required(),
        followeeID: yup.string().required(),
        date: yup.string().required(),
        followsID: yup.string().required(),
    })
    .required();

export type Follows = yup.InferType<typeof follows_schema>;
