"use client";

import React, { useState } from 'react';

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

const EmailCapture = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-start self-stretch my-auto text-sm min-w-[240px] max-md:max-w-full">
      <div className="flex flex-col min-h-[40px] min-w-[240px] text-neutral-500 w-[280px]">
        <div className="flex flex-col flex-1 w-full">
          <div className="flex overflow-hidden flex-1 gap-2 items-center px-3.5 py-2.5 bg-white rounded-lg border border-solid shadow-sm border-neutral-600 size-full">
            <label htmlFor="emailInput" className="sr-only">Enter your email</label>
            <input
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 shrink gap-2 self-stretch my-auto w-full min-w-[240px] bg-transparent border-none outline-none"
              required
              aria-required="true"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="overflow-hidden gap-2 self-stretch px-4 py-3 h-10 font-medium text-center text-white whitespace-nowrap  border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px] w-[137px] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        style={{ background: '#08AA3B' }} >
        Subscribe
      </button>
    </form>
  );
};

const Footer = () => {
  return (
    <footer className="flex z-0 flex-col px-32 py-24 -mb-0.5 w-full  max-md:px-5 max-md:max-w-full"
    style={{ background: '#001C09' }}>
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
          <EmailCapture />
          <p className="self-stretch my-auto text-base text-neutral-500">
            © {new Date().getFullYear()} yctmb. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
