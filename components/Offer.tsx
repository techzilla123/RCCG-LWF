"use client";

import * as React from "react";
import { OfferText } from "./Offer/OfferText";
import { SignUpLink } from "./Offer/SignUpLink";
import { Mail, Phone, MapPin, X } from "lucide-react";

const Offer: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null);
  const [showModal, setShowModal] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

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

  // Close modal on outside click or Escape key
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showModal]);

  return (
    <>
      <section className="offer-glow w-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 px-4 py-3 text-black relative rounded-lg shadow-lg text-sm md:text-base text-center">
        {token ? (
          <div className="flex flex-col md:flex-row md:gap-4 gap-1 items-center justify-center text-center md:text-left">
            <p className="font-medium">
              <a href="/shop" className="text-blue-600 hover:underline">
                Shop now
              </a>{" "}
              and <span className="text-pink-600">enjoy</span> your exclusive{" "}
              <span className="text-blue-600">discount!</span>
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="text-blue-600 hover:underline font-semibold focus:outline-none transition duration-300 ease-in-out"
            >
              Contact us
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row flex-wrap gap-2 items-center justify-center">
            <OfferText />
            <SignUpLink />
          </div>
        )}
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div
            ref={modalRef}
            className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-6 animate-fadeIn relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-center mb-6">Contact Us</h2>

            <div className="space-y-5 text-gray-800 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="text-blue-500 w-5 h-5 mt-1" />
                <div>
                  <div className="text-gray-500 text-xs">Email</div>
                  <a
                    href="mailto:support@partyplaceandrentals.com"
                    className="text-blue-700 hover:underline break-all"
                  >
                    support@partyplaceandrentals.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="text-green-500 w-5 h-5 mt-1" />
                <div>
                  <div className="text-gray-500 text-xs">Phone</div>
                  <a
                    href="tel:+14692482060"
                    className="text-gray-900 hover:underline"
                  >
                    +1 (469) 248-2060
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="text-red-500 w-5 h-5 mt-1" />
                <div>
                  <div className="text-gray-500 text-xs">Address</div>
                  <div className="text-gray-900 leading-snug">
                    1919 Faithon P Lucas Sr. Blvd,<br />
                    #135, Mesquite, TX 75181
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .offer-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
};

export default Offer;
