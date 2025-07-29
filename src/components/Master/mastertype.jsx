import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, } from "react";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MasterType = () => {
  const [state, setState] = useState({
    resourceTypeName: "",
    resourceClassName: "",
  });

  const accessToken = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get("http://localhost:8080/master/resource-type", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log("Fetched types:", res.data);
      } catch (err) {
        console.error("Error fetching types:", err);
      }
    };

    fetchType();
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/master/resource-type", state, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log("API response:", res.data);
      toast.success("Resource type created successfully!");
        setTimeout(() => {
        navigate("/resource");
      }, 2000) 
    } catch (err) {
      console.error("API error:", err);
      toast.error("Failed to create resource type.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="p-4 md:p-8 max-w-3xl mt-24 mx-auto w-full flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Resource Type
        </h2>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="resourceTypeName" className="font-semibold text-gray-700">
                Resource Type Name
              </label>
              <input
                id="resourceTypeName"
                name="resourceTypeName"
                value={state.resourceTypeName}
                onChange={handleChange}
                placeholder="Resource Type Name"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
              />

              <label htmlFor="resourceClassName" className="font-semibold mt-6 text-gray-700">
                Resource Class Name
              </label>
              <input
                id="resourceClassName"
                name="resourceClassName"
                value={state.resourceClassName}
                onChange={handleChange}
                placeholder="Resource Class Name"
                className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-[#052535] text-white text-lg font-bold py-3 rounded-full hover:bg-[#03415a] transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MasterType;
