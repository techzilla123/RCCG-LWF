"use client"; // Add this line to ensure it's treated as a Client Component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import Footer from '@/components/Client/Footer';
import VerificationForm from '@/components/Client/history/verify/VerificationForm';

function VerifyID() {
  const router = useRouter(); // Initialize useRouter
   
  
    useEffect(() => {
      const email = localStorage.getItem("userEmail");
      if (!email) {
        router.replace('/client/history'); // Redirect if email is missing
      }
    }, [router]);
  
  // Handle Back button click
  const handleBackClick = () => {
    router.push('/client/history'); // Navigate to the /client/history page
  };

  return (
    <div className="flex overflow-hidden relative flex-col bg-white">
      <main
        className="flex z-0 flex-col self-center px-32 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:max-w-full"
        style={{ marginTop: '-70px' }}
      >
        <section className="flex flex-col flex-1 p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
          <nav className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
            
            {/* Corrected Back Button with closing tag */}
            <button
              onClick={handleBackClick}
              className="flex overflow-hidden gap-2 justify-center items-center self-stretch p-2 my-auto h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px]"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe109507244c2c1e02678c8236aa99b51e6356bffd4eb839005947f56c0c93fc?placeholderIfAbsent=true&apiKey=73dffa2d4bac468cb175120cf834230a"
                alt=""
                className="object-contain self-stretch my-auto w-4 aspect-square"
              />
              <span className="self-stretch my-auto text-sm font-medium text-center text-neutral-500">
                Back
              </span>
            </button> {/* Added missing closing tag */}
           
          </nav>
          
          <VerificationForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default VerifyID;
