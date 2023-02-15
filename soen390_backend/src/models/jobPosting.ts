import * as yup from "yup";
//Some types are to be changed later
export const jobposting_schema = yup
    .object()
    .shape({
        location: yup.string().required(),
        position: yup.string().required(),
        salary: yup.string().required(),
        company: yup.string().required(),
        contract: yup.string().required(),
        description: yup.string().required(),
        email: yup.string().required(),
        category: yup.string().required(),
        jobPosterID: yup.string().required(),
    })
    .required();

export type Jobposting = yup.InferType<typeof jobposting_schema>;
