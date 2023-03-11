/**
 * Model for the Report relationship
 */
import * as yup from "yup";
//Some types are to be changed later
export const report_schema = yup
    .object()
    .shape({
        reportedID: yup.string().required(),
        reason: yup.string().required(),
        reporterID: yup.string().required(),
    })
    .required();

export type Report = yup.InferType<typeof report_schema>;
