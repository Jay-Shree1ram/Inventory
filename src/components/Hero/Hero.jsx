// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import "./Hero.css";
// import "../../index.css";
// import inventoryImg from "../../assets/NMg78z_SOF55nsKiENC1k.jpg"

// const Hero = () => {
//   const accessToken = localStorage.getItem('accessToken');
//   console.log("Access tokennnnnn ", accessToken)


//   return (
//     <div className="hero-container min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-[#f9fafb] overflow-hidden">
  
//       <motion.div
//         className="max-w-xl"
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
//           Streamline Inventory with <span className="text-[#052535]">Verisk Nepal</span>
//         </h1>

//         <p className="text-gray-600 text-lg mb-6">
//           Simplify resource tracking, automate workflows, and monitor inventory across all departments — with a system designed for operational excellence at Verisk Nepal.
//         </p>

//         <motion.div
//           className="flex gap-4"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           <Link to="/login">
//             <button className="bg-[#052535] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#03415a] transition">
//               Get Started
//             </button>
//           </Link>
//           <Link to="/about">
//             <button className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-300 transition">
//               Learn More
//             </button>
//           </Link>
//         </motion.div>
//       </motion.div>

 
//       <motion.div
//         className="mt-10 md:mt-0"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.2 }}
//       >
//         <img
//           src={inventoryImg}
//           alt="Inventory Illustration"
//           className="w-[600px]  rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
//         />
//       </motion.div>
//     </div>
//   );
// };

// export default Hero;



import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheckCircle, FiUsers, FiTool } from "react-icons/fi";
import inventoryImg from "../../assets/NMg78z_SOF55nsKiENC1k.jpg";
import "./Hero.css";

const Hero = () => {
  return (
    <>
<div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-24 bg-gradient-to-r from-[#03364a] to-[#052535] text-white">

      
        <motion.div
          className="max-w-xl w-full flex flex-col items-center md:items-start text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Ready to <span className="text-[#66d9e8]">optimize</span> your inventory?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Start your free trial and see the difference today.
          </p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link to="/login">
              <button className="bg-white text-[#052535] font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition shadow-md">
                Get Started Now
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="mb-12 md:mb-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={inventoryImg}
            alt="Inventory Illustration"
            className="w-[550px] max-w-full rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>

<section className="bg-gradient-to-r from-[#03364a] to-[#052535] py-20 transition-colors duration-500">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
    {[
      {
        icon: <FiCheckCircle size={40} className="text-[#1e3a8a]" />,
        title: "Real-Time Inventory",
        desc: "Instant stock visibility and alerts.",
        bg: "bg-white",
        titleColor: "text-[#1e3a8a]",
        descColor: "text-[#1e293b]",
      },
      {
        icon: <FiUsers size={40} className="text-[#c2410c]" />,
        title: "Team Collaboration",
        desc: "Role-based access and control.",
        bg: "bg-white",
        titleColor: "text-[#c2410c]",
        descColor: "text-[#1c1917]",
      },
      {
        icon: <FiTool size={40} className="text-[#15803d]" />,
        title: "Maintenance & Repair",
        desc: "Streamlined repair and upkeep.",
        bg: "bg-white",
        titleColor: "text-[#15803d]",
        descColor: "text-[#14532d]",
      },
    ].map(({ icon, title, desc, bg, titleColor, descColor }, idx) => (
      <div
        key={idx}
        className={`${bg} rounded-3xl px-10 py-10 min-h-64 flex flex-col items-center text-center gap-4 shadow-xl hover:scale-105 transition-all duration-300`}
      >
        {icon}
        <h3 className={`text-2xl font-bold ${titleColor}`}>{title}</h3>
        <p className={`text-md ${descColor}`}>{desc}</p>
      </div>
    ))}
  </div>

             <motion.div
        className="bg-white border-l-4 border-[#052535] rounded-xl shadow-2xl max-w-3xl mx-auto p-10 mt-20 mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="italic text-gray-700 mb-4 text-lg leading-relaxed">
          “Since adopting Verisk Nepal’s inventory system, our stock management has never been smoother. The real-time updates and seamless team access have transformed the way we operate.”
        </p>
        <div className="flex items-center justify-center gap-4 mt-6">
          <img
            src="https://i.pravatar.cc/100?img=3"
            alt="user avatar"
            className="w-12 h-12 rounded-full"
          />
          <p className="font-semibold text-[#052535]">Upendra Pradhan, Managing Director</p>
        </div>
      </motion.div>
      </section>


 
    </>
  );
};

export default Hero;
