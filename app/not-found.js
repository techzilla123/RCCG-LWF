'use client';

import { PartyPopper, Package, Circle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center overflow-hidden p-4">
      {/* Animated Balloons (using Circles) */}
      <div className="flex space-x-6 mb-6">
        <motion.div animate={floatingAnimation}>
          <Circle size={50} color="#ff66c4" strokeWidth={3} />
        </motion.div>
        <motion.div animate={floatingAnimation}>
          <Circle size={50} color="#66ffb3" strokeWidth={3} />
        </motion.div>
        <motion.div animate={floatingAnimation}>
          <Circle size={50} color="#ffc266" strokeWidth={3} />
        </motion.div>
      </div>

      {/* Main Message */}
      <h1 className="text-4xl md:text-5xl font-bold text-pink-400 mb-2 flex items-center gap-2">
        <PartyPopper color="#ff99cc" /> 404 - Party Not Found
      </h1>
      <p className="text-lg text-gray-300 max-w-md text-center mb-6">
      The page you're looking for isn’t here. Maybe it got too excited and wandered off to a birthday bash!
      </p>

      {/* Back to home */}
      <Link
        href="/"
        className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-5 rounded-full transition-all"
      >
        🎉 Back to Home
      </Link>

      {/* Floating Gifts (Packages) */}
      <div className="flex space-x-6 mt-10">
        <motion.div animate={floatingAnimation}>
          <Package size={48} color="#ffcc00" strokeWidth={2.5} />
        </motion.div>
        <motion.div animate={floatingAnimation}>
          <Package size={48} color="#00ffff" strokeWidth={2.5} />
        </motion.div>
      </div>
    </div>
  );
}
