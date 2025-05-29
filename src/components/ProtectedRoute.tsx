import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  const isExpired = user.exp * 1000 < Date.now();

  if (isExpired) {
    logout();
    return <Navigate to={"/login"} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
