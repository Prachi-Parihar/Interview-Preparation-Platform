import "dotenv/config";
import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { isAuth } from "./middleware/isAuth.js";
import { getCurrentUser } from "./controllers/userController.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const authProxy = proxy(process.env.AUTH_SERVICE_URL);

app.get("/", (req, res) => {
  res.send("Gateway server is running");
});

app.use("/api/auth", authProxy);

app.use(
  "/api/resume",
  isAuth,
  proxyWithHeaders(process.env.RESUME_SERVICE_URL)
);

app.use(
  "/api/interview",
  isAuth,
  proxyWithHeaders(process.env.INTERVIEW_SERVICE_URL)
);

app.use(
  "/api/roadmap",
  isAuth,
  proxyWithHeaders(process.env.ROADMAP_SERVICE_URL)
);

app.get("/api/me", isAuth, getCurrentUser);

app.listen(PORT, () => {
  console.log(`Gateway server is running on port ${PORT}`);
});
