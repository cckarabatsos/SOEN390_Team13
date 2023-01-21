import express, { Application, Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";

//import jsonwebtoken from "jsonwebtoken";
//import { hash, compare } from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();
const port = 7000;
// const router:Router = express.Router();

initializeApp({});
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http;//localohost:3000"],
        credentials: true,
    })
);

//Database

//Heartbeat Route
app.get("/hi", (_: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
