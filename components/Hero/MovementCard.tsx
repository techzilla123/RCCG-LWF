import * as React from "react";

interface MovementCardProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const MovementCard: React.FC<MovementCardProps> = ({
  imageSrc,
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div
      className={`group relative flex flex-col flex-1 shrink 
        -mt-[80px] sm:-mt-[60px] md:-mt-[100px] 
        px-2 sm:px-4 md:px-5 
        pt-20 sm:pt-28 md:pt-44 
        pb-4 sm:pb-6 md:pb-8 
        basis-0 min-h-[200px] sm:min-h-[260px] md:min-h-[300px] 
        min-w-[150px] sm:min-w-[200px] md:min-w-60 
        overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg 
        transition-transform duration-500 hover:scale-105 hover:shadow-2xl ${className}`}
    >
      {/* Background image with zoom on hover */}
      <img
        src={imageSrc}
        className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110"
        alt=""
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

      {/* Text */}
      <div className="relative z-10 pb-1 sm:pb-2 md:pb-3 w-full text-center">
        <h3 className="text-lg sm:text-xl md:text-3xl font-semibold leading-5 sm:leading-6 md:leading-8 text-white uppercase tracking-wide">
          {title}
          {subtitle && (
            <>
              <br />
              {subtitle}
            </>
          )}
        </h3>
      </div>
    </div>
  );
};
