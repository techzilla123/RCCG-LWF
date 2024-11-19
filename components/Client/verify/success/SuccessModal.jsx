'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Receipt from './Receipt'; 

function SuccessModal() {
  const router = useRouter(); 
  const [showReceipt, setShowReceipt] = useState(false);

  // Show the receipt modal
  const handleViewReceiptClick = () => {
    setShowReceipt(true);
  };

  // Navigate to the home page
  const handleFinishClick = () => {
    router.push('/');
  };

  return (
    <div
      className="flex flex-col justify-center items-center px-14 py-10 w-full bg-white max-w-[528px] rounded-[32px] max-md:px-5 max-md:max-w-full"
      style={{ marginTop: "-60px" }}
    >
      {/* Success Icon */}
      <div className="flex gap-2.5 justify-center items-center" style={{ width: '120px', height: '120px' }}>
        <img
          loading="lazy"
          src="/success-0u6rqMvimp.png" // Ensure this image is available in your public folder
          alt="Success Icon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Heading */}
      <h2
        className="self-stretch pb-4 mt-4 w-full text-4xl font-semibold text-black text-center"
        style={{ color: "#000000" }}
      >
        Transaction successful!
      </h2>

      {/* Buttons */}
      <div className="flex gap-2.5 items-center justify-center mt-4 w-full text-sm font-medium text-center max-w-[400px]">
        {/* Finish Button */}
        <button
          onClick={handleFinishClick}
          className="overflow-hidden flex-1 px-4 py-3 h-10 text-black whitespace-nowrap border border-solid bg-black bg-opacity-0 border-neutral-500 min-h-[40px] rounded-[1000px] flex items-center justify-center"
        >
          Finish
        </button>

        {/* View Receipt Button */}
        <button
          onClick={handleViewReceiptClick}
          className="overflow-hidden flex-1 px-4 py-3 h-10 text-white bg-green-600 border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px] flex items-center justify-center text-base max-md:text-sm"
          style={{ background: "#08AA3B" }}
        >
          <span style={{ fontSize: '20px', marginRight: '8px' }}>✔</span>
          <span>View Receipt</span>
        </button>
      </div>

      {/* Render Receipt Component */}
      {showReceipt && <Receipt onClose={() => setShowReceipt(false)} />}
    </div>
  );
}

export default SuccessModal;
