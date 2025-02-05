import React from "react";

const brandData = [
  {
    name: "YCT MICROFINANCE BANK",
    icon: "/logwhite.png",
  },
];

function PartnersSection() {
  return (
    <section
      data-layername="partners"
      className="flex overflow-hidden z-0 flex-col gap-6 justify-center px-32 py-6 w-full bg-dark_green max-md:px-5 max-md:max-w-full"
      style={{height:"80px"}}
    >
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100vw); } /* Start off-screen */
            100% { transform: translateX(-100%); } /* Move fully left */
          }

          .marquee-container {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            position: relative;
          }

          .animate-marquee {
            display: flex;
            gap: 2rem; 
            animation: marquee 20s linear infinite; /* Slow movement */
            min-width: max-content;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }

          .brand-text {
            font-size: 1.7rem; /* Larger text */
            font-weight: bold;
            color: white;
            opacity: 0.9;
          }
        `}
      </style>

      <div data-layername="brands" className="marquee-container flex items-center">
        <div className="animate-marquee">
          {brandData.map((brand, index) => (
            <div key={index} className="flex gap-6 items-center">
              {brand.icon && (
                <img
                  loading="lazy"
                  src={brand.icon}
                  alt={`${brand.name} logo`}
                  className="w-24 h-24 object-contain" // Bigger icon
                />
              )}
              <div className="brand-text" style={{color:'#08AA3B'}}>--- {brand.name}--- </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
