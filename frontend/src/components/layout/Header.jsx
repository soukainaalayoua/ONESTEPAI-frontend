import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, X, LogOut, Brain } from "lucide-react";

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-950 to-purple-700 text-white shadow-2xl rounded-2xl">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-white" />
            <span className="text-xl font-bold">One Step AI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link to="/community" className="hover:underline">
                  community
                </Link>
                <span className="font-medium">
                  Hi, {user?.name?.split(" ")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-white text-indigo-900 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:underline cursor-pointer">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-900 px-3 py-1 rounded hover:bg-gray-100 transition cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-800">
          <div className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block hover:underline"
            >
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:underline"
                >
                  Dashboard
                </Link>
                <Link
                  to="/community"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:underline"
                >
                  community
                </Link>
                <div className="border-t border-indigo-700 pt-3">
                  <p className="text-sm mb-1">Hi, {user?.name}</p>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block hover:underline"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-white text-indigo-900 px-3 py-1 rounded hover:bg-gray-100 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
