"use client";
import React from "react";
import { Mail, Phone, MapPin, X } from "lucide-react";

interface FooterLinksProps {
  title: string;
  links: string[];
  onClickMap?: { [key: string]: () => void };
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ title, links, onClickMap = {} }) => {
  const [showModal, setShowModal] = React.useState(false);
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Close modal on outside click or Escape key
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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

  // Extend onClickMap with local Help handler
 const combinedOnClickMap: { [key: string]: () => void } = {
  ...onClickMap,
  Help: () => setShowModal(true),
};


  const getHref = (link: string) => {
    switch (link) {
      case "Balloons": return "/shop/balloon";
      case "Birthday": return "/shop/birthday";
      case "Holidays & Occasions": return "/shop/holiday";
      case "Party Supplies": return "/shop/party-supplies";
      case "Party Rentals": return "/rentals";
      case "Adults Specials": return "/shop";
      case "Decorations": return "/shop/decorations";
      case "About": return "/about";
      case "FAQ": return "/faq";
      case "Contact": return "/contact";
      case "Help": return "/help";
      case "Return Policy": return "/return-policy";
      default: return "#";
    }
  };

  return (
    <>
      <nav className="flex flex-col min-w-[200px] max-w-[250px] flex-1 text-left">
        <h2 className="text-base font-semibold text-blue-300">{title}</h2>
        <ul className="flex flex-col mt-4 text-white">
          {links.map((link, index) => {
            const onClick = combinedOnClickMap[link];
            return (
              <li
                key={index}
                className="w-full p-2 rounded-[50px] hover:text-blue-300 transition-colors"
              >
                {onClick ? (
                  <button onClick={onClick} className="text-left w-full">{link}</button>
                ) : (
                  <a href={getHref(link)}>{link}</a>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Modal */}
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

          <h2 className="text-xl font-bold text-center mb-2">Need Help?</h2>
<p className="text-sm text-center text-gray-600 mb-6">Kindly contact us</p>


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
                  <a href="tel:+14692482060" className="text-gray-900 hover:underline">
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

      {/* Animation styles */}
      <style jsx>{`
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

        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
};
