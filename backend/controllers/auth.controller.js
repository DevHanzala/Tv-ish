import {supabase} from "../config/supabaseClient.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { success, error } from "../utils/apiResponse.js";

export const signupSendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // return error if email is missing
  if (!email) {
    return error(res, "Email is required");
  }

  // check if email already exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("email", email)
    .single();

  if (existingProfile) {
    return error(res, "Email already registered. Please login.");
  }

  // Send OTP for signup
  const { error: otpError } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  // return error if otp sending fails
  if (otpError) {
    return error(res, otpError.message);
  }

  return success(res, "OTP sent successfully");
});


/* ======================================================
   SIGNUP – VERIFY OTP + SET PASSWORD
====================================================== */
export const signupVerifyOtp = asyncHandler(async (req, res) => {
  const { email, token, password, firstName, lastName, phone } = req.body;

  console.log("SIGNUP VERIFY OTP REQUEST FOR:", email);

  // Validate input
  if (!email || !token || !password || !firstName || !lastName || !phone) {
    return error(res, "FirstName, LastName, Email, Phone, OTP, and password are required");
  }

  // Verify OTP (authenticates user)
  const { data, error: verifyError } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  // Handle verification errors
  if (verifyError) {
    return error(res, verifyError.message);
  }

  // Ensure user and session are returned
  if (!data?.session || !data?.user) {
    return error(res, "OTP verification failed");
  }

  // Set password (now user is authenticated)
  const { error: passwordError } = await supabase.auth.updateUser({
    password,
  });

  // Handle password setting errors
  if (passwordError) {
    return error(res, passwordError.message);
  }

  const userId = data.user.id;

  // Create / update profile
  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      user_id: userId,
      email,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
    },
    { onConflict: "user_id" }
  );

  if (profileError) {
    return error(res, "Profile creation failed");
  }

  return success(res, "Signup completed", {
    user: data.user,
    session: data.session,
    profile:{ user_id: userId, email, first_name: firstName , last_name: lastName, phone: phone}
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
