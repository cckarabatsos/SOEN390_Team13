import express, { Request, Response } from "express";
//import { UserImportBuilder } from "firebase-admin/lib/auth/user-import-builder";

import {
  getUserWithID,
  getUserWithEmail,
  registerUser,
  deleteUser,
  comparePasswords,
  sendInvite,
  uploadAccountFile,
  manageInvite,
  getAccountFile,
  editAccount,
  getInvitationsOrContacts,
} from "../controllers/userControllers";

import { User } from "../models/User";
const multer = require('multer');
var upload = multer({ storage: multer.memoryStorage() });
const user = express.Router();
user.use(express.json());

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
      let match = await comparePasswords(pwd, password);
      if (match) {
        res.cookie("FrontendUser", {
          maxAge: 28800000,
          path: "/",
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json(user);
      } else {
        res
          .status(401)
          .json("A user with such password email config does not exist");
      }
    }
  } catch (err: any) {
    res.status(400);
    res.json({ errType: err.name, errMsg: err.message });
  }
  return user;
});
user.get("/accountfile/:userID", async (req: Request, res: Response) => {
  let userID = req.params.userID;
  let type: string = req.query.type as string;
  try {
    let status,
      data = await getAccountFile(userID, type);
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

user.post("/api/register", async (req: Request, res: Response) => {
  try {
    const registeredUser: User = await registerUser(req.body);
    const status: number = registeredUser[0];
    //console.log("user registration");
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
user.post("/api/logout", async (_: Request, res: Response) => {
  try {
    res.cookie("FrontendUser", "", {
      expires: new Date(Date.now()),
      path: "/",
      httpOnly: true,
    });
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
user.post("/uploadResume/:userID", upload.single('file'), async (req: Request, res: Response) => {
  let userID = req.params.userID;
  if (req.file !== undefined)
    console.log(req.file.mimetype);
  else
    console.log("File undefined");

  try {
    let status, data = await uploadAccountFile(userID, req.file);

    if (status == 200) {
      res.status(200);
      res.json({
        Response: "Successful file storage",
        data
      });
    } else if (status == 404) {
      res.sendStatus(404);
    }
  } catch (err: any) {
    res.status(400);
    res.json({ errType: err.Name, errMsg: err.message });
  }
});
user.post("/uploadResume/:userID", upload.single('file'), async (req: Request, res: Response) => {
  let userID = req.params.userID;
  if (req.file !== undefined)
    console.log(req.file.mimetype);
  else
    console.log("File undefined");

  try {
    let status, data = await uploadAccountFile(userID, req.file);

    if (status == 200) {
      res.status(200);
      res.json({
        Response: "Successful file storage",
        data
      });
    } else if (status == 404) {
      res.sendStatus(404);
    }
  } catch (err: any) {
    res.status(400);
    res.json({ errType: err.Name, errMsg: err.message });
  }
});
user.post("/edit/:email", async (req: Request, res: Response) => {
  try {
    let email: string = req.params.email;
    let newProfile: any = await req.body;
    //Find the account of the current email address
    const userArr: User = await getUserWithEmail(email).then();
    const status = userArr[0];
    if (status == 404) {
      res.status(404).json("ERROR");
    } else {
      const oldProfile = await userArr[1].data;
      const ID = await userArr[1].id;
      const newSettings: User = await editAccount(
        oldProfile,
        newProfile,
        ID
      ).then();
      const { password, ...newUser } = await newSettings[1];
      console.log(newSettings);
      res.status(200).json(newUser);
    }
  } catch (err: any) {
    res.status(400);
    res.json({ errType: err.name, errMsg: err.message });
  }
});
//Exporting the user as a module
module.exports = user;

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

user.get("/api/manageInvite", async (req: Request, res: Response) => {
  let invitedEmail = req.query.invitedEmail as string;
  let senderEmail = req.query.senderEmail as string;
  let isAccept = req.query.isAccept as any;

  if (isAccept == "true") {
    isAccept = true;
  } else {
    isAccept = false;
  }

  let data = await manageInvite(senderEmail, invitedEmail, isAccept as boolean);

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
    res.status(200);
    res.json({
      Response: "Success",
      data,
    });
  } else {
    res.sendStatus(404);
  }
});

user.get("/api/getContacts", async (req: Request, res: Response) => {
  let userEmail = req.query.userEmail as string;

  let data = await getInvitationsOrContacts(userEmail, true);

  if (data[0] == 200) {
    res.status(200);
    res.json({
      Response: "Success",
      data,
    });
  } else {
    res.sendStatus(404);
  }
});

//****************End User invitation route section ***********88
