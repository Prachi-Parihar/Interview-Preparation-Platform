import "dotenv/config";
import express from "express"
import { connectDB } from "./config/db.js";
import roadmapRouter from "./routes/roadmap.route.js";

connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3004;

app.use("/",roadmapRouter)


app.listen(PORT, () => {
    console.log(`Roadmap Service is running on port ${PORT}`);
});