"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Logo from "../public/logo.svg";
import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";

const navData = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [callPopupOpen, setCallPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const contactRef = useRef<HTMLParagraphElement | null>(null);

  const handleContactClick = () => {
    if (contactRef.current) {
      const rect = contactRef.current.getBoundingClientRect();
      setPopupPosition({ top: rect.bottom + window.scrollY + 5, left: rect.left + window.scrollX });
      setCallPopupOpen(!callPopupOpen);
    }
  };
  

  return (
    <nav className="h-[75px] z-50 sticky top-0 w-full shadow-md bg-white flex items-center justify-center">
      <Container className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[40px]">
          <Link href={"/"}>
            <Image src={Logo} alt="image-logo" />
          </Link>
        </div>

        <div className="flex md:hidden items-center">
          <button
            className="flex flex-col gap-[5px] justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
          </button>
        </div>

        <div className="md:flex hidden items-center gap-7">
        <div className="flex items-center gap-5" style={{ marginLeft: "-115px" }}>
  {navData.map(({ name, href }, index) => (
    name === "contact" ? (
      <p
        key={index}
        ref={contactRef}
        onClick={handleContactClick}
        className="text-text_color_01 cursor-pointer hover:text-green"
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </p>
    ) : (
      <Link key={index} href={href} className="text-text_color_01 cursor-pointer hover:text-green">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </Link>
    )
  ))}
</div>


          <Button asChild className="bg-green text-white w-[120px] h-[40px] font-[500] hover:bg-[#00782A] rounded-[1000px]">
            <Link href="/client">Pay Now</Link>
          </Button>

          <Button asChild className="bg-white text-white w-[120px] h-[40px] font-[500] hover:bg-gray-300 rounded-[1000px]">
            <Link href="/client/history" style={{ color: "#000000", border: "1px solid #717171", padding: "8px 16px", textDecoration: "none" }}>
              History
            </Link>
          </Button>
        </div>

        {menuOpen && (
  <div className="absolute top-[75px] left-0 w-full bg-white shadow-md flex flex-col gap-5 p-5 md:hidden">
    {navData.map(({ name, href }, index) => (
      name === "contact" ? (
        <p
          key={index}
          onClick={() => setCallPopupOpen(true)}
          className="text-text_color_01 cursor-pointer hover:text-green"
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      ) : (
        <Link key={index} href={href} className="text-text_color_01 cursor-pointer hover:text-green">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Link>
      )
    ))}

    <Button asChild className="bg-green text-white w-full h-[40px] font-[500] hover:bg-green rounded-[1000px]">
      <Link href="/client">Pay Now</Link>
    </Button>

    <Button asChild className="bg-white text-black w-full h-[40px] font-[500] hover:bg-light-green rounded-[1000px]" style={{ border: "1px solid #717171", textDecoration: "none" }}>
      <Link href="/client/history">History</Link>
    </Button>
  </div>
)}

      </Container>

      {/* Click to Call Popup */}
      {callPopupOpen && (
        <div
          className="absolute bg-white shadow-lg rounded-lg p-3 border border-gray-300 w-56"
          style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px`, position: "absolute" }}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">Click to call</p>
            <button onClick={() => setCallPopupOpen(false)} className="text-gray-500 hover:text-black">✕</button>
          </div>
          <ul className="mt-2">
            {[
              { name: "Eniola", number: "08164393944" },
              { name: "Jerry", number: "09058740068" },
              { name: "Kayode", number: "09069908624" },
              { name: "Sulaiman", number: "09023174193" },
            ].map((contact, index) => (
              <li key={index} className="flex items-center gap-2 mt-1 text-sm">
                📞 <a href={`tel:${contact.number}`} className="text-blue-500 hover:underline">{contact.number}</a> - {contact.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
