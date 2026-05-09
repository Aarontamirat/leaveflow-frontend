import { Navigate } from "react-router-dom";

import { Loader2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const GuestRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

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

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;
