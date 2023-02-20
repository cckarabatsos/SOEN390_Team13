import * as yup from "yup";
//Some types are to be changed later
export const user_schema = yup
  .object()
  .shape({
    userID: yup.string().required(),
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
    currentCompany: yup.string(),
    isRecruiter: yup.boolean().required().default(false),
    pendingInvitations: yup.array(yup.string()),
    contacts: yup.array(yup.string()),
  })
  .required();


  export const user_filter_schema = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    limit: yup.number().positive().integer().default(20),
    skip: yup.number().integer().default(0),
});

export type UserFilter = yup.InferType<typeof user_filter_schema>;
export type User = yup.InferType<typeof user_schema>;
