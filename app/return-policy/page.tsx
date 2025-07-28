"use client";

import Offer from "@/components/Offer"
import TopNavBar from "@/components/TopNavBar"
import Footer from "@/components/Footer"
import BotpressChat from "@/components/BotpressChat";
import { useRef } from "react";

export default function ReturnPolicy() {
    const tableRef = useRef<HTMLTableElement>(null); // ✅ Type defined here

  const handleCopy = () => {
    if (tableRef.current) {
      const textToCopy = tableRef.current.innerText; // ✅ No more TS error
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert("Form copied to clipboard!"))
        .catch(() => alert("Failed to copy form."));
    }
  };

  return (
    <>
      <Offer />
      <TopNavBar />
      <section className="flex overflow-hidden flex-col justify-center self-stretch px-32 py-16 bg-stone-50 max-md:px-5">
        <header className="flex flex-col justify-center items-center w-full text-black min-w-[200px] max-md:max-w-full">
          <h1 className="text-4xl">Return Policy</h1>
          <p className="mt-2 text-base tracking-normal leading-6">
            Our return and exchange guidelines
          </p>
        </header>
        <div className="flex flex-col justify-center self-center mt-6 max-w-full w-[800px]">
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="prose prose-gray max-w-none">
              <p className="text-base leading-7 mb-6">
                Our main goal is to ensure you are 100% satisfied. We gladly accept returns for exchanges within 5 days of purchase in the original unopened package accompanied with the purchase receipt. Buyer pays the return shipping fee.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-black">Non-Returnable Items</h3>
              <p className="text-base leading-7 mb-4">The following items are non-returnable:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Wearables (this includes costumes, tutus, gloves, stocking/tights/socks, hair pieces, wigs/hair extensions, bikini tops, shoe covers, shirts, pants, etc)</li>
                <li>Cosmetics (prosthetics, facial hair, hairspray)</li>
                <li>Helium Tanks and Fuel Burners</li>
                <li>Unpackaged Inflatables (balloons, beach balls, etc; anything orally inflatable)</li>
                <li>Cardboard Standups</li>
                <li>Anything Edible (candy, chocolate, etc)</li>
                <li>Balloon Weights, Silly String, Large Decoration Props</li>
                <li>Special Effects Machinery (fog machines, disco balls, strobe lights, etc)</li>
                <li>Flags, Sky Lanterns, Oversized Candy Bowls and Glasses</li>
                <li>Any Discounted or Discontinued Item</li>
                <li>No returns or exchanges on balloons, balloon sales are FINAL</li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-4 text-black">Please Note</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>We only replace items if they are defective or damaged.</li>
                <li>All seasonal items can be returned no later than 3 days before the holiday or special occasion.</li>
              </ul>
              
              <p className="text-base leading-7 mb-6">
                If you need to exchange it for the same item, send us an email at support@partyplace.com and follow the return instruction below.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-black">Return Instructions</h3>
              <p className="text-base leading-7 mb-6">
                To ensure accurate credit, please copy and fill out the form below completely and place it in the shipping box with the product you want to return within 14 days of the purchase. Again, only authorized unused products in their unbroken seals and packaging may be returned.
              </p>
              
         <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Copy
        </button>
      </div>

      <div
        ref={tableRef}
        className="grid grid-cols-2 border border-gray-300 text-sm text-black"
      >
        {/* Left Column */}
        <div className="border-r border-gray-300 p-4">
          <p className="font-medium">Party Place & Rentals Returns Team</p>
          <p className="mt-2">Order # <span className="inline-block w-32 border-b border-black align-middle"></span></p>
          <p className="mt-2">1919 Faithon P. Lucas Sr. Blvd, #135</p>
          <p>Mesquite TX 75181</p>
        </div>

        {/* Right Column */}
        <div className="p-4">
          <p className="font-medium">Return Reason Codes</p>
          <p className="mt-2">Defective <span className="inline-block w-40 border-b border-black align-middle"></span></p>
          <p className="mt-1">Damaged <span className="inline-block w-40 border-b border-black align-middle"></span></p>
          <p className="mt-1">Other <span className="inline-block w-40 border-b border-black align-middle"></span></p>
          <p className="mt-4">__</p>
        </div>
      </div>
    </div>

              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm font-medium text-yellow-800">
                  BUYER PAYS FOR THE RETURN SHIPPING FEE AND BE SURE TO INSURE THE PACKAGE FOR YOUR PROTECTION. WE CANNOT ACCEPT PACKAGES RETURNED C.O.D.
                </p>
              </div>
              
              <p className="text-base leading-7">
                An exchange will be shipped within 7 days of the returned package.
              </p>
            </div>
          </div>
        </div>
      </section>
      <BotpressChat />
      <Footer />
    </>
  );
}
