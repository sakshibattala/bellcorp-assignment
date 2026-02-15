import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
      );

      toast.success(response.data.message);
      login(response.data.token);
      setEmail("");
      setPassword("");
      navigate("/events", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              required
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
