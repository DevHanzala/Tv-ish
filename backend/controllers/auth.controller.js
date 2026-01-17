import { asyncHandler } from "../utils/asyncHandler.js";
import { success, error } from "../utils/apiResponse.js";
import * as authService from "../services/authServices.js";

// Endpoint to send OTP for signup 
export const signupSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body; await authService.signupSendOtp(email);
  return success(res, "OTP sent successfully");
});

// Endpoint to verify OTP and complete signup
export const signupVerifyOtp = asyncHandler(async (req, res) => {
  const data = await authService.signupVerifyOtp(req.body);
  return success(res, "Signup completed", data);
});

// Endpoint to login user
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const data = await authService.login(email, password);
  return success(res, "Login successful", data);
});

// endpoint to send OTP for password recovery
export const forgotPasswordSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.forgotPasswordSendOtp(email);
  return success(res, "Password reset OTP sent");
});

// Endpoint to verify OTP for password recovery
export const forgotPasswordVerifyOtp = asyncHandler(async (req, res) => {
  const { email, token } = req.body;
  const data = await authService.forgotPasswordVerifyOtp(email, token);
  return success(res, "OTP verified successfully", data);
});

// Endpoint to reset password
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const result = await authService.resetPassword(newPassword);
  return success(res, "Password updated successfully", result);
});
