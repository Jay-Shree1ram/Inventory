import  { useContext } from "react";
import "./Navbar.css";
import "../../index.css";
import {  FiActivity, FiUser,FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
const accessToken= localStorage.getItem('accessToken');

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    console.log("Access token removed");
    console.log("Access token after logout: ", localStorage.getItem('accessToken'));
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
      
        {accessToken ? (
          <button
            onClick={handleLogout}
            className="nav-links flex items-center gap-2 text-gray-700 hover:text-blue-400 transition bg-transparent border-none cursor-pointer"
          >
            <FiLogOut size={34} />
         
          </button>
        ) : (
          <Link
            to="/login"
            className="nav-links flex items-center gap-2 text-gray-700 hover:text-blue-400 transition"
          >
            <FiActivity size={34} />
            Login
          </Link>
        )}

         <Link
          to="/user"
          className="nav-links flex items-center gap-2 text-gray-700 hover:text-blue-400 transition"
        >
          <FiUser size={34} />
       
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
