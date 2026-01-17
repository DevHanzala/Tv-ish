// Service: send OTP for signup
export const signupSendOtp = async (email) => {

    // Validate email
    if (!email) {
        throw new Error("Email is required");
    }

    const { data: existingProfile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("email", email)
        .single();

    if (existingProfile) {
        throw new Error("Email already registered. Please login.");
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true },
    });

    if (error) {
        throw error;
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
        throw new Error("All fields are required to complete signup");
    }

    // Verify OTP (authenticates user)
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
    });

    if (verifyError) {
        throw new Error(verifyError.message);
    }

    if (!data?.user || !data?.session) {
        throw new Error("OTP verification failed");
    }

    const userId = data.user.id;

    // Check if profile already exists (CRITICAL)
    const { data: existingProfile } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("user_id", userId)
        .single();

    if (existingProfile) {
        throw new Error("User already registered. Please login.");
    }

    // Set password
    const { error: passwordError } = await supabase.auth.updateUser({
        password,
    });

    if (passwordError) {
        throw new Error(passwordError.message);
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
        throw new Error("Profile creation failed");
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
        throw new Error("Email and password are required");
    }

    // Authenticate
    const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (loginError) {
        throw new Error(loginError.message);
    }

    const userId = data.user.id;

    // Fetch profile (MANDATORY)
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (profileError || !profile) {
        throw new Error(
            "Profile not found. Please complete signup or contact support."
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
        throw new Error("Email is required");
    }

    // Send reset OTP
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/resetpassword_page`,
    });

    if (error) {
        throw new Error(error.message);
    }
    return true;
};

// Service: Verify forgot password OTP
export const forgotPasswordVerifyOtp = async (email, token) => {

    //  Validate input
    if (!email || !token) {
        throw new Error("Email and OTP are required");
    }

    // verify OTP
    const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "recovery", // Recovery OTP
    });

    if (verifyError) {
        throw new Error(verifyError.message);
    }

    return {
        user: data.user,
        session: data.session, // Required for frontend to set session
    };
};

//  Service: reset user password
export const resetPassword = async (newPassword) => {
    //validate input
    if (!newPassword) throw new Error("New password is required");

    //update password
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });

    if (updateError) {
        throw new Error(updateError.message);
    }
    return { updated: true };
};

