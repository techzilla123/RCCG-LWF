"use client"; // Add this line at the top

import React from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter from next/navigation
import BackButton from './BackButton';
import InputField from './InputField'; // Reusable input field component
import Link from 'next/link';

function AuthResetForm() {
  const router = useRouter(); // Initialize useRouter from next/navigation

  // Handle form submission and navigate to /auth/forgot-password/verify
  const handleProceedClick = (e) => {
    e.preventDefault(); // Prevent the form from submitting
    router.push('/auth/forgot-password/verify'); // Navigate to the verify page
  };

  return (
    <div
      className="flex flex-col justify-center px-10 py-6 max-w-full bg-white rounded-2xl min-h-[520px] w-[464px] max-md:px-5"
      style={{ marginTop: '-200px' }}
    >
      <div className="self-start mb-4">
        <BackButton />
      </div>

      <form
        onSubmit={handleProceedClick} // Handle form submission
        className="flex flex-col flex-1 justify-center self-center mt-4 w-full rounded-xl"
      >
        <div className="flex flex-col items-start self-start text-center">
          <h1 className="text-4xl font-semibold" style={{ color: '#005E1E' }}>
            Forgot Password
          </h1>
          <p className="mt-3 text-base text-neutral-500">
            Input your email/phone to reset your password
          </p>
        </div>

        <div className="flex flex-col mt-6 w-full">
          <InputField
            label="Email/Phone"
            placeholder="Input email/phone"
            type="text"
          />
        </div>

        <div className="flex items-center w-full mt-4">
          <label className="flex gap-2 items-center self-stretch my-auto">
            <input
              type="checkbox"
              id="agreeTerms"
              className="w-4 h-4 bg-white rounded border border-solid border-zinc-300"
              style={{ accentColor: '#08AA3B' }}
            />
            <span className="self-stretch my-auto text-xs font-medium text-neutral-500">
              Agree to Terms of Service
            </span>
          </label>
        </div>

        <div className="flex flex-col mt-6 w-full font-medium">
          <button
            type="submit"
            className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-sm text-center text-white whitespace-nowrap rounded-[1000px]"
            style={{ background: '#08AA3B' }}
          >
            Proceed
          </button>
          <Link
            href="/auth/register"
            className="self-stretch mt-4 w-full text-xs text-center text-neutral-500"
          >
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AuthResetForm;
