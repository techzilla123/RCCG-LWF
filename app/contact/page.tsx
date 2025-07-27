"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import Offer from "@/components/Offer";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import BotpressChat from "@/components/BotpressChat";

const imagePaths = [
  "/Contact us-amico.svg",
  "/Questions-pana.svg",
  "/Call center-cuate.svg",
];

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    setCurrentImageIndex(Math.floor(Math.random() * imagePaths.length));

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === null ? 0 : (prev + 1) % imagePaths.length
      );
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}contact-us`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      toast.success(" Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <Offer />
      <TopNavBar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
          {/* Left: Contact Form */}
          <div className="p-10 md:p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Contact Support
            </h1>
            <p className="text-gray-500 mb-6">
              Got a question about your account or billing? Send us a message
              and we&apos;ll reply promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
<div className="flex flex-col md:flex-row gap-5">
  <div className="w-full md:w-1/2">
    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
      Phone
    </label>
    <input
      id="phone"
      name="phone"
      type="text"
      required
      value={formData.phone}
      onChange={handleInputChange}
      placeholder="(469) 999-5121"
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>

  <div className="w-full md:w-1/2">
    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
      Address
    </label>
    <input
      id="address"
      name="address"
      type="text"
      required
      value={formData.address}
      onChange={handleInputChange}
      placeholder="Your address"
      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</div>


              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="How can we help you?"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <span className="loader mr-2 border-white"></span>
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>

          {/* Right: 3D Illustration */}
          <div className="bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6 md:p-10">
            {currentImageIndex !== null && (
              <img
                src={imagePaths[currentImageIndex]}
                alt="Contact Illustration"
                className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg object-contain transition-all duration-700 ease-in-out"
              />
            )}
          </div>
        </div>
      </div>
      <BotpressChat />
      <Footer />

      {/* Spinner Style */}
      <style jsx>{`
        .loader {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
