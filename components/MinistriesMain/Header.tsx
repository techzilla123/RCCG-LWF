"use client"
import ContactSection1 from "./ContactSection1"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

function Header() {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number }>>([])

  useEffect(() => {
    // Generate particles only in browser
    const newParticles = [...Array(20)].map(() => ({
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
      y: Math.random() * 600,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <header className="relative w-full h-[600px] max-md:h-[500px] max-sm:h-96 overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/6b0a1e381cbd626351dad5ca0e065348e4a16af3?width=3000"
          alt=""
          className="object-cover w-full h-full"
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </motion.div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <ContactSection1 />
    </header>
  )
}

export default Header
