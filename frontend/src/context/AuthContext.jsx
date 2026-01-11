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

  /* ===================== BOOTSTRAP SESSION ===================== */
  useEffect(() => {
    (async () => {
      try {
        const res = await authApi.getMe();
        setUser(res.data.user);
        setProfile(res.data.profile);
      } catch {
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ===================== AUTH STATE SYNC ===================== */
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          try {
            const res = await authApi.getMe();
            setUser(res.data.user);
            setProfile(res.data.profile);
          } catch {
            setUser(null);
            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  /* ===================== SIGNUP (OTP FLOW) ===================== */
  const signupSendOtp = useCallback((email, password) => {
    return authApi.signupSendOtp({ email, password });
  }, []);

  const signupVerifyOtp = useCallback(async (payload) => {
    const res = await authApi.signupVerifyOtp(payload);
    setUser(res.data.user);
    setProfile(res.data.profile);
    return res;
  }, []);

  /* ===================== LOGIN ===================== */
  const login = useCallback(async (payload) => {
    const res = await authApi.login(payload);
    setUser(res.data.user);
    setProfile(res.data.profile);
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
