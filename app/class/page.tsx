"use client";

import React, { useState } from "react";
import ChurchHeaderb from "@/components/Header/ChurchHeader";
import emailjs from "@emailjs/browser";

export default function BelieversClassPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          fullName: formData.fullName,
          email: formData.email,
          fieldLabel: "Phone Number",      // dynamic field
          fieldValue: formData.phone,      // dynamic value
          submissionType: "New Believers’ Class Registration",
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      alert("Registration submitted successfully!");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setShowModal(false);
    } catch (error) {
      alert("Failed to submit. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full overflow-hidden">
      {/* HEADER */}
      <ChurchHeaderb />

      {/* HERO / BANNER */}
      <section className="relative w-full h-[70vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df"
          alt="Believers Class"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Believers’ Class
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            A foundational class designed to establish new believers in Christ, doctrine, and the values of RCCG.
          </p>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              About the Believers’ Class
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed">
              The Believers’ Class is designed for new converts and members who
              desire a solid understanding of the Christian faith, salvation,
              church doctrine, and the mission of RCCG Living Word Family.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              This class lays the spiritual foundation needed to grow in faith,
              serve effectively, and live a Christ-centered life.
            </p>

            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-900">
                What You’ll Learn
              </h3>
              <ul className="mt-4 space-y-3 text-gray-700 list-disc list-inside">
                <li>Salvation and Christian fundamentals</li>
                <li>The Holy Spirit and spiritual growth</li>
                <li>Prayer, faith, and Bible study</li>
                <li>RCCG beliefs, values, and structure</li>
                <li>Living a victorious Christian life</li>
              </ul>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-sky-50 rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Next Class Details
            </h3>

            <div className="mt-6 space-y-4">
              <InfoRow label="Start Date" value="Sunday, 3rd March 2025" />
              <InfoRow label="Time" value="8:30 AM – 10:00 AM" />
              <InfoRow label="Venue" value="Church Auditorium (Class Room 2)" />
              <InfoRow label="Duration" value="8 Weeks" />
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900">
                Who Should Attend?
              </h4>
              <p className="mt-3 text-gray-700">
                New converts, members seeking a solid spiritual foundation, and
                anyone preparing for baptism or church service.
              </p>
            </div>

            {/* REGISTER BUTTON */}
            <button
              onClick={() => setShowModal(true)}
              className="mt-8 w-full py-4 rounded-xl bg-sky-600 text-white
              font-semibold text-lg hover:bg-sky-700 transition-all duration-300"
            >
              Register for Believers’ Class
            </button>
          </div>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-lg"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Believers’ Class Registration
            </h3>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="px-4 py-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="px-4 py-3 border rounded-lg"
              />
              <textarea
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-3 border rounded-lg min-h-[100px]"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 py-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EXTRA SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Join the Believers’ Class?
          </h2>
          <p className="mt-6 text-gray-700 leading-relaxed">
            Because growth is intentional. This class equips you with knowledge,
            clarity, confidence, and a strong spiritual identity in Christ.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <Feature title="Strong Foundation" text="Build your faith on biblical truth." />
            <Feature title="Spiritual Growth" text="Grow deeper in understanding and purpose." />
            <Feature title="Church Integration" text="Understand our values and mission." />
          </div>
        </div>
      </section>
    </div>
  );
}

/* SMALL COMPONENTS */

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center border-b border-sky-200 pb-2">
    <span className="font-medium text-gray-700">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

const Feature = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
    <p className="mt-2 text-gray-700">{text}</p>
  </div>
);
