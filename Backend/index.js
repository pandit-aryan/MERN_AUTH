import express from "express";
import cors from "cors";
import cookieParser  from "cookie-parser";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials:true,
    }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello from backend");
});

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((error) => {
    console.error("Backend startup failed because MongoDB is unavailable:", error.message);
    process.exitCode = 1;
});
