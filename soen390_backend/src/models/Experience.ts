import * as yup from "yup";
//Some types are to be changed later
export const experience_schema = yup
    .object()
    .shape({
        experienceID: yup.string().required(),
        atPresent: yup.boolean().required(),
        startDate: yup.string().required(),
        endDate: yup.string().when("atPresent", {
            is: false,
            then: yup
                .string()
                .required("Must enter an end date not working there"),
        }),
        company: yup.string().required(),
        position: yup.string().required(),
        type: yup.string().required(),
        logo: yup.string().required(),
        ownerID: yup.string().required(),
    })
    .required();

export type Experience = yup.InferType<typeof experience_schema>;
