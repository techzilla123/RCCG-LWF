"use client"; 

import * as React from "react";

export const ShopNavigation: React.FC = () => {
  const tabs = [
    "Theme party",
    "Tablewares & servewares",
    "Linens",
    "Party favors",
    "Customized supplies",
    "Catering & baking",  
  ];

  const [activeTab, setActiveTab] = React.useState(0); // Use index instead of the tab name

  // Function to go to the next tab
  const handleNextTab = () => {
    setActiveTab((prev) => (prev + 1) % tabs.length); // Loop to the first tab if at the last one
  };

  // Function to go to the previous tab
  const handlePreviousTab = () => {
    setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length); // Loop to the last tab if at the first one
  };

  return (
    <nav
      className="flex flex-col md:flex-row md:justify-center items-center gap-6 mt-6 -mb-10 z-10 w-full overflow-x-auto whitespace-nowrap"
      role="tablist"
      aria-label="Shop categories"
    >
      {/* Desktop view */}
      <div className="hidden md:flex gap-6">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            role="tab"
            className={`pb-1 text-sm md:text-base font-normal whitespace-nowrap transition-colors border-b-2 ${
              activeTab === index
                ? "text-black border-black"
                : "text-[rgb(60,60,60)] border-[rgba(113,113,113,0)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mobile view */}
      <div className="flex flex-col items-center md:hidden relative z-50 overflow-visible w-full">
        <div className="flex items-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={handlePreviousTab}
            className="text-lg font-semibold"
            aria-label="Previous tab"
          >
            ←
          </button>

          {/* Active Tab Display */}
          <button
            onClick={() => {}}
            className={`pb-1 text-sm font-normal whitespace-nowrap transition-colors border-b-2 mb-2 ${
              activeTab !== null
                ? "text-black border-black"
                : "text-[rgb(60,60,60)] border-[rgba(113,113,113,0)]"
            }`}
          >
            {tabs[activeTab]}
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNextTab}
            className="text-lg font-semibold"
            aria-label="Next tab"
          >
            →
          </button>
        </div>
      </div>
    </nav>
  );
};
