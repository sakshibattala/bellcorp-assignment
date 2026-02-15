import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleDashboard = () => {
    if (!token) {
      toast.error("Please login");
      navigate("/login");
    } else {
      navigate("/dashboard");
    }
    setOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/events"
          className="text-xl font-bold text-indigo-600 cursor-pointer"
        >
          Eventify
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/events"
            className={`transition cursor-pointer ${isActive("/events")}`}
          >
            Events
          </Link>

          <button
            onClick={handleDashboard}
            className={`transition flex items-center gap-1 cursor-pointer ${
              location.pathname === "/dashboard"
                ? "text-indigo-600 font-semibold"
                : "text-gray-700 hover:text-indigo-600"
            }`}
          >
            <LayoutDashboard size={18} />
            My Events
          </button>

          {!token ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-1 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition cursor-pointer"
              >
                <LogIn size={16} />
                Login
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition cursor-pointer"
              >
                <UserPlus size={16} />
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            to="/events"
            onClick={() => setOpen(false)}
            className="block text-gray-700 hover:text-indigo-600 cursor-pointer"
          >
            Events
          </Link>

          <button
            onClick={handleDashboard}
            className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 cursor-pointer"
          >
            <LayoutDashboard size={18} />
            My Events
          </button>

          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 cursor-pointer"
              >
                <LogIn size={18} />
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-gray-700 hover:text-indigo-600 cursor-pointer"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
