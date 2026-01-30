import React from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    
    <motion.nav
      className="absolute top-0 left-0 w-full px-8 h-[90px] flex justify-between items-center z-50 text-white border-b border-b-[#615e5e]"
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{delay: 1 , duration: 0.8}} 
    >
      {/* Hamburger Menu */}
      <div className="flex items-center gap-4 cursor-pointer hover:opacity-70 transition z-10">
        <div className="space-y-1.5">
          <span className="block w-5 h-[1px] bg-[#8c8888]"></span>
          <span className="block w-3 h-[1px] bg-[#8c8888] ms-2"></span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium hidden md:block">
          Menu
        </span>
      </div>

      
      
      <div className="absolute left-1/2 -translate-x-1/2 uppercase tracking-[0.3em] font-bold ">
        Emily Hotel
      </div>

      
      <div className="flex items-center h-full z-10 text-xs uppercase tracking-widest font-medium">
        
        <a href="#" className="hidden md:flex items-center h-full px-8 hover:underline underline-offset-4 text-white/80">
          Our Locations
        </a>
      
        <div className="hidden md:block w-[1px] h-full bg-[#615e5e]"></div>

        <a href="#" className="flex items-center h-full ps-9 hover:text-gray-300 transition">
          Book Now
        </a>
      </div>
    </motion.nav>
  );
}
