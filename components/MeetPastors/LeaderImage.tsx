import type React from "react"

export const LeaderImage: React.FC = () => {
  return (
    <div className="relative flex w-full max-w-[340px] items-end justify-center">
      {/* Soft glow behind image */}
      <div className="absolute -bottom-10 h-[260px] w-[260px] rounded-full bg-yellow-400/20 blur-[120px]" />

      {/* Background shape */}
      <div className="absolute bottom-0 h-[460px] w-full rounded-t-[170px] bg-[#FFE8CC]" />

      {/* Image */}
      <div className="relative z-10 h-[450px] w-full overflow-hidden rounded-t-[170px] shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <img
          src="/meetp.jpeg"
          alt="Living Word Forney Leadership"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Decorative star */}
      <svg
        className="absolute right-[-20px] top-[90px] h-[50px] w-[50px]"
        viewBox="0 0 60 60"
        fill="none"
      >
        <path
          d="M30 5L32 28L55 30L32 32L30 55L28 32L5 30L28 28L30 5Z"
          fill="#FEBF00"
        />
      </svg>

      {/* Subtle dotted accent */}
      <div className="absolute left-[-28px] top-[140px] grid grid-cols-3 gap-2 opacity-50">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-indigo-400"
          />
        ))}
      </div>
    </div>
  )
}
