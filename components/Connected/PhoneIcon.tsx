import React from 'react';

export const PhoneIcon: React.FC = () => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[31px] h-[31px]"
    >
      <rect
        x="4"
        y="3"
        width="23"
        height="25"
        rx="3"
        fill="#FFD166"
      />
      <rect
        x="7"
        y="7"
        width="17"
        height="2.5"
        rx="1.2"
        fill="#EF476F"
      />
      <rect
        x="7"
        y="12"
        width="14"
        height="2.5"
        rx="1.2"
        fill="#06D6A0"
      />
      <rect
        x="7"
        y="17"
        width="11"
        height="2.5"
        rx="1.2"
        fill="#118AB2"
      />
      <rect
        x="7"
        y="22"
        width="15"
        height="2.5"
        rx="1.2"
        fill="#073B4C"
      />

      {/* Pen Icon */}
      <path
        d="M24.7 5.1L26.9 7.3C27.3 7.7 27.3 8.3 26.9 8.7L18 17.6L14.3 18.3L15 14.6L23.9 5.7C24.3 5.3 24.9 5.3 25.3 5.7L24.7 5.1Z"
        fill="#FF6F61"
      />
      <path
        d="M14.3 18.3L18 17.6"
        stroke="#FFC9C5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
