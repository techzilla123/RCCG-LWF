import type React from "react"

export const LeftImageSection: React.FC = () => {
  return (
    <div className="relative flex items-end justify-center w-[314px] h-[615px] max-lg:w-[280px] max-lg:h-[550px] max-md:w-[250px] max-md:h-[493px] max-sm:w-[200px] max-sm:h-[394px]">
      {/* Background shape */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[462px] bg-[#FFF5D9] rounded-t-[150px] max-lg:w-[270px] max-lg:h-[415px] max-md:w-[240px] max-md:h-[368px] max-sm:w-[192px] max-sm:h-[295px]" />

      {/* Image with rounded top */}
      <div className="absolute bottom-0 left-[13.55px] w-[300px] h-[453px] rounded-t-[150px] overflow-hidden max-lg:w-[270px] max-lg:h-[407px] max-md:w-[240px] max-md:h-[361px] max-sm:w-[192px] max-sm:h-[289px]">
        <img src="/person-with-curly-hair-holding-microphone-on-pink-.jpg" alt="Pastor with microphone" className="w-full h-full object-cover" />
      </div>

      {/* Decorative purple squiggle */}
      <svg
        className="absolute bottom-[80px] left-[-20px] w-[140px] h-[140px] max-md:w-[120px] max-md:h-[120px] max-sm:w-[100px] max-sm:h-[100px] max-sm:bottom-[60px]"
        viewBox="0 0 140 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 120C20 120 10 110 15 95C20 80 30 75 40 80C50 85 55 95 50 105C45 115 35 120 25 125C15 130 5 135 10 145"
          stroke="#7A38FC"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="25" cy="100" r="4" fill="#7A38FC" />
        <circle cx="45" cy="115" r="3" fill="#7A38FC" />
      </svg>
    </div>
  )
}
