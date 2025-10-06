import React from "react";

export const ChurchImageSection: React.FC = () => {
  return (
    <aside className="flex relative flex-col items-center">
      {/* Hero Image */}
      <figure className="relative mb-14 w-full h-[320px] max-w-[440px] rounded-2xl overflow-hidden shadow-xl">
        <img
          src="/Rectangle 1.png"
          alt="Church cross silhouette"
          className="object-cover w-full h-full"
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />
      </figure>

      {/* Logo & Info */}
      <div className="flex relative flex-col items-center -mt-20">
        {/* Clean Circular Logo */}
        <div className="flex justify-center items-center mb-6 rounded-full overflow-hidden h-[120px] w-[120px]">
          <img
            src="/LWF 2 Logo.png" // Replace with actual RCCG Logo path
            alt="Church Logo"
            className="h-full w-full object-contain"
          />
        </div>

        {/* Glass Info Card - smaller */}
       <div className="relative px-3 py-2 text-center bg-gray-900/80 backdrop-blur-md rounded-md shadow-lg text-white w-full max-w-[180px] 
                transform transition duration-500 hover:scale-105 hover:shadow-xl hover:bg-gray-900/90 animate-fadeInUp">
  <p className="text-[0.5rem] uppercase font-semibold tracking-[0.12em] text-gray-300 leading-tight animate-fadeIn delay-100">
    The Redeemed Christian
  </p>
  <p className="text-[0.65rem] my-0.5 font-bold tracking-wide leading-tight animate-fadeIn delay-300">
    Church of God
  </p>
  <p className="text-[0.7rem] font-bold text-green-400 leading-tight animate-fadeIn delay-500">
    Living Word Forney
  </p>
</div>

      </div>
    </aside>
  );
};
