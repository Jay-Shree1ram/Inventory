

import axios from "axios";
import { useState, useContext, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../Global/common"; 
const MasterStatus = () => {
  const [state, setState] = useState({
    statusName: "",
  });
 

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
 const { accessToken } = useContext(AuthContext);
 useEffect(() => {
  const fetchStatuses = async () => {
    try {
      const res = await axios.get("http://localhost:8080/master/resource-status", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Fetched statuses:", res.data);
    } catch (err) {
      console.error("Error fetching statuses:", err);
    }
  };

  fetchStatuses();
}, [accessToken]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/master/resource-status", state,{
        headers: { Authorization: `Bearer ${accessToken}` }
      });
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
          Create Resource Status
        </h2>

        <div className="bg-white shadow-lg rounded-2xl p-8">
          <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="statusName" className="font-semibold text-gray-700">
                Resource Status
              </label>
              <input
                id="statusName"
                name="statusName"
                value={state.statusName}
                onChange={handleChange}
                placeholder="Status Name"
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

export default MasterStatus;




// import axios from "axios";
// import { useState, useContext } from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { AuthContext } from "../Global/common"; 

// const MasterStatus = () => {
  
//   const [value, setValue] = useState("tester");
//   const { accessToken } = useContext(AuthContext);

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
    
//       const res = await axios.post(
//         "http://localhost:8080/master/resource-status",
//         { statusName: value },
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );
//       console.log("API response:", res.data);
//     } catch (err) {
//       console.error("API error:", err);
//     }
//     console.log("Form submitted with:", { statusName: value });
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       <div className="p-4 md:p-8 mt-24 max-w-3xl mx-auto w-full flex-grow">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Create Resource Status
//         </h2>

//         <div className="bg-white shadow-lg rounded-2xl p-8">
//           <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit}>
//             <div className="flex flex-col gap-2">
//               <label
//                 htmlFor="statusName"
//                 className="font-semibold text-gray-700"
//               >
//                 Resource Status
//               </label>
//               <input
//                 id="statusName"
//                 name="statusName"
//                 value={value}
//                 onChange={handleChange}
//                 placeholder="Status Name"
//                 className="h-12 px-5 rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#052535]"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-8 w-full bg-[#052535] text-white text-lg font-bold py-3 rounded-full hover:bg-[#03415a] transition-colors"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="mt-auto">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default MasterStatus;

