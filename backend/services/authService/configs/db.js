
import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("You successfully connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
}

export async function disconnectFromMongoDB() {
  await mongoose.disconnect();
}
