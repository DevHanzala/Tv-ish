import {supabase} from "../config/supabaseClient.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { success, error } from "../utils/apiResponse.js";

/* ======================================================
   SIGNUP / LOGIN – SEND OTP (RELIABLE)
====================================================== */
export const signupSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log("SIGNUP OTP REQUEST FOR:", email);

  if (!email) {
    return error(res, "Email is required");
  }

  const { data, error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // creates user if not exists
    },
  });

  if (otpError) {
    console.error("SUPABASE OTP ERROR:", otpError);
    return error(res, otpError.message);
  }

  return success(res, "OTP sent successfully to email");
});

/* ======================================================
   SIGNUP – VERIFY OTP + SET PASSWORD
====================================================== */
export const signupVerifyOtp = asyncHandler(async (req, res) => {
  const { email, token, password, firstName, lastName, phone } = req.body;

  console.log("SIGNUP VERIFY OTP REQUEST FOR:", email);

  if (!email || !token || !password) {
    return error(res, "Email, OTP, and password are required");
  }

  // Verify OTP (authenticates user)
  const { data, error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (verifyError) {
    return error(res, verifyError.message);
  }

  if (!data?.session || !data?.user) {
    return error(res, "OTP verification failed");
  }

  // Set password (now user is authenticated)
  const { error: passwordError } = await supabase.auth.updateUser({
    password,
  });

  if (passwordError) {
    return error(res, passwordError.message);
  }

  const userId = data.user.id;

  // Create / update profile
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      user_id: userId,
      email,
      first_name: firstName || null,
      last_name: lastName || null,
      phone: phone || null,
    },
    { onConflict: "user_id" }
  );

  if (profileError) {
    return error(res, "Profile creation failed");
  }

  return success(res, "Signup completed", {
    user: data.user,
    session: data.session,
    profile:{ user_id: userId, email, first_name: firstName || null, last_name: lastName || null, phone: phone || null}
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

  console.log("FORGOT PASSWORD OTP REQUEST FOR:", email);

  if (!email) {
    return error(res, "Email is required");
  }

  const { error: resetError } =
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/resetpassword_page`,
    });

  console.error("RESET PASSWORD OTP ERROR:", resetError);

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

  console.log("FORGOT PASSWORD VERIFY OTP REQUEST FOR:", email);
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
  session: data.session, // ← REQUIRED
});
});

/* ======================================================
   RESET PASSWORD
====================================================== */
export const resetPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
console.log("RESET PASSWORD ATTEMPT – AUTH CONTEXT VALID");
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

/* ======================================================
   LOGOUT
====================================================== */
export const logout = asyncHandler(async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  
  if (!token) {
    return error(res, "No token provided");
  }

  const { error: signOutError } =
    await supabase.auth.admin.signOut(token);

  if (signOutError) {
    return error(res, signOutError.message);
  }

  return success(res, "Refresh tokens revoked");
});
