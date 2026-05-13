import { Navigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  // Wait for auth check
  if (authLoading) {
    return <FullPageLoader />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
