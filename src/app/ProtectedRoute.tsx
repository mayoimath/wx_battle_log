import useAuth from "@/features/auth/hooks/UseAuth";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
