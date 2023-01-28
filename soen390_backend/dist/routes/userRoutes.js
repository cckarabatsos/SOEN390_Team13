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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userControllers_1 = require("../controllers/userControllers");
var user = express_1.default.Router();
user.use(express_1.default.json());
//Get complete user by their id
user.get("/id/:userID", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, status, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.params.userID;
                console.log(userID);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                status = void 0;
                return [4 /*yield*/, (0, userControllers_1.getUserWithID)(userID)];
            case 2:
                data = _a.sent();
                res.json({ data: data });
                if (status == 200) {
                    res.sendStatus(200);
                }
                else if (status == 404) {
                    res.sendStatus(404);
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400);
                res.json({ errType: err_1.Name, errMsg: err_1.message });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Get user by their email then verify the password
user.get("/api/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, email, pwd, userArr, status, _a, password, user_1, match, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                email = req.query.email;
                pwd = req.query.password;
                return [4 /*yield*/, (0, userControllers_1.getUserWithEmail)(email).then()];
            case 1:
                userArr = _b.sent();
                status = userArr[0];
                if (!(status == 404)) return [3 /*break*/, 2];
                res.status(404).json("User not found");
                return [2 /*return*/];
            case 2: return [4 /*yield*/, userArr[1]];
            case 3:
                _a = _b.sent(), password = _a.password, user_1 = __rest(_a, ["password"]);
                return [4 /*yield*/, (0, userControllers_1.comparePasswords)(pwd, password)];
            case 4:
                match = _b.sent();
                if (match) {
                    res.cookie("FrontendUser", {
                        maxAge: 28800000,
                        path: "/",
                        httpOnly: true,
                        sameSite: "none",
                        secure: true,
                    });
                    res.status(200).json(user_1);
                }
                else {
                    res
                        .status(401)
                        .json("A user with such password email config does not exist");
                }
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _b.sent();
                res.status(400);
                res.json({ errType: err_2.name, errMsg: err_2.message });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, user];
        }
    });
}); });
//Exporting the user as a module
module.exports = user;
