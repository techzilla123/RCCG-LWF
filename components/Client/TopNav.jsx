import React from 'react';

function TopNav() {
  return (
    <header className="flex absolute inset-x-0 top-0 z-0 flex-wrap gap-10 items-center px-32 py-2 w-full bg-white border-b border-solid border-b-zinc-300 h-[72px] min-h-[72px] max-md:px-5 max-md:max-w-full">
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/448012cb46bd0137694df23ad85024176ec04adfcc9663618453522ab7909109?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a" alt="Company Logo" className="object-contain shrink-0 my-auto aspect-[3.25] w-[130px]" />
      <nav className="flex flex-wrap flex-1 shrink gap-3 items-center h-full text-base whitespace-nowrap basis-0 min-w-[240px] text-neutral-500 max-md:max-w-full max-sm:hidden">
        <a href="#" className="gap-2 self-stretch px-3 py-2 my-auto bg-black bg-opacity-0 rounded-[100px]">Home</a>
        <a href="#" className="gap-2 self-stretch px-3 py-2 my-auto bg-black bg-opacity-0 rounded-[100px]">Partners</a>
        <a href="#" className="gap-2 self-stretch px-3 py-2 my-auto bg-black bg-opacity-0 rounded-[100px]">About</a>
      </nav>
      <div className="flex gap-2 items-center h-full text-sm font-medium text-center text-white w-[120px]">
        <button className="overflow-hidden gap-2 self-stretch px-4 py-3 my-auto h-10 bg-green-600 border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px] w-[120px]">
          Pay Now
        </button>
      </div>
    </header>
  );
}

export default TopNav;