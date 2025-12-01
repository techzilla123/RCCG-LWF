import React from 'react';

export const ComputerIcon: React.FC = () => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[31px] h-[31px]"
    >
      {/* Outer waves */}
      <path
        d="M4 12C4 9.34784 5.05357 6.8043 7.07107 4.7868"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 12C20 9.34784 18.9464 6.8043 16.9289 4.7868"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Inner waves */}
      <path
        d="M7.5 12C7.5 10.5111 8.07946 9.10355 9.11091 8.0721"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16.5 12C16.5 10.5111 15.9205 9.10355 14.8891 8.0721"
        stroke="#FF0000"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Center live dot */}
      <circle cx="12" cy="12" r="3" fill="#FF0000" />
    </svg>
  );
};
