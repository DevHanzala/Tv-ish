import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import * as profileApi from "../api/profile.api";
import { useAuth } from "../hooks/useAuth";

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===================== LOAD PROFILE ===================== */
  const loadProfile = useCallback(async () => {
    try {
      const res = await profileApi.getMyProfile();
      setProfile(res.data.data);
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadProfile();
    else {
      setProfile(null);
      setLoading(false);
    }
  }, [isAuthenticated, loadProfile]);

  /* ===================== UPDATE PROFILE ===================== */
  const updateProfile = useCallback(async (payload) => {
    const res = await profileApi.updateMyProfile(payload);
    setProfile(res.data.data);
    return res;
  }, []);

  /* ===================== EMAIL CHANGE ===================== */
const requestEmailChange = useCallback(async (email) => {
  return await profileApi.requestEmailChange(email);
}, []);

/* ===================== PASSWORD CHANGE ===================== */
const changePassword = useCallback(async (payload) => {
  return await profileApi.changePassword(payload);
}, []);

/* ===================== PHONE UPDATE ===================== */
const updatePhone = useCallback(async (phone) => {
  const res = await profileApi.updatePhone(phone);
  setProfile(res.data.data);
  return res;
}, []);


  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        updateProfile,
        refreshProfile: loadProfile,
        requestEmailChange,
        updatePhone,
        changePassword,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
