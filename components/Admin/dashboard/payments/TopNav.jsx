"use client"
import React from 'react';
import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
const menuItems = [
 
  { name: "Log out", icon: "/YCT-paymen/logout.png", link: "/" },
];

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
  // Get the current date in DD/MM/YYYY format
  const getCurrentDate = () => {
    const today = new Date();
    return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  };

  return (
    <div className="relative flex flex-col justify-center self-stretch my-auto h-10 rounded-lg shadow-sm bg-black bg-opacity-0 w-[90px]">
      <div className="flex overflow-hidden flex-1 gap-2 items-center px-2 h-full">
        <div className="flex gap-2.5 items-center self-stretch my-auto w-4">
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3274ae6a86d4e19065986b84df287d69981ce1aafa66f04edfe927166d5aa2a0?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" 
            alt="Calendar Icon" 
            className="object-contain self-stretch my-auto w-4 aspect-square" 
          />
        </div>
        <span className="self-stretch my-auto text-sm text-neutral-70" style={{ width: "110px" }}>
          {getCurrentDate()} {/* Display the current date */}
        </span>
      </div>
    </div>
  );
};
const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative flex items-center gap-2" ref={menuRef}>
      <button
        className="flex gap-2 items-center p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <img
          loading="lazy"
          src="/Vector.png"
          alt="User avatar"
          className="object-contain shrink-0 gap-0 w-7 aspect-square"
        />
        <div className="flex gap-2.5 items-center w-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/14c133e6b8c500272dd10e40e1082fd0c879e6398f4fada1b8c273852798fd39?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772"
            alt=""
            className="object-contain w-4 aspect-square"
          />
        </div>
      </button>

      {isOpen && (
        <nav
          ref={menuRef}
          className="absolute top-full z-50 right-0 flex flex-col self-end p-2 mt-1 w-full bg-white rounded-lg shadow-sm max-w-[200px] border border-gray-200"
          style={{ width: "160px" }}
        >
          {menuItems.map((item, index) => (
            <React.Fragment key={item.name}>
              {index === 2 && <div className="border-t border-gray-300 mx-3 my-2" />}

              <Link
                href={item.link}
                className={`flex items-center gap-2 py-2 px-4 w-full text-sm rounded-md transition duration-200 
                  ${item.name === "Log out" ? "text-red-600 hover:bg-red-50" : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`}
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={16}
                  height={16}
                  className={item.name === "Switch Account" ? "mr-0 w-4 h-4" : ""}
                />
                <span className="text-left whitespace-nowrap">{item.name}</span>
              </Link>
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
  <div className="flex flex-wrap flex-1 shrink gap-2 items-center justify-end h-full basis-0 min-w-[240px] max-md:max-w-full max-sm:hidden" style={{ marginLeft: "0px" }}>
    <CTAButton 
  icon="https://cdn.builder.io/api/v1/image/assets/TEMP/f90281443a83895d8d9d6e0ddfa976bd989b330f0bf866790771040831297800?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" 
  ariaLabel="Notification" 
  onClick={() => location.href = location.href} 
  className="transition-transform duration-300 hover:rotate-12 active:rotate-45"
/>

    <div className="shrink-0 self-stretch w-0 h-9 border border-solid bg-zinc-300 border-zinc-300" role="separator" style={{ marginTop: "10px" }} />
   <MenuDropdown />
    <CTAButton icon="https://cdn.builder.io/api/v1/image/assets/TEMP/e3516a938ee25c75199b3ef21e5ab257cbaf6f81cfa29c4754c60e50aedc8601?placeholderIfAbsent=true&apiKey=487312638bbb418aa183126fc9624772" ariaLabel="Search" />
    {/* <button
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
    </button> */}
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
