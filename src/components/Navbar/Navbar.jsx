import React, { useContext } from "react";
import "./Navbar.css";
import "../../index.css";
import { FiBox, FiDatabase, FiActivity } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Global/common";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">
          <h1 className="nav-links">IMS</h1>
        </Link>
      </div>
      <div className="nav-items">
        <Link
          to="/inventory"
          className="nav-links flex items-center gap-2 text-gray-700 hover:text-blue-400 transition"
        >
          <FiBox size={22} />
          Inventory
        </Link>

        <button
          onClick={handleLogout}
          className="nav-links flex items-center gap-2 text-gray-700 hover:text-blue-400 transition bg-transparent border-none cursor-pointer"
        >
          <FiActivity size={22} />
          Logout
        </button>

        <Link
          to="/resource"
          className="nav-links flex items-center gap-2 text-gray-700 hover:text-blue-400 transition"
        >
          <FiDatabase size={22} />
          Resource
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
