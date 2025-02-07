"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import HmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import { useRouter } from 'next/navigation';

// Reusable InputField Component
function InputField({ label, placeholder, type = 'text', value, onChange }) {
  const [inputValue, setInputValue] = useState(value || '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);
  const isPasswordField = type === 'password';

  const handleClearInput = () => {
    setInputValue('');
    inputRef.current.focus();
    onChange('');
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  return (
    <div className="flex flex-col w-full min-h-[100px]">
      <label className="gap-2.5 self-start text-base text-neutral-500">{label}</label>
      <div className={`flex gap-3 items-center px-4 py-1.5 mt-2 w-full h-10 bg-white rounded-lg border-2 ${inputValue ? 'border-[#08AA3B]' : 'border-[#e0e0e0]'} border-solid min-h-[40px]`}>
        {isPasswordField && (
          <button type="button" onClick={togglePasswordVisibility} className="flex justify-center items-center w-5 h-5">
            <img src={isPasswordVisible ? '/eyeON.png' : '/eyeCLOSE.png'} alt="Toggle Password Visibility" className="w-5 h-5 object-contain" />
          </button>
        )}
        <input
          type={isPasswordField && !isPasswordVisible ? 'password' : 'text'}
          value={inputValue}
          placeholder={placeholder}
          ref={inputRef}
          onChange={(e) => { setInputValue(e.target.value); onChange(e.target.value); }}
          className="flex-1 text-base text-black outline-none bg-transparent"
          aria-label={label}
        />
        {inputValue && (
          <button type="button" onClick={handleClearInput} className="flex justify-center items-center w-5 h-5 text-black">×</button>
        )}
      </div>
    </div>
  );
}

function LoginForm() {
  const [isClient, setIsClient] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
// Function to handle form submission
const handleLogin = async (e) => {
  e.preventDefault();

  const nonce = Math.random().toString(36).substring(2);
  const timestamp = Date.now().toString();
  const method = 'POST';
  const path = '/admin/signin'; // The API endpoint path

  // Create the message string for HMAC
  const message = `${method}:${nonce}:${timestamp}`;

  // Function to generate HMAC using HmacSHA256
  const generateHMAC = (message, secretKey) => {
    const hash = HmacSHA256(message, secretKey);
    return Base64.stringify(hash);
  };

  // Generate the API Key (HMAC)
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY; // Load your secret key from environment variable
  const apiKey = generateHMAC(message, secretKey);

  // API Request Headers
  const headers = {
    'X-API-Key': apiKey,
    'X-Timestamp': timestamp,
    'X-Nonce': nonce,
  };

  // API Request Payload (Login credentials)
  const data = {
    email,
    password,
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, // Base URL + API path
      data,
      { headers }
    );

    // Extract token from the response
    const token = response.data?.token;
    if (token) {
      // Store token in localStorage
      localStorage.setItem('authToken', token);

      // Navigate to the dashboard
      router.push('/dashboard/dashboard-overview');
    } else {
      throw new Error('Token not provided in response.');
    }
  } catch (error) {
    // Extract the responseMessage from the error object
    const responseMessage = error.response?.data?.responseMessage;
    setErrorMessage(responseMessage || 'An error occurred.');
  }
};

  return (
    <section className="flex flex-col justify-center px-10 py-6 max-w-full bg-white rounded-2xl w-[464px] max-md:px-5">
      <div className="flex w-full min-h-[18px]" />
      <form className="flex flex-col self-center w-full rounded-xl" onSubmit={handleLogin}>
        <div className="flex flex-col items-start self-start text-center">
          <h1 className="text-4xl font-semibold text-green-900 " style={{ color: "#005E1E" }}>
            Login
          </h1>
          <p className="mt-3 text-base text-neutral-500">
            Welcome back! Please enter your details to continue
          </p>
        </div>

        {/* Email/Phone Input Field */}
        <div className="flex flex-col mt-6 w-full">
          <InputField 
            label="Email/Phone" 
            placeholder="Input email/phone" 
            type="text" 
            value={email} 
            onChange={setEmail} 
          />
        </div>

        {/* Password Input Field */}
        <div className="flex flex-col w-full">
          <InputField 
            label="Password" 
            placeholder="Enter your password" 
            type="password" 
            value={password} 
            onChange={setPassword} 
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center w-full mt-4">
          <label className="flex gap-2 items-center self-stretch my-auto">
            <input type="checkbox" className="w-4 h-4 bg-white rounded border border-solid border-zinc-300" style={{ accentColor: '#08AA3B' }} />
            <span className="self-stretch my-auto text-xs font-medium text-neutral-500">
              Agree to Terms of Service
            </span>
          </label>
        </div>

        {/* Submit Button and Forgot Password Link */}
        <div className="flex flex-col mt-6 w-full font-medium">
          <button type="submit" className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-sm text-center text-white whitespace-nowrap bg-green-600 border border-solid border-black border-opacity-0 min-h-[44px] rounded-[1000px] hover:bg-[#00782A] active:bg-green-800" style={{ background: "#08AA3B"}}
          onMouseEnter={(e) => (e.target.style.background = "#067F2E")}
          onMouseLeave={(e) => (e.target.style.background = "#08AA3B")}>
            Login
          </button>

          {/* Use Next.js Link for Forgot Password */}
          <Link href="/auth/forgot-password" className="self-stretch mt-4 w-full text-xs text-center text-neutral-500">
            Forgot Password
          </Link>
        </div>

        {/* Error Message Display */}
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center text-sm">
            {errorMessage}
          </div>
        )}
      </form>
    </section>
  );
}

export default LoginForm;
