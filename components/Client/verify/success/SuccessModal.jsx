// Add this at the top of the file to mark it as a Client Component
'use client';

import React, { useState } from 'react';
import Receipt from './Receipt'; // Make sure to adjust the path if necessary

function SuccessModal() {
  const [showReceipt, setShowReceipt] = useState(false);

  // Handle button click to show the receipt
  const handleViewReceiptClick = () => {
    setShowReceipt(true);
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
          src="/success-0u6rqMvimp.png"
          alt="Success Icon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Transaction Success Heading */}
      <h2
        className="self-stretch pb-4 mt-4 w-full text-4xl font-semibold text-black text-center"
        style={{ color: "#000000" }}
      >
        Transaction successful!
      </h2>

      {/* Buttons Container */}
      <div className="flex gap-2.5 items-center justify-center mt-4 w-full text-sm font-medium text-center max-w-[400px]">
        
        {/* Finish Button */}
        <button
          className="overflow-hidden flex-1 shrink gap-2 self-stretch px-4 py-3 h-10 text-black whitespace-nowrap border border-solid bg-black bg-opacity-0 border-neutral-500 min-h-[40px] rounded-[1000px] flex items-center justify-center"
        >
          Finish
        </button>

        {/* View Receipt Button */}
        <button
          onClick={handleViewReceiptClick} // Show the receipt when clicked
          className="overflow-hidden flex-1 shrink gap-2 self-stretch px-4 py-3 h-10 text-white bg-green-600 border border-solid border-black border-opacity-0 min-h-[40px] rounded-[1000px] flex items-center justify-center text-base max-md:text-sm"
          style={{ background: "#08AA3B" }}
        >
          {/* Success Icon */}
          <span style={{ fontSize: '20px', marginRight: '8px' }}>✔</span>
          <span>View Receipt</span>
        </button>
      </div>

      {/* Conditionally render Receipt Component */}
      {showReceipt && <Receipt />}
    </div>
  );
}

export default SuccessModal;
