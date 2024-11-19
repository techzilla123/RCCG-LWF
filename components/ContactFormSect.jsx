"use client";

import React, { useState, useRef } from "react";

function InputField({
  label,
  placeholder,
  type = "text",
  textarea = false,
  value,
  onChange,
  error,
}) {
  const inputRef = useRef(null);

  const handleClearInput = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col flex-1 shrink basis-0 min-h-[111px] min-w-[240px] relative">
      <div className="flex justify-between">
        <label className="gap-2.5 self-start text-neutral-500">{label}</label>
        {error && <span className="text-red-500 text-xs">{error}</span>}
      </div>
      {textarea ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 gap-2 py-2.5 mt-4 w-full bg-white rounded-2xl border border-solid shadow-sm border-neutral-500 min-h-[151px] max-md:max-w-full resize-none outline-none p-4"
          ref={inputRef}
        ></textarea>
      ) : (
        <div
          className={`flex gap-3 items-center px-4 py-3 mt-2 w-full h-10 bg-white rounded-lg border border-solid ${
            value ? "border-[#08AA3B]" : "border-neutral-500"
          } text-zinc-300 min-h-[40px]`}
        >
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 text-base text-black outline-none bg-transparent w-full min-w-[240px]"
            ref={inputRef}
          />
          {value && (
            <button
              type="button"
              onClick={handleClearInput}
              className="flex justify-center items-center w-5 h-5 text-black"
            >
              ×
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ContactFormSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name} is required.`;
    } else if (name === "Email" && !value.includes("@")) {
      error = "Email must contain '@'.";
    }
    return error;
  };

  const handleInputChange = (name, value) => {
    const newFormData = { ...formData, [name]: value };
    const newErrors = { ...errors, [name]: validateField(name, value) };

    setFormData(newFormData);

    // Directly update the errors object
    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {
      fullName: validateField("Full Name", formData.fullName),
      email: validateField("Email", formData.email),
      message: validateField("Message", formData.message),
    };

    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => !newErrors[key]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      setFormData({ fullName: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <section className="flex z-0 gap-2.5 justify-center items-center px-32 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[605px]">
        <div className="flex flex-col justify-center items-center w-full max-md:max-w-full">
          <h2 className="text-4xl font-semibold tracking-tighter leading-none" style={{ color: "#005E1E" }}>
            Contact Us
          </h2>
          <p className="mt-1 text-xl text-neutral-500 max-md:max-w-full">
            Our friendly team would love to hear from you.
          </p>
        </div>

        <form className="flex flex-col mt-10 w-full max-md:max-w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-8 items-start w-full text-base max-md:max-w-full">
            <InputField
              label="Full Name"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(value) => handleInputChange("fullName", value)}
              error={errors.fullName}
            />
            <InputField
              label="Email"
              placeholder="johndoe@email.com"
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              error={errors.email}
            />
          </div>

          <div className="flex flex-col w-full text-xl font-medium leading-none whitespace-nowrap min-h-[187px] text-neutral-500 max-md:max-w-full">
            <InputField
              label="Message"
              placeholder="Write your message here..."
              textarea
              value={formData.message}
              onChange={(value) => handleInputChange("message", value)}
              error={errors.message}
            />
          </div>

          <div className="flex flex-col self-end mt-6 max-w-full text-sm font-medium text-center text-white w-[286px]">
            <button
              type="submit"
              className="overflow-hidden gap-2 self-stretch p-4 w-full h-12 border border-solid border-black border-opacity-0 min-h-[48px] rounded-[1000px]"
              style={{ background: "#08AA3B" }}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactFormSection;
