import {supabase} from "../config/supabaseClient.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { success, error } from "../utils/apiResponse.js";

/* ======================================================
   SIGNUP – SEND OTP
====================================================== */
export const signupSendOtp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
console.log("SIGNUP SEND OTP REQUEST FOR:", email);

  if (!email || !password) {
    return error(res, "Email and password are required");
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return error(res, signUpError.message);
  }

  return success(res, "OTP sent successfully");
});

/* ======================================================
   SIGNUP – VERIFY OTP
====================================================== */
export const signupVerifyOtp = asyncHandler(async (req, res) => {
  const { email, token, firstName, lastName, phone } = req.body;
  console.log("SIGNUP VERIFY OTP REQUEST FOR:", email);
  const { data, error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (verifyError) return error(res, verifyError.message);

  const userId = data.user.id;

  await supabase.from("profiles").upsert(
    {
      user_id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
    },
    { onConflict: "user_id" }
  );
console.log("VERIFY OTP:", email, token);
console.log("SESSION:", data.session);

console.log("USER PROFILE CREATED/UPDATED FOR:", userId);
  // ✅ THIS IS MANDATORY
  return success(res, "Signup completed", {
    user: data.user,
    session: data.session,
  });
});


/* ======================================================
   LOGIN
====================================================== */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return error(res, "Email and password are required");
  }

  const { data, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError) {
    return error(res, loginError.message);
  }

  return success(res, "Login successful", {
    user: data.user,
    session: data.session,
  });
});

/* ======================================================
   FORGOT PASSWORD – SEND OTP
====================================================== */
export const forgotPasswordSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return error(res, "Email is required");
  }

  const { error: resetError } =
    await supabase.auth.resetPasswordForEmail(email);

  if (resetError) {
    return error(res, resetError.message);
  }

  return success(res, "Password reset OTP sent");
});

/* ======================================================
   FORGOT PASSWORD – VERIFY OTP
====================================================== */
export const forgotPasswordVerifyOtp = asyncHandler(async (req, res) => {
  const { email, token } = req.body;

  if (!email || !token) {
    return error(res, "Email and OTP are required");
  }

  const { data, error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "recovery",
  });

  if (verifyError) {
    return error(res, verifyError.message);
  }

  return success(res, "OTP verified", {
    user: data.user,
  });
});

/* ======================================================
   RESET PASSWORD
====================================================== */
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  if (!newPassword) {
    return error(res, "New password is required");
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    return error(res, updateError.message);
  }

  return success(res, "Password updated successfully");
});
