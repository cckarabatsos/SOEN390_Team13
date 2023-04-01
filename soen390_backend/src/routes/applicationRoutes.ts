/**
 * Routes for Application entity of the database
 */
import express, { Request, Response } from "express";
import {
  createApplication,
  deleteApplication,
  editApplication,
  getApplicationHistory,
  getApplications,
  getLastApplication,
} from "../controllers/applicationControllers";
import { Application } from "../models/Application";
const application = express.Router();
application.use(express.json());

/**
 * Route that stores a new application to database
 */
application.post("/:ownerID", async (req: Request, res: Response) => {
  let ownerID: string = req.params.ownerID;
  let email: string = req.body.email;
  let firstName: string = req.body.firstName;
  let lastName: string = req.body.lastName;
  let phone: string = req.body.phone;
  let address: string = req.body.address;
  let address2: string = req.body.address2;
  let city: string = req.body.city;
  let area: string = req.body.area;
  let province: string = req.body.province;
  let school: string = req.body.school;
  let schoolCountry: string = req.body.schoolCountry;
  let schoolDegree: string = req.body.schoolDegree;
  let schoolEnd: Date = new Date(req.body.schoolEnd);
  let schoolMajor: string = req.body.schoolMajor;
  let timestamp: string = req.body.timestamp;
  let postingID: string = req.body.postingID;
  let attachResume: boolean = req.body.attachResume;
  let attachCoverLetter: boolean = req.body.attachCoverLetter;
  let experience: string[] = req.body.experience;
  try {
    const application: Application = await createApplication(
      email,
      firstName,
      lastName,
      phone,
      address,
      address2,
      city,
      area,
      province,
      school,
      schoolCountry,
      schoolDegree,
      schoolEnd,
      schoolMajor,
      timestamp,
      postingID,
      attachResume,
      attachCoverLetter,
      experience,
      ownerID
    );
    const status: number = application[0];
    if (status == 200) {
      res.status(200);
      res.json({
        Response: "Success",
        application,
      });
    } else if (status == 400) {
      res.status(400);
      res.json({
        application,
      });
    } else if (status == 404) {
      res.sendStatus(status);
    }
  } catch (err: any) {
    res.status(400);
    res.json({ errType: err.Name, errMsg: err.message });
  }
});

/**
 * Route that gets the last application of a user
 */
application.get(
  "/getLastApplication/:userID",
  async (req: Request, res: Response) => {
    let userID: string = req.params.userID;
    try {
      const application: Application = await getLastApplication(userID);
      const status: number = application[0];
      if (status == 200) {
        res.status(200);
        res.json(application[1]);
      }
      if (status == 404) {
        res.sendStatus(404);
      }
    } catch (err: any) {
      res.status(400);
      res.json({ errType: err.name, errMsg: err.message });
    }
  }
);

/**
 * Route that retrieves all applications that were sent for a specific job posting
 */
application.get(
  "/getApplications/:userID",
  async (req: Request, res: Response) => {
    let userID: string = req.params.userID;
    let postingID: string = req.query.postingID as string;
    try {
      const application: Application = await getApplications(userID, postingID);
      const status: number = application[0];
      if (status == 200) {
        res.status(200);
        res.json(application[1]);
      }
      if (status == 404) {
        res.sendStatus(404);
      }
    } catch (err: any) {
      res.status(400);
      res.json({ errType: err.name, errMsg: err.message });
    }
  }
);

/**
 * Route that gets the application history of a user
 */
application.get(
  "/getApplicationHistory/:userID",
  async (req: Request, res: Response) => {
    let userID = req.params.userID;
    try {
      const application: Application = await getApplicationHistory(userID);
      const status: number = application[0];
      if (status == 200) {
        res.status(200);
        res.json(application[1]);
      }
      if (status == 404) {
        res.sendStatus(404);
      }
    } catch (err: any) {
      res.status(400);
      res.json({ errType: err.name, errMsg: err.message });
    }
  }
);

/**
 * Route that removes an application from database
 */
application.post("/remove/:userID", async (req: Request, res: Response) => {
  let userID: string = req.params.userID;
  let postingID = req.query.postingID as string;
  try {
    const application: Application = await deleteApplication(userID, postingID);
    const status: number = application[0];
    if (status == 200) {
      res.status(200);
      res.json(application[1]);
    }
    if (status == 404) {
      res.sendStatus(404);
    }
  } catch (err: any) {
    res.status(400);
    res.json({ errType: err.name, errMsg: err.message });
  }
});

/**
 * Route that updates an application's status in database
 */
application.post(
  "/updateStatus/:applicationID",
  async (req: Request, res: Response) => {
    let applicationID: string = req.params.applicationID;
    let newStatus = req.query.status as string;
    try {
      const application: Application = await editApplication(
        applicationID,
        newStatus
      );
      const status: number = application[0];
      if (status == 200) {
        res.status(200);
        res.json(application[1]);
      }
      if (status == 404) {
        res.sendStatus(404);
      }
    } catch (err: any) {
      res.status(400);
      res.json({ errType: err.name, errMsg: err.message });
    }
  }
);
export default application;
