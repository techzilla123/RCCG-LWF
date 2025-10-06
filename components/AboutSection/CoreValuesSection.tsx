"use client";
import React from "react";
import { motion } from "framer-motion";

export const CoreValuesSection: React.FC = () => {
  return (
    <footer className="flex mt-10 flex-col md:flex-row items-center justify-center gap-6 py-10 px-6 w-full text-center bg-slate-700 bg-opacity-30 overflow-hidden">
      {/* Text */}
      <h2 className="text-3xl md:text-4xl font-black text-black z-10">
        OUR CORE VALUES
      </h2>

      {/* Animated Image 1 */}
      <motion.img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/5bb6129d03f588189dd7d5aa4e08c80b5297440f"
        alt="Core values decoration"
        className="w-32 md:w-40 object-contain"
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 6,
          ease: "easeInOut",
        }}
      />

      {/* Animated Image 2 */}
      <motion.img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/334a9cc9d7aa0cb0ca948b66e5b7a11f8b716fb2"
        alt="Core values banner"
        className="w-full md:w-[600px] object-contain"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: -20, opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 8,
          ease: "easeInOut",
        }}
      />
    </footer>
  );
};
