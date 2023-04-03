import api from "../config.json";

export const BACKEND_URL =
    process.env.NODE_ENV === "production" ? api.PROD : api.DEV;
