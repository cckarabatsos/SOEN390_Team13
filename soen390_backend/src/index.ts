import express, { Application, Request, Response } from "express";
//imports needed later for the encryption
//import jsonwebtoken from "jsonwebtoken";
//import { hash, compare } from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app: Application = express();
const port: number = 7000;
// const router:Router = express.Router();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ["http;//localohost:3000"],
        credentials: true,
    })
);
var route,
    routes = [];

app._router.stack.forEach(function (middleware: any) {
    if (middleware.route) {
        // routes registered directly on the app
        routes.push(middleware.route);
    } else if (middleware.name === "router") {
        // router middleware
        middleware.handle.stack.forEach(function (handler: any) {
            route = handler.route;
            route && routes.push(route);
        });
    }
});
console.log(route);
//Example of route to test
// app.get("/", async (_: Request, res: Response) => {
//     const snapshot = await User.get();
//     const list = snapshot.docs.map((doc: any) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
//     res.send(list);
// });
//Requiring routes for different request types

const awardRouter = require("./routes/awardRoutes");
app.use("/award", awardRouter);

// These are to be added when we add the module exports for them in due time
// const chat = require("./routes/chat_routes");
// app.use("/award", chat);

// const experience = require("./routes/experience_routes");
// app.use("/award", experience);

// const follows = require("./routes/follows_routes");
// app.use("/award", follows);

// const post = require("./routes/post_routes");
// app.use("/award", post);

// const skill = require("./routes/user_routes");
// app.use("/user", skill);

const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);

//Heartbeat Route
app.get("/hi", (_: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
