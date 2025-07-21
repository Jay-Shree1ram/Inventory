import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import "../../index.css";
import {
  FiBox,
  FiDatabase,
  FiLogOut,
  FiUsers,
  FiUser,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Global/common";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const profileRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isLoggedIn = user !== null;
  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="flex justify-between items-center bg-[#052535] h-20 px-4 relative">
      <div className="nav-logo">
        <Link to="/">
          <h1 className="nav-links">IMS</h1>
        </Link>
      </div>

      <div className="nav-items flex gap-6 items-center">
        {isLoggedIn ? (
          <>
            {/* Admin Dashboard */}
            {isAdmin && (
              <Link to="/admin/dashboard" className="nav-links flex items-center gap-2">
                <FiBox size={20} />
                Dashboard
              </Link>
            )}

            {/* My Resources (for all users) */}
            <Link to="/resource" className="nav-links flex items-center gap-2">
              <FiDatabase size={20} />
              My Resources
            </Link>

            {/* Employee List (only for admin) */}
            {isAdmin && (
              <Link to="/employees" className="nav-links flex items-center gap-2">
                <FiUsers size={20} />
                Employee List
              </Link>
            )}

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={toggleDropdown}
                className="nav-links flex items-center gap-2 bg-transparent border-none cursor-pointer"
              >
                <FiUser size={20} />
                Profile
              </button>

              {dropdownOpen && (
                <div className="absolute mt-7 right-[-60px] w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    Hello, <strong>{user?.email || "User"}</strong>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FiLogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="nav-links">
            Login/Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
