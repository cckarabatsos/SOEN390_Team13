/**
 * Routes for User entity of the database
 */
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
    getAccountFile,
    uploadAccountFile,
    hasFile,
    removeAccountFile,
    getFilteredCompaniesController,
    followCompany,
    unFollowCompany,
    removeContact,
    GoogleRegistration,
} from "../controllers/userControllers";
import dotenv from "dotenv";
import { User } from "../models/User";
import { compare } from "bcryptjs";
import multer from "multer";

var upload = multer({ storage: multer.memoryStorage() });
const user = express.Router();
user.use(express.json());
dotenv.config();
//Get complete user by their id
user.get("/id/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    console.log(userID);
    try {
        let data: any = await getUserWithID(userID);
        res.status(data[0]);
        res.json(data[1]).end();
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

/**
 * ROute that gets specified type of account file for a user
 */
user.get("/accountFile/:userID", async (req: Request, res: Response) => {
    let userID = req.params.userID;
    let type: string = req.query.type as string;
    try {
        const accountFile: any = await getAccountFile(userID, type);
        const status: number = accountFile[0];
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

/**
 * Route that removes the specified type of account file for a user
 */
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
/**
 * Route to register on the website
 */
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
        } else if (status === 404) {
            res.status(404).send("User name cannot be empty");
        } else {
            res.sendStatus(status);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
user.post("/api/GoogleSignUp", async (req: Request, res: Response) => {
    try {
        const registeredUser: User = await GoogleRegistration(req.body);
        const status: number = registeredUser[0];
        if (status == 200) {
            res.status(200);
            res.json({
                Response: "Success",
                registeredUser,
            });
        } else if (status === 404) {
            res.status(404).send("User name cannot be empty");
        } else {
            res.sendStatus(status);
        }
    } catch (err: any) {
        console.log(err);
        res.status(400);
        res.json({ errType: err.Name, errMsg: err.message });
    }
});
/**
 * Route to logout from the website
 */
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
/**
 * Route that deletes a user with his ID
 */
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

/**
 * Route that stores specified type of account file to database
 */
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
/**
 * Route that edits a user using his email
 */
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
            const [statusCode, response] = newSettings;
            if (statusCode === 200) {
                const { password, ...newUser } = await response;
                res.status(200).json(newUser);
            } else {
                res.status(statusCode).json(response);
            }
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});
/**
 * Route to send an invite to a user
 */
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
user.get("/api/removeContact", async (req: Request, res: Response) => {
    let senderEmail = req.query.senderEmail as string;
    let removedEmail = req.query.removedEmail as string;

    let data = await removeContact(senderEmail, removedEmail);

    if (data[0] == 200) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

/**
 * Route to follow a company
 */
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
/**
 * Route to unfollow a company
 */
user.get("/api/unFollow", async (req: Request, res: Response) => {
    let receiverID = (await req.query.receiverID) as string;
    let senderID = (await req.query.senderID) as string;

    let data = await unFollowCompany(senderID, receiverID);

    if (data[0] == 200) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});
/**
 * Route to accept or decline an invite between two users
 */
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
/**
 * Route to get the pending invitations of a user
 */
user.get("/api/getPendingInvitations", async (req: Request, res: Response) => {
    let userEmail = req.query.userEmail as string;

    let data = await getInvitationsOrContacts(userEmail, false);

    if (data[0] == 200) {
        res.status(200).json(data);
    } else {
        res.sendStatus(404);
    }
});
/**
 * Route to get the contacts of a user
 */
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
/**
 * Post a jobPosting as a Company Account
 */
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
    let postingDeadline: any = null;
    if (req.body.postingDeadline) {
        postingDeadline = req.body.postingDeadline;
    }
    let provenance = "Internal";
    if (req.body.provenance) {
        provenance = req.body.provenance;
    }
    console.log(req.body.postingDeadline);
    const userArr: User = await getUserWithEmail(email).then();
    const status = userArr[0];
    if (status == 404) {
        res.status(404).json({ errMsg: "That user doesnt exists" });
    } else if (!userArr[1].data.isCompany) {
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
                postingDeadline,
                userArr[1].data.userID,
                provenance
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
/**
 * Search users with a filter
 */
user.get("/api/search", async (req: Request, res: Response) => {
    var filter: any = {};
    for (const [key, value] of Object.entries(req.query)) {
        filter[key] = value;
    }
    try {
        let status,
            data = await getFilteredUsersController(filter);
        res.json(data);
        res.status(200);
        if (status == 200) {
            res.sendStatus(200);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});
/**
 * Search companies with a filter
 */
user.get("/api/searchCompanies", async (req: Request, res: Response) => {
    var filter: any = {};
    for (const [key, value] of Object.entries(req.query)) {
        filter[key] = value;
    }
    try {
        let status,
            data = await getFilteredCompaniesController(filter);
        res.json(data);
        res.status(200);
        if (status == 200) {
            res.sendStatus(200);
        }
    } catch (err: any) {
        res.status(400);
        res.json({ errType: err.name, errMsg: err.message });
    }
});

// Route used to update all fields this is not to be used in final versions
// user.get("/updateFields", async (_: Request, res: Response) => {
//     try {
//         const batch = db.batch();
//         const usersRef = db.collection("users");
//         const usersQuerySnapshot = await usersRef.get();

//         usersQuerySnapshot.forEach((doc) => {
//             batch.set(
//                 doc.ref,
//                 {
//                     otherAuth: false,
//                 },
//                 { merge: true }
//             );
//         });

//         await batch.commit();
//         res.status(200).send("otherAuth field added to all users");
//     } catch (error) {
//         console.error("Error adding fields:", error);
//         res.status(500).send("Error adding fields");
//     }
// });

// Exporting the user as a module
export default user;
