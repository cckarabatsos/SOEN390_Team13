/**
 * Model for the Notification entity
 */
import * as yup from "yup";
//Some types are to be changed later
export const notification_schema = yup
    .object()
    .shape({
        logo: yup.string().required(),
        timestamp: yup.string().required(),
        message: yup.string().required(),
        category: yup.string().required()
    })
    .required();

export type Notification = yup.InferType<typeof notification_schema>;