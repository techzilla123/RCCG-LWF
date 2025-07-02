"use client";
import { useState, useEffect } from "react";
import { Logo } from "./TopNavBar/Logo";
import { NavigationLinks } from "./TopNavBar/NavigationLinks";
import { SearchBar } from "./TopNavBar/SearchBar";
import { LanguageSelector } from "./TopNavBar/LanguageSelector";
import { UserActions } from "./TopNavBar/UserActions";
import { Menu, X } from "lucide-react";
import MobileSideDrawer from "./TopNavBar/MobileSideDrawer";

export default function TopNavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset on unmount
    };
  }, [menuOpen]);

  return (
    <header className="w-full bg-white border-b border-gray-300 px-4 py-3 md:px-8 md:py-4">
      
      {/* Top Row: Logo, Hamburger (mobile), and Right Actions */}
      <div className="flex items-center justify-between md:justify-start gap-4">
        
        {/* Left: Hamburger (mobile) + Logo */}
        <div className="flex items-center gap-1 md:gap-3 flex-grow-0">
          <button
            className="block lg:hidden p-2" // Updated to lg:hidden for screens below 1098px
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close Menu" : "Open Menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6 ml-6 flex-1 whitespace-nowrap"> {/* Updated breakpoint to lg */}
          <NavigationLinks />
          <SearchBar />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden lg:flex items-center gap-4"> {/* Updated breakpoint to lg */}
            <LanguageSelector />
          </div>

          {/* Mobile Sign In Button */}
          <UserActions />
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 lg:hidden"> {/* Updated breakpoint to lg */}
        <SearchBar />
      </div>

      {/* Mobile Slide-down Menu */}
      {menuOpen && (
        <MobileSideDrawer isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </header>
  );
}
