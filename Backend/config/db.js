import mongoose from "mongoose";
import dns from "node:dns";

export const connectDB = async () => {
  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);

    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern_pro";
    await mongoose.connect(mongoUri);
    console.log("connected to DB here me ");
  } catch (error) {
    console.error("Error connecting to DB:", error);
    throw error;
  }
};
