import serverlessExpress from "serverless-http";
import app from "./index";

export const handler = serverlessExpress(app);
