"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    prayerPoint: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

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
        fieldLabel: "Prayer Point",       // dynamic label
    fieldValue: formData.prayerPoint,
        message: formData.message,
        submissionType: "New Contact Form Submission",
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    alert("Message sent successfully!");
    setFormData({
      fullName: "",
      email: "",
      prayerPoint: "",
      message: "",
    });
  } catch (error: unknown) {
    alert("Failed to send message. Try again.");
    if (error instanceof Error) {
      console.error("EmailJS error:", error.message);
    } else {
      console.error("EmailJS unknown error:", error);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex-1">
      <h2 className="mb-8 text-lg md:text-xl font-bold uppercase">
        Contact Form:
      </h2>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Your Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="px-5 py-4 border-2 rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="px-5 py-4 border-2 rounded-lg"
        />

        <input
          type="text"
          name="prayerPoint"
          placeholder="Prayer Point"
          value={formData.prayerPoint}
          onChange={handleChange}
          className="px-5 py-4 border-2 rounded-lg"
        />

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          required
          className="px-5 py-4 min-h-[120px] border-2 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-4 font-bold text-white uppercase rounded-lg bg-gray-400 hover:bg-[#333064] disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
