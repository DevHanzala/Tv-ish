import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import * as authApi from "../api/auth.api";
import { supabase } from "../config/supabase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /* ===================== STATE ===================== */
  const [user, setUser] = useState(null);        // auth identity
  const [profile, setProfile] = useState(null);  // profile / channel data
  const [loading, setLoading] = useState(true);
  


  /* ===================== AUTH STATE SYNC ===================== */



useEffect(() => {
  console.log("🧠 AUTH CONTEXT STATE:", { user, loading });
}, [user, loading]);



// Fetch profile when user changes  
useEffect(() => {
  if (!user) {
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await authApi.getMe();
      setProfile(res.data.data.profile || null);
    } catch {
      setProfile(null);
    }
  };

  fetchProfile();
}, [user]);


// Listen to auth state changes
useEffect(() => {
  const { data: subscription } = supabase.auth.onAuthStateChange(
    (event, session) => {

      if (!session) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setUser(session.user);
      setLoading(false);

      // ✅ CLEAN OAuth TOKENS FROM URL (CRITICAL)
      if (
        event === "SIGNED_IN" &&
        window.location.hash.includes("access_token")
      ) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    }
  );

  return () => subscription.subscription.unsubscribe();
}, []);


  /* ===================== SIGNUP (OTP FLOW) ===================== */

  // Send OTP
  const signupSendOtp = useCallback((email, password) => {
    return authApi.signupSendOtp({ email, password });
  }, []);

 // Verify OTP + set password 
const signupVerifyOtp = useCallback(async (payload) => {
  const res = await authApi.signupVerifyOtp(payload);

  const { session, user, profile } = res.data.data;
  
  if (!session?.access_token || !session?.refresh_token) {
    throw new Error("Session missing after OTP verification");
  }

  // 🔑 CRITICAL
  await supabase.auth.setSession({
    access_token: session.access_token,
    refresh_token: session.refresh_token,
  });

  return res;
}, []);


  /* ===================== LOGIN ===================== */
  const login = useCallback(async (payload) => {
  const res = await authApi.login(payload);
  const { user, session, profile } = res.data.data;

  if (session?.access_token && session?.refresh_token) {
    // Set the session in the frontend Supabase client
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });
  }

  // Update state
  setUser(user);
  setProfile(profile || null);
  setLoading(false);
  return res;
}, []);


  /* ===================== SOCIAL LOGIN ===================== */
  const socialLogin = useCallback(async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) throw error;
  }, []);

  /* ===================== FORGOT / RESET PASSWORD ===================== */

  // Send OTP
  const forgotPasswordSendOtp = useCallback((email) => {
    return authApi.forgotPasswordSendOtp(email);
  }, []);

  // Verify OTP
  const forgotPasswordVerifyOtp = useCallback((payload) => {
    return authApi.forgotPasswordVerifyOtp(payload);
  }, []);

  // Reset Password
  const resetPassword = useCallback((payload) => {
    return authApi.resetPassword(payload);
  }, []);

  /* ===================== LOGOUT ===================== */
  const logout = useCallback(async () => {
    await supabase.auth.signOut(); 
    setUser(null);
    setProfile(null); 
  }, []);



  // ====================== REFRESH PROFILE =====================?

  const refreshProfile = useCallback(async () => {
    const res = await authApi.getMe();
 const { user, profile } = res.data.data;

setUser(user);
setProfile(profile);

    setLoading(false);
  }, []);


  /* ===================== CONTEXT VALUE ===================== */
  return (
    <AuthContext.Provider
      value={{
        /* state */
        user,
        profile,
        loading,
        isAuthenticated: !!user,

        /* signup */
        signupSendOtp,
        signupVerifyOtp,

        /* login */
        login,
        socialLogin,

        /* password recovery */
        forgotPasswordSendOtp,
        forgotPasswordVerifyOtp,
        resetPassword,

        /* logout */
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
