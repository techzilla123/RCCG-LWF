'use client';
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../public/logo.svg";
import Link from "next/link";
import Container from "./Container";
import { Button } from "./ui/button";

// Updated navData with explicit hrefs
const navData = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "services", href: "/services" },
  { name: "contact", href: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to track dropdown visibility

  return (
    <nav className="h-[75px] z-50 sticky top-0 w-full shadow-md bg-white flex items-center justify-center">
      <Container className="flex items-center justify-between w-full">
        <div className="flex items-center gap-[40px]">
          <Link href={"/"}>
            <Image src={Logo} alt="image-logo" />
          </Link>
        </div>

        {/* Hamburger menu for mobile */}
        <div className="flex md:hidden items-center">
          <button
            className="flex flex-col gap-[5px] justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Hamburger lines */}
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
            <span className="block w-6 h-[2px] bg-black"></span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className={`md:flex hidden items-center gap-7`}>
          <div className="flex items-center gap-5" style={{ marginLeft: "-115px" }}>
            {/* Explicitly use href from navData */}
            {navData.map(({ name, href }, index) => (
              <Link href={href} key={index}>
                <p
                  className="text-text_color_01 cursor-pointer hover:text-green"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalize name */}
                </p>
              </Link>
            ))}
          </div>

          <Button
            asChild
            className="bg-green text-white w-[120px] h-[40px] font-[500] hover:bg-green rounded-[1000px]"
          >
            <Link href="/client">Pay Now</Link>
          </Button>

          <Button
            asChild
            className="bg-white text-white w-[120px] h-[40px] font-[500] hover:bg-light-green rounded-[1000px]"
          >
            <Link
              href="/client/history"
              style={{
                color: "#000000",
                border: "1px solid #717171",
                padding: "8px 16px",
                textDecoration: "none",
              }}
            >
              History
            </Link>
          </Button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-[75px] left-0 w-full bg-white shadow-md flex flex-col gap-5 p-5 md:hidden">
            {navData.map(({ name, href }, index) => (
              <Link href={href} key={index}>
                <p
                  className="text-text_color_01 cursor-pointer hover:text-green"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)} {/* Capitalize name */}
                </p>
              </Link>
            ))}

            <Button
              asChild
              className="bg-green text-white w-full h-[40px] font-[500] hover:bg-green rounded-[1000px]"
            >
              <Link href="/client">Pay Now</Link>
            </Button>

            <Button
              asChild
              className="bg-white text-black w-full h-[40px] font-[500] hover:bg-light-green rounded-[1000px]"
              style={{ border: "1px solid #717171", textDecoration: "none" }}
            >
              <Link href="/client/history">History</Link>
            </Button>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
