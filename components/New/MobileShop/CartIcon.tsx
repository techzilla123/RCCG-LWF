interface CartIconProps {
  filled?: boolean;
}

export const CartIcon: React.FC<CartIconProps> = ({ filled }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[14px] h-[14px] transition-colors duration-300"
    >
      {/* Cart Body */}
      <path
        d="M0.875 1.75H2.1875L4.19727 8.98406C4.24841 9.1683 4.3585 9.33071 4.51069 9.44646C4.66288 9.56221 4.8488 9.62492 5.04 9.625H10.4453C10.6366 9.62504 10.8227 9.56238 10.975 9.44662C11.1273 9.33087 11.2374 9.16839 11.2886 8.98406L12.6875 3.9375H2.79508Z"
        fill={filled ? "black" : "none"}
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Left Wheel */}
      <path
        d="M4.8125 12.4688C5.17494 12.4688 5.46875 12.1749 5.46875 11.8125C5.46875 11.4501 5.17494 11.1562 4.8125 11.1562C4.45006 11.1562 4.15625 11.4501 4.15625 11.8125C4.15625 12.1749 4.45006 12.4688 4.8125 12.4688Z"
        fill="black"
      />

      {/* Right Wheel */}
      <path
        d="M10.5 12.4688C10.8624 12.4688 11.1562 12.1749 11.1562 11.8125C11.1562 11.4501 10.8624 11.1562 10.5 11.1562C10.1376 11.1562 9.84375 11.4501 9.84375 11.8125C9.84375 12.1749 10.1376 12.4688 10.5 12.4688Z"
        fill="black"
      />
    </svg>
  );
};
