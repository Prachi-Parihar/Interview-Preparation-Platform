import express from "express"
import { GoogleAuth, Logout } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/login", GoogleAuth);

authRouter.get("/logout", Logout);

export default authRouter