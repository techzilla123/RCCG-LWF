"use client";
import React, { useState } from "react";
import { toast, Toaster } from "sonner";

export const FooterNewsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}join-news-letter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to subscribe");
      }

      toast.success("🎉 Subscribed successfully!");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
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
            className="w-full px-4 py-2 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-[50px] bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors whitespace-nowrap disabled:opacity-60"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </>
  );
};
