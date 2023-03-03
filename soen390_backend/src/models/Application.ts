import * as yup from "yup";
//Some types are to be changed later
export const application_schema = yup
    .object()
    .shape({
        email: yup.string().required(),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        phone: yup.string().required(),
        address: yup.string().required(),
        address2: yup.string().required(),
        city: yup.string().required(),
        area: yup.string().required(),
        province: yup.string().required(),
        school: yup.string().required(),
        schoolCountry: yup.string().required(),
        schoolDegree: yup.string().required(),
        schoolEnd: yup.string().required(),
        schoolMajor: yup.string().required(),
        timestamp: yup.string().required(),
        ownerID: yup.string().required(),
        attachResume: yup.boolean().required().default(false),
        attachCoverLetter: yup.boolean().required().default(false),
        experience: yup.array(yup.string()).required().default([]),
        applicationID: yup.string().required()
    })
    .required();

export type Application = yup.InferType<typeof application_schema>;