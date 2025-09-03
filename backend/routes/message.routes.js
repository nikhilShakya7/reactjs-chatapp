import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
const router = express.Router();

// POST /api/messages/send/:id
router.post("/send/:id", protectRoute, sendMessage);

export default router;
