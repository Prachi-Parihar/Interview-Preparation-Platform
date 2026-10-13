import "dotenv/config";
import express from "express"
import { connectDB } from "./config/db.js";
import interviewRouter from "./routes/interviewRoute.js";

connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6003;

app.use("/", interviewRouter);

app.listen(PORT, () => {
    console.log(`Interview Service is running on port ${PORT}`);
});