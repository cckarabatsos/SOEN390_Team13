import * as yup from "yup";
//Some types are to be changed later
export const jobposting_schema = yup
    .object()
    .shape({
        location: yup.string().required(),
        position: yup.string().required(),
        salary: yup.string().required(),
        company: yup.string().required(),
        contract: yup.boolean().required(),
        duration: yup.string().when("contract", {
            is: true,
            then: yup.string().required(),
            otherwise: yup.string().notRequired(),
        }),
        type: yup.string().when("contract", {
            is: true,
            then: yup
                .string()
                .test({
                    name: "type-equals-contract",
                    message: "type must be 'contract' when contract is true",
                    test: (value) => value === "contract",
                })
                .required(),
            otherwise: yup.string().notRequired(),
        }),
        remote: yup.boolean().required(),
        description: yup.string().required(),
        email: yup.string().required(),
        logo: yup.string(),
        jobPosterID: yup.string().required(),
    })
    .required();

export const filter_schema = yup.object().shape({
    location: yup.string(),
    company: yup.string(),
    position: yup.string(),
    remote: yup.boolean(),
    type: yup.string(),
    limit: yup.number().positive().integer().default(10),
    skip: yup.number().integer().default(0),
});

export type Filter = yup.InferType<typeof filter_schema>;
export type Jobposting = yup.InferType<typeof jobposting_schema>;
