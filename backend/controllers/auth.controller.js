import { supabase } from "../config/supabaseClient.js";
import { success, error } from "../utils/apiResponse.js";
import { createProfile } from "../models/profile.model.js";

/**
 * STEP 1: Signup (send OTP)
 * Called from SignupPage
 */
export const signupSendOtp = async (req, res) => {
  const { email, password } = req.body;

  const { error: otpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: null, // OTP only
    },
  });

  if (otpError) return error(res, otpError.message);

  return success(res, "OTP sent to email");
};

/**
 * STEP 2: Verify OTP & create profile
 * Called from SignupPage2
 */
export const signupVerifyOtp = async (req, res) => {
  const { email, token, firstName, lastName } = req.body;

  const { data, error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (verifyError) return error(res, verifyError.message);

  await createProfile({
    userId: data.user.id,
    email,
    firstName,
    lastName,
  });

  return success(res, "Signup completed", { user: data.user });
};

/**
 * Login with email & password
 * Called from LoginPage
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const { data, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError) return error(res, loginError.message);

  return success(res, "Login successful", data);
};

/**
 * Forgot password - send OTP
 * Called from ForgotPasswordPage
 */
export const forgotPasswordSendOtp = async (req, res) => {
  const { email } = req.body;

  const { error: resetError } =
    await supabase.auth.resetPasswordForEmail(email);

  if (resetError) return error(res, resetError.message);

  return success(res, "OTP sent for password reset");
};

/**
 * Verify OTP for password reset
 * Called from ForgotPasswordPage2
 */
export const forgotPasswordVerifyOtp = async (req, res) => {
  const { email, token } = req.body;

  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "recovery",
  });

  if (error) return error(res, error.message);

  return success(res, "OTP verified", {
    accessToken: data.session.access_token,
  });
};

/**
 * Reset password
 * Called from ForgotPasswordPage3
 */
export const resetPassword = async (req, res) => {
  const { accessToken, newPassword } = req.body;

  const { error: updateError } = await supabase.auth.updateUser(
    { password: newPassword },
    { accessToken }
  );

  if (updateError) return error(res, updateError.message);

  return success(res, "Password reset successful");
};
