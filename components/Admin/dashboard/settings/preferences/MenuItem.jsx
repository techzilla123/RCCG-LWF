import React from 'react';

function MenuItem({ defaultIcon, activeIcon, title, active, onClick }) {
  return (
    <div
      data-layername="menuItem1stLevel"
      className={`flex gap-6 mt-3 w-full h-10 rounded-lg shadow-sm ${active ? 'bg-white' : 'bg-black bg-opacity-0'} min-h-[40px]`}
      onClick={onClick} // Trigger the click handler
      style={{ cursor: 'pointer' }} // Set cursor to pointer when hovering
    >
      <div data-layername="content" className="flex flex-1 shrink gap-2 items-center py-0 pr-2 pl-4 shadow-sm basis-0 size-full">
        <div
          data-layername={active ? 'iconActive' : 'iconDefault'}
          className="flex gap-2.5 items-center self-stretch my-auto w-4"
        >
          <img
            loading="lazy"
            src={active ? activeIcon : defaultIcon} // Conditional image rendering
            className="object-contain self-stretch my-auto w-4 aspect-square"
            alt=""
          />
        </div>
        <div
          data-layername="2ndLevelTitle"
          className={`flex-1 shrink self-stretch my-auto text-sm basis-0 ${active ? 'text-black' : 'text-neutral-500'}`}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
