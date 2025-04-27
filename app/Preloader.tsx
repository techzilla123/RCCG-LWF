"use client";

import React from "react";
import { motion } from "framer-motion";
import { Emoji } from "react-emoji-render"; // For rendering emojis

export default function Preloader() {
  return (
    <div className="preloader flex items-center justify-center fixed top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 z-50">
      <div className="flex flex-col items-center space-y-6 animate-fadeIn">
        {/* Logo */}
        <motion.img
          src="/logo(2).svg"
          alt="Party Place & Rentals Logo"
          className="w-32 h-32"
          initial={{ opacity: 0, rotate: 360 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 2 }}
        />

        {/* Party Emoji Icon */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {/* Balloon and confetti emojis */}
          <div className="flex space-x-4 text-5xl animate-pulse">
            <Emoji className="text-white animate-bounce" emoji="🎉" />
            <Emoji className="text-white animate-bounce" emoji="🎈" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.h1
          className="text-4xl font-coiny text-white animate-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
        >
          Party Place & Rentals
        </motion.h1>
      </div>
    </div>
  );
}
