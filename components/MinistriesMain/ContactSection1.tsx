"use client"
import { Montserrat } from "next/font/google"
import { motion } from "framer-motion"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
})

interface ContactSectionProps {
  className?: string
}

function ContactSection1({ className = "" }: ContactSectionProps) {
  return (
    <section
      className={`absolute top-40 left-[110px] z-[1] 
      max-md:left-[60px] max-md:top-[140px] 
      max-sm:left-5 max-sm:top-[100px] ${className}`}
    >
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-9 text-base text-orange-200 uppercase tracking-[0.3em] font-bold 
        max-md:text-base max-sm:mb-5 max-sm:text-sm"
      >
        Ministries
      </motion.p>

      {/* Desktop version */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className={`${montserrat.className} text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight 
        text-white uppercase leading-tight w-[700px] max-md:hidden drop-shadow-2xl`}
      >
        <motion.span
          animate={{
            textShadow: [
              "0 0 20px rgba(255,255,255,0.5)",
              "0 0 40px rgba(255,255,255,0.3)",
              "0 0 20px rgba(255,255,255,0.5)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          RCCG LWF FOR EVERYONE
        </motion.span>
      </motion.h1>

      {/* Mobile version */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className={`${montserrat.className} hidden max-md:block text-4xl font-bold tracking-tight 
        text-white uppercase leading-[48px] w-[320px] max-sm:text-2xl max-sm:leading-8 
        max-sm:w-[260px] drop-shadow-2xl`}
      >
        RCCG LWF FOR
        <br />
        EVERYONE
      </motion.h1>

      {/* Decorative animated line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "120px" }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-6 h-1 bg-gradient-to-r from-orange-400 to-amber-300 rounded-full shadow-lg"
      />
    </section>
  )
}

export default ContactSection1
