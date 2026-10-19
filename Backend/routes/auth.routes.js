import express from "express";
import {
  logout,
  signin,
  signup,
  verifyAccount,
  forgotPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/verify-account", verifyAccount);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/check-auth", verifyToken, checkAuth);

export default router;

