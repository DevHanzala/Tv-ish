import {
  createContext,
  useCallback,
} from "react";
import * as profileApi from "../api/profile.api";
import { useAuth } from "../hooks/useAuth";

export const ProfileContext = createContext(null);

export const ProfileProvider = ({ children }) => {
  const {  refreshProfile, profile } = useAuth();

// Update profile function
  const updateProfile = useCallback(async (payload) => {
    const res = await profileApi.updateMyProfile(payload);
    await refreshProfile();
    return res;
  }, [refreshProfile]);

  // Request email change function
  const requestEmailChange = useCallback(
    (email) => profileApi.requestEmailChange(email),
    []
  );

  // Change password function
  const changePassword = useCallback(
    (payload) => profileApi.changePassword(payload),
    []
  );

  // Update phone function
  const updatePhone = useCallback(async (phone) => {
    const res = await profileApi.updatePhone(phone);
    await refreshProfile();
    return res;
  }, [refreshProfile]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading: !profile,
        updateProfile,
        requestEmailChange,
        updatePhone,
        changePassword,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
