import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


// ==============================Custom Hook for Authentication ============================== //
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  console.log("🧠 AUTH CONTEXT STATE:", {
    user: ctx?.user,
    loading: ctx?.loading,
    isAuthenticated: ctx?.isAuthenticated,
  });

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};
