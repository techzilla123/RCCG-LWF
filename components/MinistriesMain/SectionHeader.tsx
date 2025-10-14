"use client"

import type React from "react"
import { motion } from "framer-motion"

interface SectionHeaderProps {
  title: string
  accent?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, accent = "from-gray-700 to-gray-600" }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative flex flex-col justify-center px-4 py-16 text-center text-white 
      bg-gradient-to-r ${accent} rounded-t-3xl shadow-2xl overflow-hidden`}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05),transparent_70%)]"
        />
      </div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative text-4xl md:text-5xl lg:text-6xl font-black tracking-wide uppercase 
        drop-shadow-2xl text-balance"
      >
        {title}
      </motion.h2>

      {/* Decorative line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mx-auto mt-6 h-1.5 bg-white/40 rounded-full"
      />
    </motion.header>
  )
}
