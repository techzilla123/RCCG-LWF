"use client";

import * as React from "react";
import { OfferText } from "./Offer/OfferText";
import { SignUpLink } from "./Offer/SignUpLink";
import { X } from "lucide-react";

const Offer: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <section className="w-full flex items-center justify-center gap-4 px-4 py-2 text-black bg-yellow-400 relative">
      <div className="flex flex-wrap gap-2 items-center justify-center text-center">
        <OfferText />
        <SignUpLink />
      </div>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition"
        onClick={() => setVisible(false)}
        aria-label="Close offer"
      >
        <X className="w-4 h-4" />
      </button>
    </section>
  );
};

export default Offer;
