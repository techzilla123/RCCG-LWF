"use client";
import React, { useState } from "react";

export const FooterNewsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscribe logic here
  };

  return (
    <form
      onSubmit={handleSubscribe}
      className="flex flex-col sm:flex-row items-stretch gap-3 w-full md:min-w-[300px] md:max-w-[400px]"
    >
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg outline-none"
          required
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 rounded-[50px] bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
};
