"use client";

import * as React from "react";
import { OfferText } from "./Offer/OfferText";
import { SignUpLink } from "./Offer/SignUpLink";

const Offer: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);

    const handleTokenChange = () => {
      const updatedToken = localStorage.getItem("accessToken");
      setToken(updatedToken);
    };

    window.addEventListener("accessTokenUpdated", handleTokenChange);

    return () => {
      window.removeEventListener("accessTokenUpdated", handleTokenChange);
    };
  }, []);

  return (
    <>
      <section className="offer-glow w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 px-4 py-3 text-black relative rounded-lg shadow-lg text-sm md:text-base text-center">
        {token ? (
         <div className="flex flex-col md:flex-row md:gap-4 gap-1 items-center justify-center text-center md:text-left">
<p className="font-medium">
  <a href="/shop" className="text-blue-600 hover:underline">Shop now</a> and <span className="text-pink-600">enjoy</span> your exclusive <span className="text-blue-600">discount!</span>
</p>


  <p className="text-gray-700 text-sm">
    🤔 Need help?{" "}
    <a
      href="mailto:support@example.com"
      className="text-blue-600 hover:underline"
    >
      Contact us
    </a>
  </p>
</div>

        ) : (
          <div className="flex flex-col md:flex-row flex-wrap gap-2 items-center justify-center">
            <OfferText />
            <SignUpLink />
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes glow {
          0% {
            background-color: #facc15;
            box-shadow: 0 0 10px #facc15;
          }
          50% {
            background-color: #fde68a;
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
