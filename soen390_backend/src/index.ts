import express, { Application, Request, Response } from "express";
//imports needed later for the encryption
//import jsonwebtoken from "jsonwebtoken";
//import { hash, compare } from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
(global as any).XMLHttpRequest = require("xhr2");
dotenv.config();
const User = require("./firebaseconfig");
const app: Application = express();
const port: any = process.env.port || 7000; //Port for the backend

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

// const User = require("./firebaseconfig");
app.get("/api", async (_: Request, res: Response) => {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    }));
    res.send(list);
});

//Requiring routes for different request types

//Adding jobposting routes
const jobposting = require("./routes/jobPostingRoutes");
app.use("/jobposting", jobposting);
// Adding user routes
const user = require("./routes/userRoutes");
app.use("/user", user);
const skill = require("./routes/skillRoutes");
app.use("/skill", skill);
const experience = require("./routes/experienceRoutes");
app.use("/experience", experience);
const award = require("./routes/awardRoutes");
app.use("/award", award);
const application = require("./routes/applicationRoutes");
app.use("/application", application);
const reports = require("./routes/reportRoutes");
app.use("/reports", reports);
//Heartbeat Route
app.get("/", (_: Request, res: Response) => {
    res.send("Hi!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});

export default app;
