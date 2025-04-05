import React from 'react';

function Footer() {
  return (
    <footer
      className="w-full mt-auto bg-[#001C09] text-white px-6 md:px-32 py-6 text-sm md:text-base"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <a
          href="mailto:support@yctmb.com"
          className="text-[#08AA3B] hover:underline"
        >
          support@yctmb.net
        </a>
        <p className="text-neutral-400">
          © {new Date().getFullYear()} yctmb. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
