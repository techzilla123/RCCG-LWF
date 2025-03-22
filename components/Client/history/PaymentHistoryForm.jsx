"use client"; // Mark this as a Client Component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js"; // Import CryptoJS as an ES module

function PaymentHistoryForm() {
  const router = useRouter();

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
      router.push("/client/history/verify");
    } catch {
     
      alert("Failed to fetch payment history. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col flex-1 self-center pt-20 max-w-full rounded-xl w-[394px]"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col w-full">
        <h2 className="text-4xl font-semibold" style={{ color: "#005E1E" }}>
          Payment history
        </h2>
        <p className="mt-3 text-base text-neutral-500">
          Verify your email to retrieve previous transactions
        </p>
      </div>

      <div className="flex flex-col mt-6 w-full">
        <div className="flex flex-col w-full text-base whitespace-nowrap min-h-[100px] relative">
          <label htmlFor="email" className="gap-2.5 self-start text-neutral-500">
            Email
          </label>
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
        </div>

        <div className="flex items-center w-full mt-4">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 bg-white rounded border border-solid border-zinc-300"
              style={{ accentColor: "#08AA3B" }}
              required
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
          style={{ background: "#08AA3B" }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Proceed"}
        </button>
      </div>
    </form>
  );
}

export default PaymentHistoryForm;
