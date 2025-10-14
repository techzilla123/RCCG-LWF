"use client"

import type React from "react"
import { motion } from "framer-motion"

interface Tab {
  id: string
  label: string
}

interface TabSectionProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  accentColor: string
}

export const TabSection: React.FC<TabSectionProps> = ({ tabs, activeTab, onTabChange, accentColor }) => {
  return (
    <nav className="flex flex-wrap justify-center w-full gap-2 md:gap-4 py-8">
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab

        return (
          <motion.button
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onTabChange(tab.id)
            }}
            className={`
              relative px-6 py-3 text-base md:text-lg font-bold rounded-full
              transition-all duration-300 overflow-hidden
              ${
                isActive
                  ? `${accentColor} text-white shadow-xl`
                  : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg"
              }
            `}
          >
            {/* Ripple effect on click */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            {/* Shine effect */}
            <motion.div
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />

            <span className="relative z-10">{tab.label}</span>

            {/* Active indicator dot */}
            {isActive && (
              <motion.div
                layoutId="activeDot"
                className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg"
                transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
              />
            )}
          </motion.button>
        )
      })}
    </nav>
  )
}
