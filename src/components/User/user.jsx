import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Header from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { FiBox, FiDatabase, FiUsers } from "react-icons/fi";

const UserPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleInventory = () => navigate("/inventory");
  const handleResource = () => navigate("/resource");
  const handleEmployeeList = () => navigate("/employee");

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUserInfo(decoded);
        console.log("Decoded user info:", decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [accessToken]);

  const isAdmin = userInfo?.sub === "admin@hotmail.com";

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="w-full max-w-8xl mx-auto bg-white rounded-3xl shadow-2xl p-10 transition-all duration-300">
          {isAdmin ? (
            <>
              <h1 className="text-2xl font-semibold mb-4 text-gray-800">
                👋 Welcome Admin
              </h1>

              <div className="flex gap-6 mt-6 justify-start">
                <button
                  onClick={handleResource}
                  className="w-60 transform hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 rounded-xl shadow"
                >
                  <FiDatabase size={20} />
                  Go to Resources
                </button>

                <button
                  onClick={handleInventory}
                  className="w-60 transform hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 rounded-xl shadow"
                >
                  <FiBox size={20} />
                  Go to Inventory
                </button>

                <button
                  onClick={handleEmployeeList}
                  className="w-60 transform hover:scale-110 transition-transform duration-300 flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 rounded-xl shadow"
                >
                  <FiUsers size={20} />
                  View Employee List
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-semibold mb-4 text-gray-800">
                👋 Welcome {userInfo?.name || userInfo?.sub || "User"}
              </h1>

              <div className="flex gap-6 mt-6 justify-start">
                <button
                  onClick={handleResource}
                  className="w-40 transform hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 rounded-xl shadow"
                >
                  <FiDatabase size={18} />
                  Go to Resources
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPage;
