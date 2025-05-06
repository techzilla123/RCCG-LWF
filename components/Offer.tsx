"use client";

import * as React from "react";
import { OfferText } from "./Offer/OfferText";
import { SignUpLink } from "./Offer/SignUpLink";
import { X } from "lucide-react";

const Offer: React.FC = () => {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <>
      <section className="offer-glow w-full flex items-center justify-center gap-4 px-4 py-2 text-black relative rounded-lg shadow-lg">
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

      <style jsx>{`
        @keyframes glow {
          0% {
            background-color: #facc15; /* yellow-400 */
            box-shadow: 0 0 10px #facc15;
          }
          50% {
            background-color: #fde68a; /* yellow-300 */
            box-shadow: 0 0 20px #fde68a;
          }
          100% {
            background-color: #facc15;
            box-shadow: 0 0 10px #facc15;
          }
        }

        .offer-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Offer;
