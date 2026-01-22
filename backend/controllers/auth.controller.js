import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/apiResponse.js";
import * as authService from "../services/authServices.js";

// @route POST /api/auth/signup/send-otp
export const signupSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.signupSendOtp(email);
  return success(res, "OTP sent successfully");
});

// @route POST /api/auth/signup/verify-otp
export const signupVerifyOtp = asyncHandler(async (req, res) => {
  const data = await authService.signupVerifyOtp(req.body);
  return success(res, "Signup completed", data);
});

// @route POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.login(email, password);
  return success(res, "Login successful", data);
});

// @route POST /api/auth/forgot-password/send-otp
export const forgotPasswordSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.forgotPasswordSendOtp(email);
  return success(res, "Password reset OTP sent");
});

// @route POST /api/auth/forgot-password/verify-otp
export const forgotPasswordVerifyOtp = asyncHandler(async (req, res) => {
  const { email, token } = req.body;
  const data = await authService.forgotPasswordVerifyOtp(email, token);
  return success(res, "OTP verified successfully", data);
});

// @route POST /api/auth/forgot-password/reset
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const result = await authService.resetPassword(newPassword);
  return success(res, "Password updated successfully", result);
});
