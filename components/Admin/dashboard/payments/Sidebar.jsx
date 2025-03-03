"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import MenuItem from './MenuItem';

function Sidebar() {
  // State to keep track of the active menu item
  const [activeItem, setActiveItem] = useState('Payments');

  const menuItems = [
    { defaultIcon: "/group.png", activeIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/169987296379ebd575c944ee818f34f7c4db28a62f4cce8b76efbb3ccfc1c480?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", title: "Dashboard", href: "/dashboard/dashboard-overview" },
    { defaultIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0ca88bfbddec7fe885a4f4a0fbe7582977a5eb2f50e2954b7a64273c494034f5?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", activeIcon: "/receipt-text.png", title: "Transactions", href: "/dashboard/transactions" },
    // { defaultIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/75b833f829875f8054a26481bf69414676723d3ca27f94285434efbdaf8b9a47?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", activeIcon: "/profile-2user.png", title: "Users", href: "/dashboard/users" },
    { defaultIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd350191d1d01b79e18ed191735eed9a9300fe0fa823da0bee438f277bf278b3?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", activeIcon: "/tag.png", title: "Payments", href: "/dashboard/payments" },
    { defaultIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/b0566c1b74cc9429eab3c485a13c2ec4060d048ed2fe0fbf8858e5a9c470a9f1?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a", activeIcon: "/setting.png", title: "Settings", href: "/dashboard/settings" }
  ];

  const handleItemClick = (itemTitle) => {
    setActiveItem(itemTitle);
  };

  return (
    <aside data-layername="sideBar1stLevel" className="flex flex-col py-4 pr-2 pl-4 bg-neutral-100 w-[216px] max-sm:hidden">
      <div className="flex flex-col justify-center items-start px-4 py-6 w-full bg-white rounded-lg shadow-sm min-h-[90px]">
        <img loading="lazy" src="/logo.png" className="object-contain max-w-full aspect-[3.25] w-[130px]" alt="Company Logo" />
      </div>
      <nav data-layername="menu" className="flex flex-col flex-1 mt-2 w-full rounded-2xl">
        <div data-layername="divider" className="gap-3 self-stretch px-0 py-1.5 pt-3 pb-2 w-full h-6 text-xs font-medium whitespace-nowrap border-t border-solid  border-t-opacity-0 min-h-[24px] text-neutral-500">
          Management
        </div>
        {menuItems.slice(0, 3).map((item, index) => (
          <Link href={item.href} key={index}>
            <MenuItem
              {...item}
              active={activeItem === item.title} // Compare active state
              onClick={() => handleItemClick(item.title)} // Set active item when clicked
            />
          </Link>
        ))}
        {/* <div data-layername="divider" className="gap-3 self-stretch px-0 py-1.5 pt-3 pb-2 mt-3 w-full h-6 text-xs font-medium whitespace-nowrap border-t border-solid border-t-zinc-300 min-h-[24px] text-neutral-500">
          Account
        </div>
        {menuItems.slice(3).map((item, index) => (
          <Link href={item.href} key={index + 3}>
            <MenuItem
              {...item}
              active={activeItem === item.title} // Compare active state
              onClick={() => handleItemClick(item.title)} // Set active item when clicked
            />
          </Link>
        ))} */}
      </nav>
    </aside>
  );
}

export default Sidebar;
