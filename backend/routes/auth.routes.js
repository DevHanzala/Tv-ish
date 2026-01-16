import express from "express";
import {
  signupSendOtp,
  signupVerifyOtp,
  login,
  forgotPasswordSendOtp,
  forgotPasswordVerifyOtp,
  resetPassword,
  logout
} from "../controllers/auth.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup/send-otp", asyncHandler(signupSendOtp));
router.post("/signup/verify-otp", asyncHandler(signupVerifyOtp));
router.post("/login", asyncHandler(login));

router.post("/forgot-password/send-otp", asyncHandler(forgotPasswordSendOtp));
router.post("/forgot-password/verify-otp", asyncHandler(forgotPasswordVerifyOtp));
router.post("/forgot-password/reset", asyncHandler(resetPassword));
router.post("/logout", requireAuth, asyncHandler(logout));

export default router;
