"use client"
import React, { useState } from 'react';

const CTAButton = ({ icon, text, ariaLabel, className = '' }) => (
  <button
    className={`flex overflow-hidden gap-2 justify-center items-center self-stretch px-3 py-2 my-auto h-8 border border-solid border-black border-opacity-0 min-h-[32px] rounded-[1000px] ${className}`}
    aria-label={ariaLabel}
  >
    {text && (
      <span className="self-stretch my-auto text-sm font-medium text-center">
        {text}
      </span>
    )}
    {icon && (
      <div className="flex gap-2.5 items-center self-stretch my-auto w-4">
        <img loading="lazy" src={icon} alt="" className="object-contain self-stretch my-auto w-4 aspect-square" />
      </div>
    )}
  </button>
);

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Past Week'); // Add state for the selected option

  const handleSelection = (option) => {
    setSelectedOption(option); // Update selected option
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative flex flex-col justify-center self-stretch my-auto h-10 rounded-lg shadow-sm bg-black bg-opacity-0 w-[126px]">
      <button
        className="flex overflow-hidden flex-1 gap-2 items-center px-2 h-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="flex gap-2.5 items-center self-stretch my-auto w-4">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/3274ae6a86d4e19065986b84df287d69981ce1aafa66f04edfe927166d5aa2a0?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" alt="" className="object-contain self-stretch my-auto w-4 aspect-square" />
        </div>
        <span className="self-stretch my-auto text-sm text-neutral-500" style={{ width: "110px" }}>
          {selectedOption} {/* Show the selected option */}
        </span>
        <div className={`flex gap-2.5 items-center self-stretch my-auto w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1a13b375fb2dc02e0b40f84353469445e86f3172204e66e5ed691fa798bc40a?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" alt="" className="object-contain self-stretch my-auto w-3 aspect-square" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-lg shadow-md">
          <ul className="flex flex-col">
            {['Past 24 hours', 'Past week', 'Past month', 'Past quarter', 'Past 6 months', 'Past year'].map((item, index) => (
              <li key={index} className="w-full">
                <button
                  className="w-full text-left py-2 px-4 text-sm text-neutral-500 hover:bg-gray-100"
                  onClick={() => handleSelection(item)} // Set the selected option on click
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      <button
        className="flex gap-2 items-center p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bbcece132fc3258893233235810b0e0cd7a41e2bd24367e8bcc80594b4aada2?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" alt="User avatar" className="object-contain shrink-0 gap-0 w-7 aspect-square" />
        <div className="flex gap-2.5 items-center w-4">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/14c133e6b8c500272dd10e40e1082fd0c879e6398f4fada1b8c273852798fd39?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" alt="" className="object-contain w-4 aspect-square" />
        </div>
      </button>
      {isOpen && (
        <nav className="absolute top-full right-0 flex flex-col self-end p-2 mt-1 w-full bg-white rounded-lg shadow-sm max-w-[160px]" style={{ width: "200px" }}>
          {['Profile', 'Settings', 'Switch Account', 'Log out'].map((item, index) => (
            <React.Fragment key={item}>
              {index === 2 && (
                <div className="flex gap-3 items-center px-0 py-3 pb-2 w-full h-6 border-t border-solid border-t-opacity-0 min-h-[24px]">
                  <div className="flex-1 shrink self-stretch my-auto w-full h-px min-h-0 border border-solid basis-0 bg-zinc-300 border-zinc-300" />
                </div>
              )}
              <a
                href="#"
                className={`flex overflow-hidden gap-2 items-center py-0 pr-2 pl-3 w-full h-10 text-sm whitespace-nowrap rounded-lg shadow-sm bg-black bg-opacity-0 min-h-[40px] ${item === 'Log out' ? 'text-red-600' : 'text-neutral-500'}`}
              >
                <span className="flex-1 shrink my-auto basis-0">{item}</span>
              </a>
            </React.Fragment>
          ))}
        </nav>
      )}
    </div>
  );
};

const LeftSection = () => (
  <div className="flex flex-wrap flex-1 shrink gap-3 h-full basis-0 min-w-[240px] max-md:max-w-full">
    <button className="flex gap-2.5 items-center p-2 my-auto w-9 h-9 rounded-lg bg-black bg-opacity-0" aria-label="Toggle sidebar">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/44ca6774a1ba2f7faf97318edea0099f748390829095236d8983b05f1d5c48e0?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" alt="" className="object-contain self-stretch my-auto w-5 aspect-square" />
    </button>
    <div className="shrink-0 w-0 h-9 border border-solid bg-zinc-300 border-zinc-300" role="separator" style={{ marginTop: "10px" }} />
    <div className="flex flex-col flex-1 shrink justify-center font-medium basis-4 min-w-[240px] max-md:max-w-full">
      <h1 className="text-2xl text-black">Welcome back!</h1>
      <p className="mt-1 text-xs text-neutral-500">You are an admin</p>
    </div>
  </div>
);

const RightSection = () => (
  <div className="flex flex-wrap flex-1 shrink gap-2 items-center justify-end h-full basis-0 min-w-[240px] max-md:max-w-full max-sm:hidden" style={{ marginLeft: "200px" }}>
    <CTAButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f90281443a83895d8d9d6e0ddfa976bd989b330f0bf866790771040831297800?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" ariaLabel="Notification" />
    <div className="shrink-0 self-stretch w-0 h-9 border border-solid bg-zinc-300 border-zinc-300" role="separator" style={{ marginTop: "10px" }} />
    <MenuDropdown />
    <CTAButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e3516a938ee25c75199b3ef21e5ab257cbaf6f81cfa29c4754c60e50aedc8601?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" ariaLabel="Search" />
    <button
      style={{ background: "#08AA3B" }}
      className="flex gap-2 items-center px-4 py-2 text-white rounded-full font-medium h-8"
      aria-label="Invite"
    >
      Invite
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d51500e59c9aa4c154c7b81d0f489e29e1be53f095d114a70f4ef43875efa57e?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772"
        alt=""
        className="object-contain w-4 h-4 ml-2 aspect-square"
      />
    </button>
    {/* User Profile */}
    <UserProfile />
  </div>
);

const TopNav = () => {
  return (
    <header className="flex flex-wrap gap-2 p-4 w-full bg-white rounded-lg min-h-[68px] max-md:max-w-full border-b-2">
      <LeftSection />
      <RightSection />
    </header>
  );
};

export default TopNav;
