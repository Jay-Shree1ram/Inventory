import React, { useContext } from "react";
import "./Navbar.css";
import "../../index.css";
import { FiBox, FiDatabase, FiLogOut, FiUsers, } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Global/common";

const Navbar = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  console.log("Navbar user:", user);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isLoggedIn = user !== null;

  return (
    <nav className="flex justify-between items-center bg-[#052535] h-20 px-4">
      <div className="nav-logo">
        <Link to="/">
          <h1 className="nav-links">IMS</h1>
        </Link>
      </div>

      <div className="nav-items flex gap-6 items-center">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="nav-links flex items-center gap-2">
              <FiBox size={20} />
              Dashboard
            </Link>

            <Link to="/resource" className="nav-links flex items-center gap-2">
              <FiDatabase size={20} />
              My Resources
            </Link>

            {user.role === "ADMIN" && (
              <Link to="/employees" className="nav-links flex items-center gap-2">
                <FiUsers size={20} />
                Employee List
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="nav-links flex items-center gap-2 bg-transparent border-none cursor-pointer"
            >
              {/* <FiActivity size={20} /> */}
               <FiLogOut size={20} />
              Logout
            </button>
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
