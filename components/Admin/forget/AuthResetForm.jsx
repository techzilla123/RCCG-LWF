"use client"; // Add this line at the top

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js"; // Import CryptoJS as an ES module
import BackButton from './BackButton';
import InputField from './InputField'; // Reusable input field component
import Link from 'next/link';

function AuthResetForm() {
  const router = useRouter(); // Initialize useRouter from next/navigation

  const [email, setEmail] = useState(""); // Input field state
  const [loading, setLoading] = useState(false); // Loading state
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
  
      setLoading(true);
  
      try {
        // Save email to localStorage
        localStorage.setItem("userEmail", email);
  
        // Get the environment variables
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
        const apiUrl = process.env.NEXT_PUBLIC_API_HISTORY_URL;
  
        // Generate HMAC and headers
        const nonce = Math.random().toString(36).substring(2);
        const timestamp = Date.now().toString();
        const method = "POST";
        const message = `${method}:${nonce}:${timestamp}`;
        const hash = CryptoJS.HmacSHA256(message, secretKey);
        const apiKey = CryptoJS.enc.Base64.stringify(hash);
  
        // Create the request headers
        const headers = {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
          "X-Timestamp": timestamp,
          "X-Nonce": nonce,
        };
  
        // Request body
        const body = JSON.stringify({
          email,
        });
  
        // Make the API call
        const response = await fetch(apiUrl, {
          method: "POST",
          headers,
          body,
        });
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        // Navigate to the verification page on success
        router.push("/auth/forgot-password/verify");
      } catch (error) {
        console.log("Failed to fetch payment history:");
        alert("Failed to fetch payment history. Please try again.");
      } finally {
        setLoading(false);
      }
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
        onSubmit={handleSubmit} // Handle form submission
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

      <div className="inputemail" style={{ marginTop: "10px", position: "relative" }}>
            <input
              id="email"
              type="email"
              placeholder="Input email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              style={{ color: "#000000" }}
              required
            />
          </div>

        <div className="flex items-center w-full mt-4">
          <label className="flex gap-2 items-center self-stretch my-auto">
            <input
              type="checkbox"
              id="agreeTerms"
              className="w-4 h-4 bg-white rounded border border-solid border-zinc-300"
              style={{ accentColor: '#08AA3B' }}
              required
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
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed"}
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
