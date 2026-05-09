import { Navigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  // Wait for auth loading
  if (authLoading) {
    return (
      <div
        className="
          min-h-screen
          bg-slate-950
          flex
          items-center
          justify-center
        "
      >
        <Loader2 size={40} className="animate-spin text-white" />
      </div>
    );
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
