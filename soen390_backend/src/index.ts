import express, { Application, Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import { userDB } from "./firebaseconfig";
import jobposting from "./routes/jobPostingRoutes";
import experience from "./routes/experienceRoutes";
import award from "./routes/awardRoutes";
import user from "./routes/userRoutes";
import messages from "./routes/messagesRoutes";
import reports from "./routes/reportRoutes";
import notification from "./routes/notificationRoutes";
import skill from "./routes/skillRoutes";
import application from "./routes/applicationRoutes";
// (global as any).XMLHttpRequest = require("xhr2");

const app: Application = express();
const port: any = process.env.port || 7000;
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.use(function (_req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "*");
    next();
});

//Example of route to test

app.get("/api", async (_: Request, res: Response) => {
    const snapshot = await userDB.get();
    const list = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    }));
    res.send(list);
});

//Requiring routes for different request types

//Adding All routes

app.use("/jobposting", jobposting);
app.use("/user", user);
app.use("/skill", skill);
app.use("/experience", experience);
app.use("/award", award);
app.use("/application", application);
app.use("/notification", notification);
app.use("/reports", reports);
app.use("/messages", messages);
//Heartbeat Route
app.get("/", (_: Request, res: Response) => {
    res.send("Hi!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
//Triggering PR run
export default app;
