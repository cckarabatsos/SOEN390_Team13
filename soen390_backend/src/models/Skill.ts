/**
 * Model for the Skill entity
 */
import * as yup from "yup";
//Some types are to be changed later
export const skill_schema = yup
    .object()
    .shape({
        skillID: yup.string().required(),
        ownerID: yup.string().required(),
        name: yup.string().required(),
    })
    .required();

export type Skill = yup.InferType<typeof skill_schema>;