import React from 'react';

function Footer() {
  return (
    <footer className="flex z-0 flex-col justify-center px-32 py-4 w-full text-base bg-neutral-950 max-md:px-5 max-md:max-w-full"
    style={{ background: '#001C09' }}>
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <a href="mailto:support@yctmb.com" className="self-stretch my-auto text-green-600 w-[150px]"
        style={{ color: '#08AA3B' }}>
          support@yctmb.net
        </a>
        <p className="self-stretch my-auto text-neutral-500">
          © {new Date().getFullYear()} yctmb. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;