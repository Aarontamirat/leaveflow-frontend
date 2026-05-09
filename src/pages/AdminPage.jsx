import { useEffect, useState } from "react";

import { Loader2, AlertCircle, Inbox, Check, X } from "lucide-react";

import { format } from "date-fns";

import DashboardLayout from "../layouts/DashboardLayout";

import StatusBadge from "../components/StatusBadge";

import api from "../services/api";

import getErrorMessage from "../utils/errorHandler";

import toast from "react-hot-toast";

const AdminPage = () => {
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [actionLoading, setActionLoading] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const response = await api.get("/leaves");

      setRequests(response.data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setActionLoading(id);

      await api.put(`/leaves/${id}`, {
        status,
      });

      setRequests((prev) =>
        prev.map((request) =>
          request.id === id ? { ...request, status } : request,
        ),
      );

      toast.success("Leave request updated successfully.");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <DashboardLayout title="Admin Panel">
      {/* Error */}
      {error && (
        <div className="flex gap-3 bg-red-500/10 border border-red-500/20 text-red-300 p-4 rounded-2xl mb-6">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 size={40} className="animate-spin text-white" />
        </div>
      ) : requests.length === 0 ? (
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

          <p className="text-gray-400">No employee leave requests found.</p>
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
                  <th className="px-6 py-4">Employee</th>

                  <th className="px-6 py-4">Leave Type</th>

                  <th className="px-6 py-4">Dates</th>

                  <th className="px-6 py-4">Status</th>

                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => (
                  <tr key={request.id} className="border-t border-white/5">
                    {/* Employee */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-medium">{request.name}</p>

                        <p className="text-sm text-gray-400">{request.email}</p>
                      </div>
                    </td>

                    {/* Leave Type */}
                    <td className="px-6 py-5">{request.leave_type}</td>

                    {/* Dates */}
                    <td className="px-6 py-5 text-sm text-gray-300">
                      <div>
                        {format(new Date(request.start_date), "MMM dd, yyyy")}
                      </div>

                      <div className="text-gray-500">to</div>

                      <div>
                        {format(new Date(request.end_date), "MMM dd, yyyy")}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <StatusBadge status={request.status} />
                    </td>

                    {/* Actions */}
                    {/* Actions */}
                    <td className="px-6 py-5">
                      {request.status === "pending" ? (
                        <div className="flex gap-3">
                          {/* Approve */}
                          <button
                            disabled={actionLoading === request.id}
                            onClick={() => updateStatus(request.id, "approved")}
                            className="
          bg-green-500/20
          hover:bg-green-500/30
          text-green-300
          p-2
          rounded-xl
          transition
        "
                          >
                            {actionLoading === request.id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Check size={18} />
                            )}
                          </button>

                          {/* Reject */}
                          <button
                            disabled={actionLoading === request.id}
                            onClick={() => updateStatus(request.id, "rejected")}
                            className="
          bg-red-500/20
          hover:bg-red-500/30
          text-red-300
          p-2
          rounded-xl
          transition
        "
                          >
                            {actionLoading === request.id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <X size={18} />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Finalized</span>
                      )}
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

export default AdminPage;
