"use client";

import * as React from "react";

export const ShopNavigation: React.FC = () => {
  const tabs = [
    "Birthday themes",
    "Milestone birthday",
    "Pinatas & kits",
    "Birthday assessories",
    "Party favors & games",
    "Decorations",
    "Hats & crown",
  ];

  const [activeTab, setActiveTab] = React.useState(tabs[0]);

  return (
    <nav
      className="flex justify-center max-md:justify-start items-center gap-6 mt-6 -mb-10 z-10 w-full overflow-x-auto whitespace-nowrap"
      role="tablist"
      aria-label="Shop categories"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          role="tab"
          className={`pb-1 text-sm md:text-base font-normal whitespace-nowrap transition-colors border-b-2 ${
            activeTab === tab
              ? "text-black border-black"
              : "text-[rgba(113,113,113,0.3)] border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};
