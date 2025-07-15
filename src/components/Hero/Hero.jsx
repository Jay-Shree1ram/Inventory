import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Hero.css";
import "../../index.css";
import inventoryImg from "../../assets/NMg78z_SOF55nsKiENC1k.jpg"

const Hero = () => {
  const accessToken = localStorage.getItem('accessToken');
  console.log("Access tokennnnnn ", accessToken)


  return (
    <div className="hero-container min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-[#f9fafb] overflow-hidden">
  
      <motion.div
        className="max-w-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Streamline Inventory with <span className="text-[#052535]">Verisk Nepal</span>
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Simplify resource tracking, automate workflows, and monitor inventory across all departments — with a system designed for operational excellence at Verisk Nepal.
        </p>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/login">
            <button className="bg-[#052535] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#03415a] transition">
              Get Started
            </button>
          </Link>
          <Link to="/about">
            <button className="bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-300 transition">
              Learn More
            </button>
          </Link>
        </motion.div>
      </motion.div>

 
      <motion.div
        className="mt-10 md:mt-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img
          src={inventoryImg}
          alt="Inventory Illustration"
          className="w-[600px]  rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </div>
  );
};

export default Hero;
