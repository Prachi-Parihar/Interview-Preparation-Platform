import "dotenv/config";
import express from "express"
import { connectDB } from "./config/db.js"
import resumeRouter from "./routes/resumeRoute.js";

await connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6002;

app.use("/", resumeRouter);


app.listen(PORT, () => {
    console.log(`Resume Service is running on port ${PORT}`);
});