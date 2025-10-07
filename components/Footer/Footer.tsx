"use client";
import React from "react";

export default function Footer() {
  const navItems = [
    { label: "About us", href: "/about" },
    { label: "Give", href: "/give" },
    { label: "Events", href: "/events" },
    { label: "Groups", href: "/groups" },
    { label: "Ministries", href: "/ministries" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <footer className="relative w-full overflow-hidden text-white">
      {/* Background with curved top */}
      <div className="absolute inset-0 bg-[#333064]">
        <svg
          className="absolute top-0 left-0 w-full h-auto"
          viewBox="0 0 1441 247"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 247H1441V23.3087C1200.83 7.76957 960.667 0 720.5 0C480.333 0 240.167 7.76957 0 23.3087V247Z"
            fill="#333064"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-14 md:py-20">
        {/* Top section: Navigation and Social Icons */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-5 md:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-base text-zinc-300 hover:text-white transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-6">
            {/* Facebook */}
            <a
              href="#"
              className="text-zinc-300 hover:text-white transition-colors duration-200"
              aria-label="Facebook"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13.5517 24H2.04917C1.31688 24 0.723633 23.4068 0.723633 22.6753V1.32461C0.723633 0.592925 1.31697 0 2.04917 0H23.4149C24.1469 0 24.7403 0.592925 24.7403 1.32461V22.6753C24.7403 23.4069 24.1468 24 23.4149 24H17.2948V14.7059H20.4166L20.884 11.0838H17.2948V8.77132C17.2948 7.72264 17.5862 7.00801 19.091 7.00801L21.0104 7.00717V3.76755C20.6784 3.7234 19.5391 3.62478 18.2135 3.62478C15.4463 3.62478 13.5517 5.31276 13.5517 8.4126V11.0838H10.4219V14.7059H13.5517V24Z" />
              </svg>
            </a>

            {/* Twitter */}
            <a
              href="#"
              className="text-zinc-300 hover:text-white transition-colors duration-200"
              aria-label="Twitter"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M23.444 4.834c-.815.362-1.69.605-2.606.715a4.52 4.52 0 0 0 1.984-2.497 9.04 9.04 0 0 1-2.864 1.094A4.51 4.51 0 0 0 16.616 3a4.514 4.514 0 0 0-4.514 4.514c0 .353.04.698.116 1.029-3.753-.188-7.086-1.986-9.314-4.72a4.505 4.505 0 0 0-.612 2.27 4.514 4.514 0 0 0 2.008 3.76 4.498 4.498 0 0 1-2.045-.565v.057a4.513 4.513 0 0 0 3.62 4.423 4.523 4.523 0 0 1-2.04.078 4.514 4.514 0 0 0 4.216 3.134A9.06 9.06 0 0 1 2 19.54a12.77 12.77 0 0 0 6.92 2.03c8.302 0 12.844-6.877 12.844-12.844 0-.196-.004-.392-.013-.586a9.2 9.2 0 0 0 2.27-2.34z"
                />
              </svg>
            </a>

            {/* Vimeo */}
            <a
              href="#"
              className="text-zinc-300 hover:text-white transition-colors duration-200"
              aria-label="Vimeo"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.522 5.97c-.083 1.873-1.327 4.574-3.73 8.102-2.54 3.75-4.75 5.627-6.63 5.627-1.083 0-2.02-.945-2.81-2.836L7.98 11.91c-.83-2.55-1.563-3.825-2.203-3.825-.166 0-.637.27-1.414.809L3 7.136c1.073-.98 2.14-1.957 3.203-2.93C7.707 2.93 8.646 2.348 9.36 2.28c1.7-.17 2.727.942 3.08 3.338l.77 4.635c.417 2.47.98 3.705 1.688 3.705.555 0 1.305-.797 2.25-2.39.945-1.59 1.47-2.804 1.575-3.64.187-1.383-.342-2.08-1.582-2.08-.527 0-1.11.126-1.75.377C17.17 2.74 19.61.917 23 .917c2.25.062 3.36 1.602 3.36 5.053z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              className="text-zinc-300 hover:text-white transition-colors duration-200"
              aria-label="YouTube"
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19.615 3.184A2.994 2.994 0 0 0 17.53 2.5C15.09 2.37 12.64 2.37 10.2 2.5A2.992 2.992 0 0 0 8.115 3.184C6.37 3.97 6.27 5.93 6.25 8.75v6.5c.02 2.82.12 4.78 1.865 5.566A2.992 2.992 0 0 0 10.2 21.5c2.44.13 4.89.13 7.33 0a2.992 2.992 0 0 0 2.085-.684c1.745-.786 1.845-2.746 1.865-5.566v-6.5c-.02-2.82-.12-4.78-1.865-5.566zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-zinc-300/20 mb-8" />

        {/* Bottom section: Copyright and Legal Links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-zinc-300">
          <p className="text-center md:text-left opacity-80">
            © 2025 RCCG Living Word Forney. All rights reserved.
          </p>
          <div className="flex items-center justify-center md:justify-end gap-5">
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
