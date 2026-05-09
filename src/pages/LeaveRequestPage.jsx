import { useState } from "react";

import {
  CalendarDays,
  Loader2,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";

import api from "../services/api";

import getErrorMessage from "../utils/errorHandler";
import toast from "react-hot-toast";

const LeaveRequestPage = () => {
  const [formData, setFormData] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      await api.post("/leaves", formData);

      toast.success("Leave request submitted successfully.");

      setFormData({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Request Leave">
      <div
        className="
          bg-white/5
          border border-white/10
          rounded-3xl
          p-8
          max-w-3xl
        "
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Leave Type */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Leave Type
            </label>

            <select
              name="leave_type"
              value={formData.leave_type}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                text-black
                border border-white/10
                rounded-2xl
                px-4
                py-3
                outline-none
              "
            >
              <option value="" className="text-white">
                Select leave type
              </option>

              <option value="Annual">Annual Leave</option>

              <option value="Sick">Sick Leave</option>

              <option value="Emergency">Emergency Leave</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Start Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border border-white/10
                    rounded-2xl
                    py-3
                    pl-12
                    pr-4
                    outline-none
                  "
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                End Date
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border border-white/10
                    rounded-2xl
                    py-3
                    pl-12
                    pr-4
                    outline-none
                  "
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Reason</label>

            <textarea
              name="reason"
              rows="5"
              placeholder="Explain the reason for your leave..."
              value={formData.reason}
              onChange={handleChange}
              className="
                w-full
                bg-white/10
                border border-white/10
                rounded-2xl
                px-4
                py-3
                outline-none
                resize-none
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-white
              text-black
              font-semibold
              py-3
              rounded-2xl
              hover:bg-gray-200
              transition
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Leave Request
              </>
            )}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default LeaveRequestPage;
