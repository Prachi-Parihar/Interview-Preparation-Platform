import express from "express";
import {
  getAllInterviews,
  getInterview,
  startInterview,
  submitAnswer
} from "../controllers/InterviewController.js";

const interviewRouter = express.Router();

interviewRouter.post("/start", startInterview);
interviewRouter.post("/answer", submitAnswer);
interviewRouter.get("/all", getAllInterviews);
interviewRouter.get("/:id", getInterview);

export default interviewRouter;