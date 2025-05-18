import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserPlus } from "lucide-react";
import axios from "axios";
// import MainLayout from "../layout/MainLayout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(
        "https://handsome-mercury-anorak.glitch.me/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      setShowVerification(true); // Show the code input popup
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post(
        "https://handsome-mercury-anorak.glitch.me/api/auth/verify-email",
        {
          email,
          code: verifyCode,
        }
      );

      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/payment");
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Verification failed. Please try again.");
      }
    }
  };

  return (
    // <MainLayout>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-950 to-purple-700 px-4 rounded-3xl">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-purple-100 rounded-full shadow-inner">
            <UserPlus className="h-8 w-8 text-purple-700" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Registration Form */}
        {!showVerification ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="John Doe"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
                isLoading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-700 hover:bg-purple-800"
              }`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        ) : (
          /* Verification Step */
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Enter Verification Code
            </h3>
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="6-digit code"
            />
            <button
              onClick={handleVerifyCode}
              disabled={isLoading}
              className="w-full py-2 px-4 rounded-md text-white font-medium transition-colors bg-purple-900 hover:bg-purple-700-700"
            >
              {isLoading ? "Verifying..." : "Verify & Continue"}
            </button>
          </div>
        )}

        {/* Sign In Link */}
        {!showVerification && (
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-purple-600 hover:text-purple-800 font-semibold"
            >
              Sign in now
            </Link>
          </div>
        )}
      </div>
    </div>
    // </MainLayout>
  );
};

export default Register;
