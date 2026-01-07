"use client";

import React, { useState } from "react";
import ChurchHeaderb from "@/components/Header/ChurchHeader";
import emailjs from "@emailjs/browser";

export default function HouseFellowshipPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          fieldLabel: "Phone Number",
          fieldValue: formData.phone,
          message: formData.message,
          submissionType: "House Fellowship Registration",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      alert("Registration sent successfully!");
      setFormData({ fullName: "", email: "", phone: "", message: "" });
      setModalOpen(false);
    } catch {
      alert("Failed to send registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <ChurchHeaderb />

      {/* HERO */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac"
          alt="House Fellowship"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            House Fellowship
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            Growing in faith, building relationships, and living out the Word of
            God together in our homes.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-gradient-to-b from-white to-sky-50 py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              About House Fellowship
            </h2>

            <p className="mt-6 text-gray-700 leading-relaxed">
              House Fellowship is a vital part of our church life. It creates a
              warm and personal environment where believers meet in homes to
              pray, study God’s Word, share life experiences, and encourage one
              another.
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              These gatherings help strengthen spiritual growth, foster genuine
              relationships, and provide support beyond Sunday services. It is
              church lived out in community.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">
                What You Can Expect
              </h3>
              <ul className="mt-4 space-y-3 list-disc list-inside text-gray-700">
                <li>Bible-based teaching and discussion</li>
                <li>Prayer, care, and accountability</li>
                <li>Supportive Christian relationships</li>
                <li>Practical application of God’s Word</li>
                <li>A loving and welcoming atmosphere</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Why Join a House Fellowship?
            </h3>

            <p className="mt-4 text-gray-700 leading-relaxed">
              House Fellowship allows you to connect deeply, grow spiritually,
              and walk closely with other believers in a smaller, caring
              setting.
            </p>

            <div className="mt-6 space-y-3 text-gray-700">
              <p>• Build meaningful relationships</p>
              <p>• Grow spiritually through the Word</p>
              <p>• Receive prayer and encouragement</p>
              <p>• Experience true Christian community</p>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            House Fellowship Locations
          </h2>
          <p className="mt-4 text-center text-gray-700 max-w-2xl mx-auto">
            Join a house fellowship closest to you and experience community,
            prayer, and spiritual growth in a welcoming home environment.
          </p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <HouseCard
              title="Forney House Fellowship"
             
              date="Last Saturdays of Every Month"
              time="5:00 PM – 6:30 PM"
              active
            />

            <HouseCard
              title="Heartland House Fellowship"
             
              date="To Be Announced"
              time="To Be Announced"
            />

            <HouseCard
              title="Crandall House Fellowship"
             
              date="To Be Announced"
              time="To Be Announced"
            />

            <HouseCard
              title="Terrell House Fellowship"
             
              date="To Be Announced"
              time="To Be Announced"
            />

            <HouseCard
              title="Heath House Fellowship"
             
              date="To Be Announced"
              time="To Be Announced"
            />
          </div>

          <div className="mt-14 text-center">
            <button
              onClick={() => setModalOpen(true)}
              className="px-10 py-4 rounded-2xl bg-sky-600 text-white text-lg font-semibold 
              hover:bg-sky-700 shadow-lg hover:shadow-xl transition-all"
            >
              Register for House Fellowship
            </button>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-center mb-6">
              House Fellowship Registration
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 rounded-lg"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 rounded-lg"
              />
              <textarea
                name="message"
                placeholder="Preferred Location or Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-3 border-2 rounded-lg min-h-[120px]"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit Registration"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* HOUSE CARD */
const HouseCard = ({
  title,
  
  date,
  time,
  active,
}: {
  title: string;
  
  date: string;
  time: string;
  active?: boolean;
}) => (
  <div
    className={`rounded-3xl p-6 transition-all duration-300 shadow-md hover:shadow-xl
    ${active ? "bg-sky-50 border-2 border-sky-500" : "bg-white border border-gray-200"}`}
  >
    <div className="flex items-center gap-3 mb-4">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center text-white
        ${active ? "bg-sky-600" : "bg-gray-400"}`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3l9 8h-3v9h-5v-6H11v6H6v-9H3l9-8z" />
        </svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>

    <div className="space-y-3 text-sm text-gray-700">
      
      <p>📅 {date}</p>
      <p>⏰ {time}</p>
    </div>
  </div>
);
