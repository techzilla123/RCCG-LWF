"use client";
import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Music2, // we'll use Music2 as a TikTok placeholder icon
} from "lucide-react";

export const FooterContact = () => {
  const socialLinks = [
    { icon: <Facebook className="w-4 h-4" />, href: "https://facebook.com" },
    { icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com" },
    { icon: <Music2 className="w-4 h-4" />, href: "https://tiktok.com" },
    { icon: <Twitter className="w-4 h-4" />, href: "https://x.com" }, // Twitter is now X
  ];

  return (
    <section className="flex flex-col min-w-[200px] max-w-[250px] flex-1 text-left">
      <h2 className="text-base font-semibold text-blue-300">Contact</h2>
      <div className="flex flex-col mt-4 text-white">
        <a
          href="tel:+10123456789"
          className="p-2 h-10 rounded-[50px] hover:text-blue-300 transition-colors"
        >
          +1 (469) 248-2060
        </a>
        <a
          href="mailto:support@partyplace&rentals.com"
          className="p-2 h-10 whitespace-nowrap rounded-[50px] hover:text-blue-300 transition-colors"
        >
          support@partyplace&rentals.com
        </a>
      </div>

      <div className="flex gap-4 mt-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-blue-300/10 transition-colors rounded-full flex items-center justify-center"
            aria-label={`Social media link ${index}`}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </section>
  );
};
