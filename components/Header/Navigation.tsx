"use client"

import * as React from "react"
import { NavigationItem } from "./NavigationItem"
import { HamburgerIcon } from "./HamburgerIcon"
import { StartHereDropdown } from "./StartHereDropdown"
import { MinistriesDropdown } from "./MinistriesDropdown"
import { MoreDropdown } from "./MoreDropdown"
import { MobilePopup } from "./MobilePopup"

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [openPopup, setOpenPopup] = React.useState<
    "start" | "ministries" | "more" | null
  >(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev)
    setOpenPopup(null)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setOpenPopup(null)
  }

  return (
    <>
      {/* ================= DESKTOP ================= */}
<nav className="hidden md:flex absolute top-[31px] left-0 right-0 h-[70px] z-[100] justify-center">
        <div className="flex items-center h-[53px] max-w-screen-xl w-full px-4">
          <ul className="flex justify-center items-center gap-1 w-full">
            <NavigationItem label="START HERE" hasDropdown />
            <NavigationItem label="CONTACT" link="/contact" />
            <NavigationItem label="EVENTS" link="/events" />
            <NavigationItem label="GIVE" link="/give" isHighlighted />
            <NavigationItem label="MINISTRIES" hasDropdown />
            <NavigationItem label="MORE" hasDropdown />
          </ul>
        </div>
      </nav>

      {/* ================= MOBILE HAMBURGER ================= */}
      <div className="md:hidden absolute right-4 top-[45px] z-[1000]">
        <HamburgerIcon isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
      </div>

      {/* BACKDROP */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
     <nav
  className={`fixed top-[33px] right-0 h-full w-[85vw] max-w-sm bg-white shadow-xl z-[9999] transform transition-transform duration-300 md:hidden ${
    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col p-4 pt-8 relative">
    {/* ================= CLOSE BUTTON ================= */}
    <button
      onClick={closeMobileMenu}
      className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
      aria-label="Close menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    {/* ================= MENU ITEMS ================= */}
    <ul className="flex flex-col gap-3 mt-6">
      <NavigationItem
        label="START HERE"
        isMobile
        hasDropdown
        onClick={() => setOpenPopup("start")}
      />

      <NavigationItem
        label="MESSAGES"
        isMobile
        onClick={closeMobileMenu}
      />

      <NavigationItem
        label="EVENTS"
        link="/events"
        isMobile
        onClick={closeMobileMenu}
      />

      <NavigationItem
        label="GIVE"
        link="/give"
        isHighlighted
        isMobile
        onClick={closeMobileMenu}
      />

      <NavigationItem
        label="MINISTRIES"
        isMobile
        hasDropdown
        onClick={() => setOpenPopup("ministries")}
      />

      <NavigationItem
        label="MORE"
        isMobile
        hasDropdown
        onClick={() => setOpenPopup("more")}
      />
    </ul>
  </div>
</nav>


      {/* ================= MOBILE POPUPS ================= */}
{openPopup === "start" && (
  <MobilePopup
    title="Start Here"
    onClose={() => setOpenPopup(null)}
  >
    <StartHereDropdown />
  </MobilePopup>
)}

{openPopup === "ministries" && (
  <MobilePopup
    title="Ministries"
    onClose={() => setOpenPopup(null)}
  >
    <MinistriesDropdown />
  </MobilePopup>
)}

{openPopup === "more" && (
  <MobilePopup
    title="More"
    onClose={() => setOpenPopup(null)}
  >
    <MoreDropdown />
  </MobilePopup>
)}


    </>
  )
}
    