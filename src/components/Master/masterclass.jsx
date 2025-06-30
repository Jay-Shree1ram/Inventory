import axios from "axios";
import { useState, useEffect,useContext } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { AuthContext } from "../Global/common"; 
const MasterClass = () => {
  const [state, setState] = useState({
    className: "",
  });
const { accessToken } = useContext(AuthContext);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

console.log("Submitting data:", JSON.stringify(state, null, 2));

  useEffect(() => {
  const fetchClass = async () => {
    try {
      const res = await axios.get("http://localhost:8080/master/resource-class", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Fetched classs:", res.data);
    } catch (err) {
      console.error("Error fetching classs:", err);
    }
  };

  fetchClass();
}, [accessToken]); 
   
  const handleSubmit = async (e) => {
    
console.log("Form submitted with state:", state);
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/master/resource-class", state,{
        headers: {
           Authorization: `Bearer ${accessToken}`,
           "Content-Type": "application/json"
           } 
      });
    
      console.log("Response is ",res);
      console.log("API response:", res.data);
    } catch (err) {
      console.error("API error:", err);
    }
    console.log("Form submitted with:", state);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="p-4 md:p-8 mt-24 max-w-3xl mx-auto w-full flex-grow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Resource Class
        </h2>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="className" className="font-semibold text-gray-700">
                Resource Class Name
              </label>
              <input
                id="className"
                name="className"
                value={state.className}
                onChange={handleChange}
                placeholder="Class Name"
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

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MasterClass;

