interface HeartIconProps {
    filled?: boolean;
  }
  
  export const HeartIcon: React.FC<HeartIconProps> = ({ filled }) => {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={filled ? "#FF0033" : "none"}
        xmlns="http://www.w3.org/2000/svg"
        className="w-[14px] h-[14px]"
      >
        <path
          d="M7 12.25C7 12.25 1.3125 9.1875 1.3125 5.57812C1.3125 4.79491 1.62363 4.04377 2.17745 3.48995C2.73127 2.93613 3.48241 2.625 4.26562 2.625C5.50102 2.625 6.55922 3.2982 7 4.375C7.44078 3.2982 8.49898 2.625 9.73438 2.625C10.5176 2.625 11.2687 2.93613 11.8225 3.48995C12.3764 4.04377 12.6875 4.79491 12.6875 5.57812C12.6875 9.1875 7 12.25 7 12.25Z"
          stroke={filled ? "none" : "black"}
          fill={filled ? "#FF0033" : "none"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  