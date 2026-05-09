import { CalendarCheck, FilePlus2, Shield } from "lucide-react";

import { Link } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import { useAuth } from "../context/AuthContext";

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome Card */}
      <div
        className="
          bg-linear-to-r
          from-blue-600
          to-purple-600
          rounded-3xl
          p-8
          mb-8
        "
      >
        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h2>

        <p className="text-blue-100">
          Manage your leave requests easily and efficiently.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/request-leave"
          className="
            bg-white/5
            border border-white/10
            rounded-3xl
            p-6
            hover:bg-white/10
            transition
          "
        >
          <FilePlus2 size={32} className="mb-4 text-blue-400" />

          <h3 className="text-xl font-semibold mb-2">Request Leave</h3>

          <p className="text-gray-400 text-sm">
            Submit a new leave request quickly.
          </p>
        </Link>

        <Link
          to="/my-leaves"
          className="
            bg-white/5
            border border-white/10
            rounded-3xl
            p-6
            hover:bg-white/10
            transition
          "
        >
          <CalendarCheck size={32} className="mb-4 text-green-400" />

          <h3 className="text-xl font-semibold mb-2">My Leaves</h3>

          <p className="text-gray-400 text-sm">
            View all your leave requests and statuses.
          </p>
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="
              bg-white/5
              border border-white/10
              rounded-3xl
              p-6
              hover:bg-white/10
              transition
            "
          >
            <Shield size={32} className="mb-4 text-purple-400" />

            <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>

            <p className="text-gray-400 text-sm">
              Review and manage employee leave requests.
            </p>
          </Link>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
