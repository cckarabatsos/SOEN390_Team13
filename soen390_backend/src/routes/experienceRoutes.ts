import express, { Request, Response } from "express";
import { } from "../controllers/experienceControllers";
import { Experience } from "../models/Experience";
const experience = express.Router();
experience.use(express.json());


module.exports = experience;