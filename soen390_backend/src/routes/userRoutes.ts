import express, { Request, Response } from "express";
import { createJobPosting } from "../controllers/jobPostingControllers";
//import { UserImportBuilder } from "firebase-admin/lib/auth/user-import-builder";
export interface IGetUserAuthInfoRequest extends Request {
    user: string; // or any other type
}
import {
    getUserWithID,
    getUserWithEmail,
    registerUser,
    deleteUser,
    sendInvite,
    manageInvite,
    editAccount,
    getInvitationsOrContacts,
    getFilteredUsersController,
    generateAccessToken,
    verifyJWT,
    hasUser,
    getAccountFile,
    uploadAccountFile,
    hasFile,
    removeAccountFile,
    getFilteredCompaniesController,
    followCompany,
    unFollowCompany,
} from "../controllers/userControllers";
import dotenv from "dotenv";
import { User } from "../models/User";
import { compare } from "bcrypt";
const multer = require("multer");
var upload = multer({ storage: multer.memoryStorage() });
const user = express.Router();
user.use(express.json());
dotenv.config();
//Get complete user by their id
user.get("/id/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    //console.log(userID);
    try {
        let status,
            data = await getUserWithID(userID);
        res.json({ data });
        if (status == 200) {
            res.sendStatus(200);
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

// Get user by their email then verify the password
user.get("/api/login", async (req: Request, res: Response) => {
    let user;
    try {
        let email: string = req.query.email as string;
        let pwd: string = req.query.password as string;
        const userArr: User = await getUserWithEmail(email).then();

        const status = userArr[0];

        if (status == 404) {
            res.status(404).json("User not found");
            return;
        } else {
            const { password, ...user } = await userArr[1].data;
            let match = await compare(pwd, password);
            const token = generateAccessToken(user);
            if (match) {
                res.cookie("FrontendUser", token, {
                    maxAge: 28800000,
                    path: "/",
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                res.status(200).json(user);
            } else {
                res.status(401).json(
                    "A user with such password email config does not exist"
                );
            }
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
    return user;
});
user.post("/api/session", [verifyJWT], async (req: Request, res: Response) => {
    try {
        if (hasUser(req)) {
            return res.status(200).json(req.user);
        } else {
            throw { msg: "no user" };
        }
    } catch (err: any) {
        return res.status(400).json({ errType: err.name, errMsg: err.message });
    }
});
user.get("/accountFile/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    let type: string = req.query.type as string;
    try {
        const accountFile: any = await getAccountFile(userID, type);
        const status: number = accountFile[0];
        console.log(userID);
        console.log(type);
        if (status == 200) {
            res.status(200).json(accountFile[1]);
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

user.post("/removeAccountFile/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    let type: string = req.query.type as string;
    try {
        let success: any = await removeAccountFile(userID, type);
        let status: number = success[0];
        if (status == 200) {
            res.status(200);
            res.json(success[1]);
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});

user.post("/api/register", async (req: Request, res: Response) => {
    try {
        const registeredUser: User = await registerUser(req.body);
        const status: number = registeredUser[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                registeredUser,
            });
        } else if (status !== 404) {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
user.post("/api/logout", async (req: Request, res: Response) => {
    try {
        res.cookie("FrontendUser", "", {
            expires: new Date(Date.now()),
            path: "/",
            httpOnly: true,
        });
        console.log(req.cookies.FrontendUser);
        return res.status(200).json(true);
    } catch (err: any) {
        return res.status(400).json({ errType: err.Name, errMsg: err.message });
    }
});
user.post("/delete/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    //console.log(userID);
    try {
        let status,
            data = await deleteUser(userID);
        res.json({ data });
        if (status == 200) {
            res.sendStatus(200);
        } else if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
user.post(
    "/uploadAccountFile/:userID",
    upload.single("file"),
    async (req: Request, res: Response) => {
        let userID = req.params.userID;
        let type: string = req.query.type as string;
        try {
            let status, data: any;
            if (hasFile(req)) {
                data = await uploadAccountFile(userID, type, req.file);
            }
            status = data[0];
            if (status == 200) {
                res.sendStatus(200);
            } else if (status == 404) {
                res.sendStatus(404);
            }
        } catch (err: any) {
            res.status(400);
            res.json({ errType: err.Name, errMsg: err.message });
        }
    }
);

user.post("/edit/:email", async (req: Request, res: Response) => {
    try {
        let email: string = req.params.email;
        let newProfile: any = await req.body;
        //Find the account of the current email address
        const userArr: User = await getUserWithEmail(email).then();
        const status = userArr[0];
        if (status == 404) {
            res.status(404).json("User not found");
        } else {
            const oldProfile = await userArr[1].data;
            const ID = await userArr[1].id;
            const newSettings: User = await editAccount(
                oldProfile,
                newProfile,
                ID
            ).then();
            const { password, ...newUser } = await newSettings[1];
            res.status(200).json(newUser);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});

//***********User invitation routes section***********************
user.get("/api/sendInvite", async (req: Request, res: Response) => {
    let receiverEmail = req.query.receiverEmail as string;
    let senderEmail = req.query.senderEmail as string;

    let data = await sendInvite(receiverEmail, senderEmail);

    if (data[0] == 200) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
user.get("/api/follow", async (req: Request, res: Response) => {
    let receiverID = (await req.query.receiverID) as string;
    let senderID = (await req.query.senderID) as string;

    let data = await followCompany(senderID, receiverID);

    if (data[0] == 200) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
user.get("/api/unFollow", async (req: Request, res: Response) => {
    console.log("HI IM ROKI");
    let receiverID = (await req.query.receiverID) as string;
    let senderID = (await req.query.senderID) as string;

    let data = await unFollowCompany(senderID, receiverID);

    if (data[0] == 200) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
user.get("/api/manageInvite", async (req: Request, res: Response) => {
    let invitedEmail = req.query.invitedEmail as string;
    let senderEmail = req.query.senderEmail as string;
    let isAccept = req.query.isAccept as any;

    if (isAccept == "true") {
        isAccept = true;
    } else {
        isAccept = false;
    }

    let data = await manageInvite(
        senderEmail,
        invitedEmail,
        isAccept as boolean
    );

    if (data[0] == 200) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

user.get("/api/getPendingInvitations", async (req: Request, res: Response) => {
    let userEmail = req.query.userEmail as string;

    let data = await getInvitationsOrContacts(userEmail, false);

    if (data[0] == 200) {
        res.status(200).json(data);
    } else {
        res.sendStatus(404);
    }
});

user.get("/api/getContacts", async (req: Request, res: Response) => {
    let userEmail = req.query.userEmail as string;

    let data = await getInvitationsOrContacts(userEmail, true);

    if (data[0] == 200) {
        res.status(200);
        res.status(200).json(data);
    } else {
        res.sendStatus(404);
    }
});

//****************End User invitation route section *************//

//****************Start Job Posting route ********************//
user.post("/api/posting/:email", async (req: Request, res: Response) => {
    let email: string = req.params.email;
    let location: string = req.body.location.toLowerCase();
    let position: string = req.body.position.toLowerCase();
    let salary: string = req.body.salary;
    let company: string = req.body.company;
    let description: string = req.body.description;
    let remote: boolean = req.body.remote;
    let contract: boolean = req.body.contract;
    let duration: any = null;
    if (req.body.duration) {
        duration = req.body.duration;
    }
    let type: any = null;
    if (req.body.type) {
        type = req.body.type;
    }
    console.log(email);
    const userArr: User = await getUserWithEmail(email).then();
    console.log(userArr);
    const status = userArr[0];
    if (status == 404) {
        res.status(404).json({ errMsg: "That user doesnt exists" });
    } else if (!userArr[1].data.isCompany) {
        console.log(userArr[1].isCompany);
        console.log("That user is not even a company");
        res.status(400);
        res.json({ errMsg: "That user is not a company" });
    } else {
        try {
            let data: any = await createJobPosting(
                email,
                location,
                position,
                salary,
                company,
                description,
                remote,
                contract,
                duration,
                type,
                userArr[1].data.userID
            );

            if (data[0] == 200) {
                res.status(data[0]);
                res.json(data[1]);
            } else {
                res.status(data[0]);
                res.json(data[1]);
            }
        } catch (err: any) {
            res.status(400);
            res.json({ errType: err.name, errMsg: err.message });
        }
    }
});
//Exporting the user as a module

//****************End User invitation route section ***********88

user.get("/api/search", async (req: Request, res: Response) => {
    var filter: any = {};

    for (const [key, value] of Object.entries(req.query)) {
        filter[key] = value;
    }

    console.log(req.query);
    try {
        let status,
            data = await getFilteredUsersController(filter);
        res.json(data);
        res.status(200);
        if (status == 200) {
            res.sendStatus(200);
        }
        if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});
user.get("/api/searchCompanies", async (req: Request, res: Response) => {
    var filter: any = {};

    for (const [key, value] of Object.entries(req.query)) {
        filter[key] = value;
    }

    console.log(req.query);
    try {
        let status,
            data = await getFilteredCompaniesController(filter);
        res.json(data);
        res.status(200);
        if (status == 200) {
            res.sendStatus(200);
        }
        if (status == 404) {
            res.sendStatus(404);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});

//Exporting the user as a module
module.exports = user;
