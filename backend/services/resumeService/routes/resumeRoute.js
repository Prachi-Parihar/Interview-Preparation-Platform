import express from "express";
import { upload } from "../middleware/multer.js";
import { getResume, uploadResume } from "../controllers/resumeController.js";

const resumeRouter = express.Router();

resumeRouter.post("/upload",upload.single("resume"), uploadResume);

resumeRouter.get("/get-resume", getResume);

export default resumeRouter