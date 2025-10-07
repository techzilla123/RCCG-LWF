import type React from "react"

export const RightImageSection: React.FC = () => {
  return (
    <div className="relative flex items-end justify-center w-[314px] h-[615px] max-lg:w-[280px] max-lg:h-[550px] max-md:w-[250px] max-md:h-[493px] max-sm:w-[200px] max-sm:h-[394px]">
      {/* Background shape */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[462px] bg-[#FFE8CC] rounded-t-[150px] max-lg:w-[270px] max-lg:h-[415px] max-md:w-[240px] max-md:h-[368px] max-sm:w-[192px] max-sm:h-[295px]" />

      {/* Image with rounded top */}
      <div className="absolute bottom-0 right-[13.55px] w-[300px] h-[453px] rounded-t-[150px] overflow-hidden max-lg:w-[270px] max-lg:h-[407px] max-md:w-[240px] max-md:h-[361px] max-sm:w-[192px] max-sm:h-[289px]">
        <img src="/person-in-yellow-jacket-with-glasses-smiling-profe.jpg" alt="Pastor portrait" className="w-full h-full object-cover" />
      </div>

      {/* Decorative yellow star/sparkle */}
      <svg
        className="absolute top-[80px] right-[-10px] w-[60px] h-[60px] max-md:w-[50px] max-md:h-[50px] max-sm:w-[40px] max-sm:h-[40px] max-sm:top-[60px]"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M30 5L32 28L55 30L32 32L30 55L28 32L5 30L28 28L30 5Z" fill="#FEBF00" />
        <circle cx="45" cy="15" r="3" fill="#FEBF00" />
      </svg>

      {/* Additional decorative star element */}
      <svg
        className="absolute top-[140px] right-[20px] w-[40px] h-[40px] max-md:w-[35px] max-md:h-[35px] max-sm:w-[30px] max-sm:h-[30px]"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2L21.5 18.5L38 20L21.5 21.5L20 38L18.5 21.5L2 20L18.5 18.5L20 2Z"
          stroke="#FEBF00"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  )
}
