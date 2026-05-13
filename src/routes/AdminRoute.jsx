import { Navigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  // Wait for auth loading
  if (authLoading) {
    return <FullPageLoader />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Not admin
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
