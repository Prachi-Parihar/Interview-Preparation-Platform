import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import roadmapRouter from "./routes/roadmap.route.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3004;

app.use("/",roadmapRouter)


app.listen(PORT, () => {
    console.log(`Roadmap Service is running on port ${PORT}`);
});