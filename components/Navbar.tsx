'use client';
import React from "react";
import Image from "next/image";
import Logo from "../public/logo.svg";
import Link from "next/link";
import Container from "./Container";
import { navData } from "@/lib/data";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="h-[75px] z-50 sticky top-0 w-full shadow-md bg-white flex items-center justify-center">
      <Container className="flex items-center justify-between w-full" >
        <div className="flex items-center gap-[40px]">
          <Link href={"/"}>
            <Image src={Logo} alt="image-logo" />
          </Link>
        </div>

        <div 
          className="md:flex hidden items-center gap-7"
          // Slightly shift left
        >
          <div className="md:flex hidden items-center gap-5"
          style={{ marginLeft: "-115px" }} >
            {navData.map(({ name }, index) => {
              return (
                <p
                  className="text-text_color_01 cursor-pointer hover:text-green"
                  key={index}
                >
                  {name}
                </p>
              );
            })}
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
  style={{ color: "#000000", border: "1px solid #717171", padding: "8px 16px", textDecoration: "none",}}
>
  History
</Link>
          </Button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
