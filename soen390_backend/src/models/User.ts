import * as yup from "yup";
//Some types are to be changed later
export const user_schema = yup
    .object()
    .shape({
        name: yup.string().required(),
        password: yup.string(),
        email: yup.string().required(),
        privateKey: yup.string(),
        publicKey: yup.string(),
        picture: yup.string(),
        resume: yup.string(),
        coverLetter: yup.string(),
        bio: yup.string(),
        currentPosition: yup.string(),
        pendingInvitations: yup.array(yup.string()).required().default([]),
        contacts: yup.array(yup.string()).required().default([]),
        isCompany: yup.boolean().required().default(false),
        currentCompany: yup.string().when("isCompany", {
            is: true,
            then: yup
                .string()
                .test(
                    "is-name",
                    "The currentCompany field must match the name field",
                    function (value) {
                        return value === this.parent.name;
                    }
                )
                .required(),
        }),
        jobpostings: yup.object().when("isCompany", {
            is: true,
            then: yup
                .object({
                    applied: yup.array(yup.string()).default([]),
                    documents: yup.array(yup.string()).default([]),
                    postingids: yup.array(yup.string()).default([]),
                })
                .required("Field Is required when its a recruiter"),
        }),
        employees: yup
            .array(yup.string())
            .when("isCompany", {
                is: true,
                then: yup.array(yup.string()).default([]),
            })
            .required("Field Is required when its a recruiter"),
    })
    .required();

export const finalUserSchema = user_schema.shape({
    userID: yup.string().required(),
});
export const user_filter_schema = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    limit: yup.number().positive().integer().default(20),
    skip: yup.number().integer().default(0),
});

export type UserFilter = yup.InferType<typeof user_filter_schema>;
export type User = yup.InferType<typeof user_schema>;
export type FinalUser = yup.InferType<typeof finalUserSchema>;
