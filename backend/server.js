import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import wifiRoutes from "./routes/wifiRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/wifi", wifiRoutes);
app.listen(process.env.PORT, () => console.log(` Server running on port ${process.env.PORT}`));
