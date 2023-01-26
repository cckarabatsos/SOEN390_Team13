"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//imports needed later for the encryption
//import jsonwebtoken from "jsonwebtoken";
//import { hash, compare } from "bcrypt";
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const User = require("./firebaseconfig");
const app = (0, express_1.default)();
const port = 7000; //Port for the backend
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ["http;//localhost:3000"],
    credentials: true,
}));
//Example of route to test
// const User = require("./firebaseconfig");
app.get("/api", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const snapshot = yield User.get();
    const list = snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    res.send(list);
}));
//Requiring routes for different request types
// These are to be added when we add the module exports for them in due time
//const awardRouter = require("./routes/awardRoutes");
//app.use("/award", awardRouter);
// const chat = require("./routes/chat_routes");
// app.use("/chat", chat);
// const experience = require("./routes/experience_routes");
// app.use("/experience", experience);
// const follows = require("./routes/follows_routes");
// app.use("/follows", follows);
// const post = require("./routes/post_routes");
// app.use("/post", post);
// const skill = require("./routes/user_routes");
// app.use("/skill", skill);
const user = require("./routes/userRoutes");
// Logging the routes in the user router
console.log(user.stack);
app.use("/user", user);
//Heartbeat Route
app.get("/", (_, res) => {
    res.send("Hi!");
});
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
