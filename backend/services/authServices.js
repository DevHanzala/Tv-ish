import { HttpError } from "../exception/HttpError";

// Service: send OTP for signup
export const signupSendOtp = async (email) => {

    // Validate email
    if (!email) {
        throw new HttpError("Email is required", 400);
    }

    const { data: existingProfile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", email)
        .single();

    if (existingProfile) {
        throw new HttpError("Email already registered. Please login.", 409);
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
    });

    if (error) {
        throw new HttpError(error.message, 500);
    }

    return true;
};

// Service: verify OTP and complete signup
export const signupVerifyOtp = async ({
    email,
    token,
    password,
    firstName,
    lastName,
    phone,
}) => {

    // validate input fields
    if (!email || !token || !password || !firstName || !lastName || !phone) {
        throw new HttpError("All fields are required to complete signup", 400);
    }

    // Verify OTP (authenticates user)
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
    });

    if (verifyError) {
        throw new HttpError(verifyError.message, 400);
    }

    if (!data?.user || !data?.session) {
        throw new HttpError("OTP verification failed", 400);
    }

    const userId = data.user.id;

    // Check if profile already exists (CRITICAL)
    const { data: existingProfile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", userId)
        .single();

    if (existingProfile) {
        throw new HttpError("User already registered. Please login.", 409);
    }

    // Set password
    const { error: passwordError } = await supabase.auth.updateUser({
        password,
    });

    if (passwordError) {
        throw new HttpError(passwordError.message, 400);
    }

    // Create profile 
    const { error: profileError } = await supabase.from("profiles").insert({
        user_id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        phone,
    });

    if (profileError) {
        throw new HttpError("Profile creation failed", 500);
    }

    return {
        user: data.user,
        session: data.session,
        profile: {
            user_id: userId,
            email,
            first_name: firstName,
            last_name: lastName,
            phone,
        },
    };
};

// Service: login user
export const login = async (email, password) => {

    // Validate email and password
    if (!email || !password) {
        throw new HttpError("Email and password are required", 400);
    }

    // Authenticate
    const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (loginError) {
        throw new HttpError(loginError.message, 401);
    }

    const userId = data.user.id;

    // Fetch profile (MANDATORY)
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (profileError || !profile) {
        throw new HttpError(
            "Profile not found. Please complete signup or contact support.",
            404
        );
    }

    return {
        user: data.user,
        session: data.session,
        profile,
    };
};

// Service:  send OTP for password recovery
export const forgotPasswordSendOtp = async (email) => {
    // Validate input
    if (!email) {
        throw new HttpError("Email is required", 400);
    }

    // Send reset OTP
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/resetpassword_page`,
    });

    if (error) {
        throw new HttpError(error.message, 500);
    }
    return true;
};

// Service: Verify forgot password OTP
export const forgotPasswordVerifyOtp = async (email, token) => {

    //  Validate input
    if (!email || !token) {
        throw new HttpError("Email and OTP are required", 400);
    }

    // verify OTP
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "recovery", // Recovery OTP
    });

    if (verifyError) {
        throw new HttpError(verifyError.message, 400);
    }

    return {
        user: data.user,
        session: data.session, // Required for frontend to set session
    };
};

//  Service: reset user password
export const resetPassword = async (newPassword) => {
    //validate input
    if (!newPassword) throw new HttpError("New password is required", 400);

    //update password
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) throw new HttpError(updateError.message, 400);

    return { updated: true };
};

