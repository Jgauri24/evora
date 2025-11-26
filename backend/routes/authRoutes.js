import express from "express";
import { signup, login, setRole } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/set-role", authMiddleware, setRole);

export default router;
