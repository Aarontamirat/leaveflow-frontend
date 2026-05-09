import { Link, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  ShieldCheck,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children, title }) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside
        className="
          w-72
          bg-white/5
          backdrop-blur-xl
          border-r
          border-white/10
          p-6
          hidden
          md:flex
          flex-col
        "
      >
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold">LeaveFlow</h1>

          <p className="text-gray-400 text-sm mt-1">Leave Management System</p>
        </div>

        {/* User Info */}
        <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="font-semibold">{user?.name}</p>

          <p className="text-sm text-gray-400">{user?.email}</p>

          <span
            className="
              inline-block
              mt-3
              text-xs
              px-3
              py-1
              rounded-full
              bg-blue-500/20
              text-blue-300
            "
          >
            {user?.role}
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          <Link
            to="/dashboard"
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              hover:bg-white/10
              transition
            "
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/request-leave"
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              hover:bg-white/10
              transition
            "
          >
            <FileText size={18} />
            Request Leave
          </Link>

          <Link
            to="/my-leaves"
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              hover:bg-white/10
              transition
            "
          >
            <ClipboardList size={18} />
            My Leaves
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                hover:bg-white/10
                transition
              "
            >
              <ShieldCheck size={18} />
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
            mt-6
            flex items-center justify-center gap-2
            bg-red-500/20
            hover:bg-red-500/30
            text-red-300
            py-3
            rounded-xl
            transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {/* Mobile Header */}
        <div
          className="
    md:hidden
    flex
    justify-between
    items-center
    mb-6
  "
        >
          <h1 className="text-2xl font-bold">LeaveFlow</h1>

          <button
            onClick={handleLogout}
            className="
      bg-red-500/20
      text-red-300
      px-4 py-2
      rounded-xl
    "
          >
            Logout
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex gap-3 mb-8 overflow-x-auto">
          <Link
            to="/dashboard"
            className="
      bg-white/10
      px-4 py-2
      rounded-xl
      whitespace-nowrap
    "
          >
            Dashboard
          </Link>

          <Link
            to="/request-leave"
            className="
      bg-white/10
      px-4 py-2
      rounded-xl
      whitespace-nowrap
    "
          >
            Request Leave
          </Link>

          <Link
            to="/my-leaves"
            className="
      bg-white/10
      px-4 py-2
      rounded-xl
      whitespace-nowrap
    "
          >
            My Leaves
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="
        bg-white/10
        px-4 py-2
        rounded-xl
        whitespace-nowrap
      "
            >
              Admin
            </Link>
          )}
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
