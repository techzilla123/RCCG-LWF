"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ContentPanelProps {
  imageSrc: string
  title: string
  subtitle?: string
  description: string
  buttonText: string
  buttonColor: string
 
  showSchedule?: boolean
}

export const ContentPanel: React.FC<ContentPanelProps> = React.memo(
  ({ imageSrc, title, subtitle, description, buttonText, buttonColor, showSchedule = false }) => {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-center 
      max-w-7xl mx-auto p-6 lg:p-12"
      >
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full lg:w-1/2 relative group"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src={imageSrc}
              alt={title}
              className="w-full h-auto aspect-[4/3] object-cover"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          </div>

          {/* Decorative elements */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-500/20 
          rounded-full blur-2xl -z-10"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 
          rounded-full blur-2xl -z-10"
          />
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full lg:w-1/2 space-y-6"
        >
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-tight text-balance"
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl md:text-2xl font-semibold uppercase text-slate-600 tracking-wide"
              >
                {subtitle}
              </motion.h3>
            )}
          </div>

          {showSchedule && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-block bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg 
            border border-amber-200/50"
            >
              <div className="space-y-2">
                <p className="text-sm font-bold text-amber-900 uppercase tracking-wider">When We Meet</p>
                <div className="flex items-center gap-4 text-slate-700">
                  <span className="font-semibold">Sundays</span>
                  <span className="text-amber-600">•</span>
                  <span className="font-semibold">9 & 10:30 AM</span>
                </div>
              </div>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl leading-relaxed text-zinc-700 text-pretty"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              className={`group relative ${buttonColor} text-white px-8 py-4 rounded-full 
            font-bold text-lg shadow-xl overflow-hidden transition-all duration-300`}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
              />

              <span className="relative flex items-center gap-3">
                {buttonText}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.article>
    )
  },
)

ContentPanel.displayName = "ContentPanel"
