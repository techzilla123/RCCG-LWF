"use client";
import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabSectionProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  accentColor: string;
}

export const TabSection: React.FC<TabSectionProps> = ({
  tabs,
  activeTab,
  onTabChange,
  accentColor
}) => {
  return (
    <nav className="flex flex-wrap justify-center w-full text-xl font-extrabold leading-loose text-center text-stone-400 max-md:max-w-full">
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTab;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;

        return (
          <div
            key={tab.id}
            className={`
              ${isFirst ? 'flex flex-col items-start pr-12' : isLast ? 'flex flex-col items-start pb-0.5 pl-12' : 'px-12'}
              pb-0.5 border-b-2 border-solid border-b-stone-400 border-b-opacity-30 max-w-[1590px] min-h-px
              ${isActive ? 'text-slate-800' : ''}
              ${tab.label === 'Middle School' ? 'min-w-60' : ''}
              ${tab.label === 'Awana' || tab.label === 'Discipleship' || tab.label === 'Classes' || tab.label === 'Builders' || tab.label === 'Men' || tab.label === 'Women' ? 'whitespace-nowrap' : ''}
              max-md:px-5 cursor-pointer
            `}
            onClick={() => onTabChange(tab.id)}
          >
            <div className={`flex ${isActive ? 'relative' : ''} flex-col ${isFirst && isActive ? '' : 'justify-center items-center'} py-2`}>
              <div className="text-xl font-extrabold leading-8">
                {tab.label}
              </div>
              {isActive && (
                <div
                  className={`flex absolute inset-x-0 z-0 max-w-full h-2 ${accentColor} bottom-[-5px] min-h-2`}
                  style={{ width: tab.label === 'Kids & Nursery' ? '155px' : '129px' }}
                />
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
};
