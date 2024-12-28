"use client"; // Add this line

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter
import Footer from '@/components/Client/Footer';
import VerificationForm from '@/components/Client/verify/VerificationForm';

function VerifyID() {
  const router = useRouter(); // Initialize useRouter

  // Handle Back button click
  const handleBackClick = () => {
    router.push('/client'); // Navigate to the /client page
  };

  return (
    <div
      className="flex overflow-hidden relative flex-col bg-white"
      style={{ marginTop: "-70px" }} // Corrected the marginTop value and added proper quotation marks
    >
      <main
        className="flex z-0 flex-col self-center px-32 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:max-w-full"
      >
        <section className="flex flex-col flex-1 p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
          <nav className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
            {/* Updated Back Button */}
            <button
              onClick={handleBackClick} // Add onClick handler
              className="flex overflow-hidden gap-2 justify-center items-center self-stretch p-2 my-auto h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px]"
            >
              <img
                loading="lazy"
                src="/backbutton.svg"
                alt=""
                className="object-contain self-stretch my-auto w-4 aspect-square"
              />
              <span className="self-stretch my-auto text-sm font-medium text-center text-neutral-500">
                Back
              </span>
            </button>

            <button className="overflow-hidden gap-2 self-stretch p-2 my-auto h-8 text-sm font-medium text-center border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px] text-neutral-500">
              View History
            </button>
          </nav>

          <VerificationForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default VerifyID;
