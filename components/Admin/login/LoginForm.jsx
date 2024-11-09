"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link'; // Import Link from next/link
import TransactionModal from './popup'; // Import the TransactionModal

// Reusable InputField Component
function InputField({ label, placeholder, type = 'text' }) {
  const [inputValue, setInputValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);
  const isPasswordField = type === 'password';

  // Function to clear the input and keep the focus
  const handleClearInput = () => {
    setInputValue('');
    inputRef.current.focus();
  };

  // Function to toggle password visibility
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

// LoginForm Component
function LoginForm() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Function to handle login click
  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowModal(true); // Show the modal on login click
  };

  // Function to close the modal
  const closeModal = () => setShowModal(false);

  return (
    <section className="flex flex-col justify-center px-10 py-6 max-w-full bg-white rounded-2xl w-[464px] max-md:px-5">
      <div className="flex w-full min-h-[18px]" />
      <form className="flex flex-col self-center w-full rounded-xl">
        <div className="flex flex-col items-start self-start text-center">
          <h1
            className="text-4xl font-semibold text-green-900"
            style={{ color: "#005E1E" }}
          >
            Login
          </h1>
          <p className="mt-3 text-base text-neutral-500">
            Welcome back! Please enter your details to continue
          </p>
        </div>

        {/* Email/Phone Input Field */}
        <div className="flex flex-col mt-6 w-full">
          <InputField label="Email/Phone" placeholder="Input email/phone" type="text" />
        </div>

        {/* Password Input Field */}
        <div className="flex flex-col w-full">
          <InputField label="Password" placeholder="Enter your password" type="password" />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center w-full mt-4">
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

        {/* Submit Button and Forgot Password Link */}
        <div className="flex flex-col mt-6 w-full font-medium">
          <button
            type="button"
            onClick={handleLoginClick}
            className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-sm text-center text-white whitespace-nowrap bg-green-600 border border-solid border-black border-opacity-0 min-h-[44px] rounded-[1000px]"
            style={{ background: "#08AA3B" }}
          >
            Login
          </button>

          {/* Use Next.js Link for Forgot Password */}
          <Link href="/auth/forgot-password" className="self-stretch mt-4 w-full text-xs text-center text-neutral-500">
            Forgot Password
          </Link>
        </div>
      </form>

      {/* Show the modal when state is true */}
      {showModal && <TransactionModal onClose={closeModal} />}
    </section>
  );
}

export default LoginForm;
