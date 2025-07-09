import React from "react";

export const FooterContact = () => {
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
          href="mailto:contact@partyplace&rentals.com"
          className="p-2 h-10 whitespace-nowrap rounded-[50px] hover:text-blue-300 transition-colors"
        >
          support@partyplace&rentals.com
        </a>
      </div>
      <div className="flex gap-4 mt-4">
        {[1, 2, 3, 4].map((index) => (
          <a
            key={index}
            href="#"
            className="w-8 h-8 bg-black bg-opacity-0 hover:bg-blue-300/10 transition-colors rounded-full"
            aria-label={`Social media link ${index}`}
          />
        ))}
      </div>
    </section>
  );
};
