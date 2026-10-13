import "dotenv/config";
import express from "express"
import { connectDB } from "./configs/db.js"
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

await connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use("/", authRouter);

app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});