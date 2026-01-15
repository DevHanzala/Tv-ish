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
  const { data: listener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      console.log("🔐 AUTH EVENT:", event);

      // ⛔ Ignore INITIAL_SESSION
      if (event === "INITIAL_SESSION") return;

      if (!session) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      try {
        // ✅ FORCE session hydration
        const {
          data: { session: confirmedSession },
        } = await supabase.auth.getSession();

        console.log("🧾 CONFIRMED SESSION:", confirmedSession?.access_token);

        if (!confirmedSession?.access_token) {
          throw new Error("Session not ready yet");
        }

        console.log("🟡 AUTH EVENT → getMe()");
        const res = await authApi.getMe();

        const { user, profile } = res.data.data;
        setUser(user);
        setProfile(profile);
      } catch (err) {
        console.error("🔴 getMe FAILED:", err.message);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    }
  );

  return () => listener.subscription.unsubscribe();
}, []);

  /* ===================== SIGNUP (OTP FLOW) ===================== */
  const signupSendOtp = useCallback((email, password) => {
    console.log("SEND OTP TO:", email);
    return authApi.signupSendOtp({ email, password });
  }, []);

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

  // setUser(user);
  // setProfile(profile);
  // setLoading(false);

  return res;
}, []);


  /* ===================== LOGIN ===================== */
  const login = useCallback(async (payload) => {
    const res = await authApi.login(payload);
    const { user, profile } = res.data.data;

setUser(user);
setProfile(profile);
    setLoading(false);
    console.log("🧩 PARSED USER:", user);
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
  const forgotPasswordSendOtp = useCallback((email) => {
    return authApi.forgotPasswordSendOtp(email);
  }, []);

  const forgotPasswordVerifyOtp = useCallback((payload) => {
    return authApi.forgotPasswordVerifyOtp(payload);
  }, []);

  const resetPassword = useCallback((payload) => {
    return authApi.resetPassword(payload);
  }, []);

  /* ===================== LOGOUT ===================== */
  const logout = useCallback(async () => {
    await authApi.logout();
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
    console.log("🧩 PARSED USER:", user);
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
