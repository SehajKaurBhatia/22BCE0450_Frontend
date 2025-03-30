"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const Toggle=()=> {
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="text-[14px] ">
    {/* Toggle Button Inside the Empty div */}
    <div className="relative flex items-center justify-between w-auto h-[50px] bg-gray-200 rounded-[11px] px-1 cursor-pointer">
      {/* Sliding Background */}
      <motion.div
        className="absolute left-2 right-2 w-[110px] h-[36px] bg-white rounded-[11px] shadow-md"
        animate={{ x: isGridView ? 0 : 122 }} 
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />

      {/* Grid View Button */}
      <button
        className="cursor-pointer relative z-10 font-bold w-[120px] h-[36px] flex items-center justify-center "
        onClick={() => setIsGridView(true)}
      >
        Grid View
      </button>

      {/* List View Button */}
      <button
        className="cursor-pointer relative z-10 font-bold w-[120px] h-[36px] flex items-center justify-center  "
        onClick={() => setIsGridView(false)}
      >
        List View
      </button>
    </div>
  </div>
  );
}
export default Toggle