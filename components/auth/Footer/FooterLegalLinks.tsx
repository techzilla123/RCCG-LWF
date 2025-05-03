"use client";
import * as React from "react";

export function FooterLegalLinks() {
  return (
    <nav className="flex items-center gap-8">
      <a
        href="/privacy-policy"
        className="text-sm text-[#BFBFBF] hover:text-white transition-colors"
      >
        Privacy Policy
      </a>
      <div className="w-2 h-2 rounded-full bg-[#BFBFBF]" aria-hidden="true" />
      <a
        href="/terms-of-service"
        className="text-sm text-[#BFBFBF] hover:text-white transition-colors"
      >
        Terms of Service
      </a>
    </nav>
  );
}
