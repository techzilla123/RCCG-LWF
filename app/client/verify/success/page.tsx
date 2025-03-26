"use client"
import React, { useEffect } from 'react';

import Footer from '@/components/Client/Footer';
import SuccessModal from '@/components/Client/verify/success/SuccessModal';

function PaymentSuccess() {
  
    useEffect(() => {
      localStorage.removeItem("userEmail"); // ✅ Clear email on success
    }, []);
    
  return (
    <div className="flex overflow-hidden relative flex-col bg-white"
    style={{ marginTop: "-70px" }}>
      
      <main className="flex z-0 flex-col self-center px-32 pt-24 pb-6 w-full bg-neutral-100 min-h-[800px] max-md:px-5 max-md:max-w-full">
        <section className="flex relative flex-col flex-1 items-center p-6 w-full bg-white rounded-2xl max-md:px-5 max-md:max-w-full">
          <button className="overflow-hidden absolute top-6 gap-2 self-start p-2 h-8 text-sm font-medium text-center border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] right-[23px] rounded-[1000px] text-neutral-500">
            View History
          </button>
          <div className="flex z-0 flex-col flex-1 justify-center self-center py-24 max-w-full w-[528px]">
            <SuccessModal />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PaymentSuccess;