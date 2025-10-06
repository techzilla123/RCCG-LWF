"use client"

import * as React from "react"
import { NavigationItem } from "./NavigationItem"
import { HamburgerIcon } from "./HamburgerIcon"

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex absolute top-[31px] left-0 right-0 h-[70px] z-[15] justify-center">
        <div className="flex items-center h-[53px] max-w-screen-xl w-full px-4">
          <ul className="flex flex-wrap justify-center content-center items-center gap-1 w-full">
            <NavigationItem label="START HERE" hasStartHereIcon={true} />
            <NavigationItem label="MESSAGES" link="/contact" />
            <NavigationItem label="EVENTS" link="/events"/>
            <NavigationItem label="GIVE" link="/give" isHighlighted={true} />
            <NavigationItem label="MINISTRIES" link="/ministries" hasDropdown={true} />
            <NavigationItem label="MORE" hasDropdown={true} />
          </ul>
        </div>
      </nav>

      {/* Mobile Hamburger Button */}
      <div className="md:hidden absolute right-4 top-[45px] z-50">
        <HamburgerIcon isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={closeMobileMenu} />
      )}

      {/* Mobile Navigation Drawer */}
      <nav
        className={`fixed top-[33px] right-0 h-[calc(100vh-33px)] w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 pt-8">
          <ul className="flex flex-col gap-2">
            <NavigationItem label="START HERE" hasStartHereIcon={true} isMobile={true} onClick={closeMobileMenu} />
            <NavigationItem label="MESSAGES" isMobile={true} onClick={closeMobileMenu} />
           <NavigationItem
  label="EVENTS"
  isMobile={true}
  link="/events"
  onClick={closeMobileMenu}
/>

            <NavigationItem label="GIVE" isHighlighted={true} isMobile={true}  link="/give" onClick={closeMobileMenu} />
            <NavigationItem label="MINISTRIES" hasDropdown={true}  link="/ministries" isMobile={true} />
            <NavigationItem label="MORE" hasDropdown={true} isMobile={true} />
          </ul>
        </div>
      </nav>
    </>
  )
}
