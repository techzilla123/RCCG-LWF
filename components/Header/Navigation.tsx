"use client"

import * as React from "react"
import { NavigationItem } from "./NavigationItem"
import { HamburgerIcon } from "./HamburgerIcon"
import { StartHereDropdown } from "./StartHereDropdown"
import { MinistriesDropdown } from "./MinistriesDropdown"
import { MoreDropdown } from "./MoreDropdown"

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [openMobileDropdown, setOpenMobileDropdown] = React.useState<
    "start" | "ministries" | "more" | null
  >(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setOpenMobileDropdown(null)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setOpenMobileDropdown(null)
  }

  const toggleDropdown = (key: "start" | "ministries" | "more") => {
    setOpenMobileDropdown(prev => (prev === key ? null : key))
  }

  return (
    <>
      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <nav className="hidden md:flex absolute top-[31px] left-0 right-0 h-[70px] z-[15] justify-center">
        <div className="flex items-center h-[53px] max-w-screen-xl w-full px-4">
          <ul className="flex flex-wrap justify-center content-center items-center gap-1 w-full">
            <NavigationItem label="START HERE" hasDropdown />
            <NavigationItem label="CONTACT" link="/contact" />
            <NavigationItem label="EVENTS" link="/events" />
            <NavigationItem label="GIVE" link="/give" isHighlighted />
            <NavigationItem label="MINISTRIES" link="/ministries" hasDropdown />
            <NavigationItem label="MORE" hasDropdown />
          </ul>
        </div>
      </nav>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden absolute right-4 top-[45px] z-50">
        <HamburgerIcon isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <nav
        className={`fixed top-[33px] right-0 h-full w-[85vw] max-w-sm bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-4 pt-8 overflow-y-auto">
          <ul className="flex flex-col gap-2">

            {/* START HERE */}
            <NavigationItem
              label="START HERE"
              isMobile
              hasDropdown
              onClick={() => toggleDropdown("start")}
            />
            {openMobileDropdown === "start" && (
              <div className="relative pl-3">
                <StartHereDropdown />
              </div>
            )}

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

            {/* MINISTRIES */}
            <NavigationItem
              label="MINISTRIES"
              isMobile
              hasDropdown
              onClick={() => toggleDropdown("ministries")}
            />
            {openMobileDropdown === "ministries" && (
              <div className="relative pl-3">
                <MinistriesDropdown />
              </div>
            )}

            {/* MORE */}
            <NavigationItem
              label="MORE"
              isMobile
              hasDropdown
              onClick={() => toggleDropdown("more")}
            />
            {openMobileDropdown === "more" && (
              <div className="relative pl-3 overflow-x-auto">
                <MoreDropdown />
              </div>
            )}
          </ul>
        </div>
      </nav>
    </>
  )
}
