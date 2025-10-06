import * as React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: "400", // Regular
  subsets: ["latin"],
});

interface CallToActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function CallToActionButton({ children, onClick }: CallToActionButtonProps) {
  return (
    <button
      className={`flex justify-center items-center px-6 py-3.5 rounded max-md:px-5 text-center text-white uppercase transition-colors duration-300 ${montserrat.className}`}
      style={{
        backgroundColor: "#333064",
        fontSize: "15px",
        lineHeight: "22.2px",
        fontWeight: 400,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#444299";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#333064";
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
