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
const userControllers_1 = require("../controllers/userControllers");
const user = express_1.default.Router();
user.use(express_1.default.json());
//First example route look at postman for the route
user.get("/id/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userID = req.params.userID;
    console.log(userID);
    try {
        let status, data = yield (0, userControllers_1.getUserWithID)(userID);
        res.json({ data });
        if (status == 200) {
            res.sendStatus(200);
        }
        else if (status == 404) {
            res.sendStatus(404);
        }
    }
    catch (err) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
}));
//Exporting the user as a module
module.exports = user;
