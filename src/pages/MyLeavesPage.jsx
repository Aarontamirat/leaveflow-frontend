import { useEffect, useState } from "react";

import { CalendarDays, Loader2, Inbox, AlertCircle } from "lucide-react";

import { format } from "date-fns";

import DashboardLayout from "../layouts/DashboardLayout";

import StatusBadge from "../components/StatusBadge";

import api from "../services/api";

import getErrorMessage from "../utils/errorHandler";

import toast from "react-hot-toast";

const MyLeavesPage = () => {
  const [leaves, setLeaves] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchLeaves = async () => {
    try {
      setLoading(true);

      const response = await api.get("/leaves/my");

      setLeaves(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <DashboardLayout title="My Leave Requests">
      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={40} className="animate-spin text-white" />
        </div>
      ) : leaves.length === 0 ? (
        // Empty State
        <div
          className="
            bg-white/5
            border border-white/10
            rounded-3xl
            p-12
            text-center
          "
        >
          <Inbox size={50} className="mx-auto mb-4 text-gray-500" />

          <h2 className="text-2xl font-semibold mb-2">No Leave Requests</h2>

          <p className="text-gray-400">
            You haven't submitted any leave requests yet.
          </p>
        </div>
      ) : (
        // Table
        <div
          className="
            bg-white/5
            border border-white/10
            rounded-3xl
            overflow-hidden
          "
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr className="text-left text-gray-300">
                  <th className="px-6 py-4">Leave Type</th>

                  <th className="px-6 py-4">Start Date</th>

                  <th className="px-6 py-4">End Date</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4">Submitted</th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="border-t border-white/5">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            w-10 h-10
                            rounded-xl
                            bg-blue-500/20
                            flex items-center justify-center
                          "
                        >
                          <CalendarDays size={18} className="text-blue-300" />
                        </div>

                        <span className="font-medium">{leave.leave_type}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      {format(new Date(leave.start_date), "MMM dd, yyyy")}
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      {format(new Date(leave.end_date), "MMM dd, yyyy")}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={leave.status} />
                    </td>

                    <td className="px-6 py-5 text-gray-400 text-sm">
                      {format(new Date(leave.created_at), "MMM dd, yyyy")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyLeavesPage;
