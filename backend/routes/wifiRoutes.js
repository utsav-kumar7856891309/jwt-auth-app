// backend/routes/wifiRoutes.js
import express from "express";
import { scanWifi } from "../controllers/wifiController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/scan", protect, scanWifi);
export default router;
