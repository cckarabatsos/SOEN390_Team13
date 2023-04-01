/**
 * Model for the Application entity
 */
import * as yup from "yup";

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
    status: yup.string().required(),
    school: yup.string().required(),
    schoolCountry: yup.string().required(),
    schoolDegree: yup.string().required(),
    schoolEnd: yup.date().required(),
    schoolMajor: yup.string().required(),
    timestamp: yup.string().required(),
    ownerID: yup.string().required(),
    postingID: yup.string().required(),
    attachResume: yup.boolean().required().default(false),
    attachCoverLetter: yup.boolean().required().default(false),
    resume: yup.string().required(),
    coverLetter: yup.string().required(),
    experience: yup.array(yup.string()).required().default([]),
    applicationID: yup.string().required(),
  })
  .required();

export type Application = yup.InferType<typeof application_schema>;
