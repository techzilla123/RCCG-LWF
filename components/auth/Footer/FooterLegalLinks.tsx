"use client";
import * as React from "react";

export function FooterLegalLinks() {
  return (
    <nav className="flex items-center gap-8">
      <a
        href="/privacy"
        className="text-sm text-[#BFBFBF] hover:text-white transition-colors"
      >
        Privacy Policy
      </a>
      <div className="w-2 h-2 rounded-full bg-[#BFBFBF]" aria-hidden="true" />
      <a
        href="/terms"
        className="text-sm text-[#BFBFBF] hover:text-white transition-colors"
      >
        Terms of Service
      </a>
    </nav>
  );
}
