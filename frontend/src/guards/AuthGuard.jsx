import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthGuard = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();
  if (loading) {
    return <div className="text-white p-4">Checking authentication…</div>;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default AuthGuard;
