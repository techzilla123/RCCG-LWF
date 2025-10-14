'use client';

import { Cross, Church, Circle } from 'lucide-react';
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
    <div className="h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center overflow-hidden p-4">
      {/* Floating Holy Orbs (Circles) */}
      <div className="flex space-x-6 mb-6">
        <motion.div animate={floatingAnimation}>
          <Circle size={50} color="#ffd700" strokeWidth={3} />
        </motion.div>
        <motion.div animate={floatingAnimation}>
          <Circle size={50} color="#87cefa" strokeWidth={3} />
        </motion.div>
        <motion.div animate={floatingAnimation}>
          <Circle size={50} color="#ff69b4" strokeWidth={3} />
        </motion.div>
      </div>

      {/* Main Message */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#ffd700] mb-2 flex items-center gap-2">
        <Church color="#ffd700" /> 404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-300 max-w-md text-center mb-6">
        The page you’re looking for seems to have taken a spiritual journey. Let’s guide you back home to RCCG LWF.
      </p>

      {/* Back to Home */}
      <Link
        href="/"
        className="bg-[#ffd700] hover:bg-[#e6c200] text-black py-2 px-6 rounded-full font-semibold transition-all shadow-lg"
      >
        ⛪ Return Home
      </Link>

      {/* Floating Icons (Crosses) */}
      <div className="flex space-x-6 mt-10">
        <motion.div animate={floatingAnimation}>
          <Cross size={48} color="#ffffff" strokeWidth={2.5} />
        </motion.div>
        <motion.div animate={floatingAnimation}>
          <Cross size={48} color="#ffd700" strokeWidth={2.5} />
        </motion.div>
      </div>
    </div>
  );
}
