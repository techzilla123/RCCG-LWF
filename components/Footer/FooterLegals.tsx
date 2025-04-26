import React from "react";
import { FooterNewsletter } from "./FooterNewsletter";

export const FooterLegals = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start gap-6 px-8 md:px-20 lg:px-32 py-6 border-t border-solid border-t-[color:var(--colour-fill-info-focus,#8CC3FF)]">
      <nav className="flex gap-4 flex-wrap text-white text-sm">
        <a
          href="/privacy"
          className="pt-2 pb-4 hover:text-blue-300 transition-colors"
        >
          Privacy Policy
        </a>
        <div className="w-2 h-2 bg-blue-300 rounded-full self-center" style={{marginTop: "-6px"}} />
        <a
          href="/terms"
          className="pt-2 pb-4 hover:text-blue-300 transition-colors"
        >
          Terms of Service
        </a>
      </nav>
      <div className="w-full md:w-auto">
        <FooterNewsletter />
      </div>
    </section>
  );
};
