import * as yup from "yup";
//Some types are to be changed later
export const award_schema = yup
    .object()
    .shape({
        awardID: yup.string().required(),
        ownerID: yup.string().required(),
        name: yup.string().required(),
        description: yup.string().required(),
        timestamp: yup.timestamp().required(),
    })
    .required();

export type Award = yup.InferType<typeof award_schema>;
