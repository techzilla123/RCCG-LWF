"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link'; // Import Link from next/link

function InputField({ label, placeholder, type = 'text' }) {
  const [inputValue, setInputValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);
  const isPasswordField = type === 'password';

  const handleClearInput = () => {
    setInputValue('');
    inputRef.current.focus();
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <div className="flex flex-col w-full min-h-[100px]">
      <label className="gap-2.5 self-start text-base text-neutral-500">{label}</label>
      <div
        className={`flex gap-3 items-center px-4 py-1.5 mt-2 w-full h-10 bg-white rounded-lg border-2 ${
          inputValue ? 'border-[#08AA3B]' : 'border-[#e0e0e0]'
        } border-solid min-h-[40px]`}
      >
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex justify-center items-center w-5 h-5"
          >
            <img
              src={isPasswordVisible ? '/eyeON.png' : '/eyeCLOSE.png'}
              alt="Toggle Password Visibility"
              className="w-5 h-5 object-contain"
            />
          </button>
        )}

        <input
          type={isPasswordField && !isPasswordVisible ? 'password' : 'text'}
          value={inputValue}
          placeholder={placeholder}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 text-base text-black outline-none bg-transparent"
          aria-label={label}
        />

        {inputValue && (
          <button
            type="button"
            onClick={handleClearInput}
            className="flex justify-center items-center w-5 h-5 text-black"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

function ResetPasswordForm() {
  return (
    <section
      className="flex flex-col justify-center px-10 py-6 max-w-full bg-white rounded-2xl min-h-[520px] w-[464px] max-md:px-5"
      style={{ marginTop: '-190px' }}
    >
      <nav className="flex flex-col items-start w-full">
        {/* Use Link from next/link for Back button */}
        <Link
          href="/auth/forgot-password/verify" // The route to navigate to
          className="flex overflow-hidden gap-2 justify-start items-center px-0 py-2 h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px]"
        >
          <img
            loading="lazy"
            src="/arrow-left.png"
            alt=""
            className="object-contain self-stretch my-auto w-4 aspect-square"
          />
          <span className="self-stretch my-auto text-sm font-medium text-center text-neutral-500">
            Back
          </span>
        </Link>
      </nav>
      <div className="flex flex-col flex-1 justify-center self-center mt-4 w-full rounded-xl">
        <div className="flex flex-col items-start self-start text-center">
          <h1 className="text-4xl font-semibold text-green-900" style={{ color: '#005E1E' }}>
            Reset Password
          </h1>
          <p className="mt-3 text-base text-neutral-500">Create a new password to continue</p>
        </div>
        <form className="flex flex-col mt-6 w-full">
          <InputField label="Password" placeholder="Enter your password" type="password" />
          <div className="flex items-center w-full mt-2">
            <label className="flex gap-2 items-center self-stretch my-auto">
              <input
                type="checkbox"
                className="w-4 h-4 bg-white rounded border border-solid border-zinc-300"
                style={{ accentColor: '#08AA3B' }}
              />
              <span className="self-stretch my-auto text-xs font-medium text-neutral-500">
                Agree to Terms of Service
              </span>
            </label>
          </div>
          <div className="flex flex-col mt-6 w-full font-medium">
            {/* Use Link from next/link for Reset button */}
            <Link
              href="/auth/forgot-password/verify/success" // The route to navigate to
              className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-sm text-center text-white whitespace-nowrap bg-[#08AA3B] border border-solid border-black border-opacity-0 min-h-[44px] rounded-[1000px]"
            >
              Reset
            </Link>
            <a href="#" className="self-stretch mt-4 w-full text-xs text-neutral-500 text-center">
              Create Account
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ResetPasswordForm;
