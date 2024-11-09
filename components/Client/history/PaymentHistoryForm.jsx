"use client"; // Mark this as a Client Component
import React from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation instead of next/router

function PaymentHistoryForm() {
  const router = useRouter(); // Initialize useRouter from next/navigation

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/client/history/verify'); // Navigate to /client/verify
  };

  return (
    <form
      className="flex flex-col flex-1 self-center pt-20 max-w-full rounded-xl w-[394px]"
      onSubmit={handleSubmit} // Add onSubmit handler
    >
      <div className="flex flex-col w-full">
        <h2
          className="text-4xl font-semibold"
          style={{ color: '#005E1E' }}
        >
          Payment history
        </h2>
        <p className="mt-3 text-base text-neutral-500">
          Verify your email/phone to retrieve previous transactions
        </p>
      </div>
      <div className="flex flex-col mt-6 w-full">
        <div className="flex flex-col w-full text-base whitespace-nowrap min-h-[100px]">
          <label htmlFor="emailPhone" className="gap-2.5 self-start text-neutral-500">
            Email/Phone
          </label>
          <div className="inputemail" style={{ marginTop: '10px' }}>
            <input
              id="emailPhone"
              type="text"
              placeholder="Input email/phone"
              className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ color: '#000000' }}
            />
          </div>
        </div>
        <div className="flex items-center w-full mt-4">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 bg-white rounded border border-solid border-zinc-300"
              style={{ accentColor: '#08AA3B' }}
            />
            <span className="text-xs font-medium text-neutral-500">
              Agree to Terms of Service
            </span>
          </label>
        </div>
      </div>
      <div className="flex flex-col mt-6 w-full text-sm font-medium text-center text-white">
        <button
          type="submit"
          className="px-4 py-3.5 w-full rounded-[1000px]"
          style={{ background: '#08AA3B' }}
        >
          Proceed
        </button>
      </div>
    </form>
  );
}

export default PaymentHistoryForm;
