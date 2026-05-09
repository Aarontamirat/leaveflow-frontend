import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import getErrorMessage from "../utils/errorHandler";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear error while typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return "Please enter a valid email address";
    }

    if (!formData.password) {
      return "Password is required";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      return setError(validationError);
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      login(response.data.user, response.data.token);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-gray-900 to-slate-800 flex items-center justify-center px-4 py-10 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <ShieldCheck className="text-white" size={30} />
            </div>

            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

            <p className="text-gray-300 mt-2">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border border-white/15
                    text-white
                    placeholder:text-gray-400
                    rounded-xl
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    transition-all
                    duration-200
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm text-gray-300">Password</label>
              </div>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="
                    w-full
                    bg-white/10
                    border border-white/15
                    text-white
                    placeholder:text-gray-400
                    rounded-xl
                    py-3
                    pl-12
                    pr-12
                    outline-none
                    transition-all
                    duration-200
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-white
                    transition
                  "
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-white
                text-black
                font-semibold
                py-3
                rounded-xl
                transition-all
                duration-200
                hover:scale-[1.02]
                hover:bg-gray-200
                disabled:opacity-70
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="border-t border-white/10"></div>

            <span
              className="
                absolute
                left-1/2
                -translate-x-1/2
                -top-3
                bg-[#111827]
                px-4
                text-sm
                text-gray-400
              "
            >
              OR
            </span>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-300 text-sm">
            Don&apos;t have an account?
            <Link
              to="/register"
              className="
                ml-2
                text-white
                font-medium
                hover:text-blue-400
                transition-colors
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
