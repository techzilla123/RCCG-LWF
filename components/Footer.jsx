"use client";

import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaEye } from 'react-icons/fa';

const FooterLinks = () => {
  
  const links = [
    ['Home', 'Partners', 'About'],
    ['Contact', 'Terms', 'Privacy']
  ];

  return (
    <nav className="flex flex-wrap gap-2 justify-center items-start mt-8 w-full max-md:max-w-full">
      {links.map((group, groupIndex) => (
        <div key={groupIndex} className="flex gap-2 items-center min-w-[240px]">
          {group.map((link, linkIndex) => (
            <a
              key={linkIndex}
              href={`#${link.toLowerCase()}`}
              className="gap-2 self-stretch px-6 py-2 my-auto bg-black bg-opacity-0 rounded-[100px] max-md:px-5 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {link}
            </a>
          ))}
        </div>
      ))}
    </nav>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }
  }, []);

  const applyTheme = (mode) => {
    document.documentElement.classList.remove("dark");
    document.documentElement.style.filter = "";

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (mode === "tritanopia") {
      document.documentElement.style.filter = "url('#tritanopia-filter')";
    }
  };

  const toggleTheme = () => {
    let newTheme;
    if (theme === "light") {
      newTheme = "dark";
    } else if (theme === "dark") {
      newTheme = "tritanopia";
    } else {
      newTheme = "light";
    }

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      {theme === "light" ? <FaMoon size={20} /> : theme === "dark" ? <FaEye size={20} /> : <FaSun size={20} />}
    </button>
  );
};

const Footer = () => {
  return (
    <footer className="flex z-0 flex-col px-32 py-24 -mb-0.5 w-full max-md:px-5 max-md:max-w-full" style={{ background: '#001C09' }}>
      <svg width="0" height="0">
        <defs>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0
                      0 0.7 0.3 0 0
                      0 0.3 0.7 0 0
                      0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
      <div className="flex flex-col w-full text-base whitespace-nowrap text-zinc-300 max-md:max-w-full">
        <img
          loading="lazy"
          src="/logwhite.png"
          alt="Company logo"
          className="object-contain self-center w-52 max-w-full aspect-[3.25]"
        />
        <FooterLinks />
      </div>
      <div className="flex gap-3 items-center px-0 py-3 pb-2 mt-8 w-full h-6 border-t border-solid border-t-black border-t-opacity-0 min-h-[24px] max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto w-full h-px border border-solid basis-0 bg-neutral-600 border-neutral-600 min-h-[1px] min-w-[240px] max-md:max-w-full" />
      </div>
      <div className="flex flex-col mt-8 w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
          <p className="text-right self-stretch my-auto text-base text-neutral-500">
            © {new Date().getFullYear()} yctmb. All rights reserved.
          </p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
