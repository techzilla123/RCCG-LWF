// ContactForm.tsx
"use client";
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    prayerPoint: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex-1">
      <h2 className="mb-8 text-lg md:text-xl font-bold tracking-tight text-gray-900 uppercase">
        Contact Form:
      </h2>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Your Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          className="px-5 py-4 w-full text-base border-2 rounded-lg border-gray-200 focus:outline-none focus:border-gray-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          className="px-5 py-4 w-full text-base border-2 rounded-lg border-gray-200 focus:outline-none focus:border-gray-400"
        />
        <input
          type="text"
          name="prayerPoint"
          placeholder="Prayer Point"
          value={formData.prayerPoint}
          onChange={handleInputChange}
          className="px-5 py-4 w-full text-base border-2 rounded-lg border-gray-200 focus:outline-none focus:border-gray-400"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleInputChange}
          className="px-5 py-4 w-full min-h-[120px] text-base border-2 rounded-lg border-gray-200 resize-none focus:outline-none focus:border-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-4 mt-3 w-full text-base md:text-lg font-bold text-white uppercase rounded-lg bg-gray-400 hover:bg-gray-500 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
