"use client"; // Mark this as a Client Component
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function PaymentHistoryForm() {
  const router = useRouter();

  const [emailPhone, setEmailPhone] = useState(""); // Input field state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email and Phone validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email pattern
    const phoneRegex = /^[0-9]{10,15}$/; // Phone pattern (10-15 digits, adjust as needed)

    if (!emailRegex.test(emailPhone) && !phoneRegex.test(emailPhone)) {
      return; // Prevent form submission if input is invalid
    }

    // Navigate to the verification page
    router.push("/client/history/verify");
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
          Verify your email/phone to retrieve previous transactions
        </p>
      </div>

      <div className="flex flex-col mt-6 w-full">
        <div className="flex flex-col w-full text-base whitespace-nowrap min-h-[100px] relative">
          <label htmlFor="emailPhone" className="gap-2.5 self-start text-neutral-500">
            Email/Phone
          </label>
          <div className="inputemail" style={{ marginTop: "10px", position: "relative" }}>
            <input
              id="emailPhone"
              type="text"
              placeholder="Input email or phone number"
              value={emailPhone}
              onChange={(e) => setEmailPhone(e.target.value)} // Update input value
              className={`w-full h-12 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
              style={{ color: "#000000" }}
              required // Mark input as required
              pattern="(^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$)|(^[0-9]{10,15}$)" // Regex pattern for email or phone
              title="Please enter a valid email or phone number" // Tooltip text
            />
            {/* Tooltip-style error message */}
            <div
              className="hidden peer-invalid:block absolute top-[65px] left-0 w-full text-sm text-red-500 bg-white border border-red-500 rounded-md p-2 shadow-lg"
              style={{ zIndex: 10 }}
            >
              <div className="flex items-center">
                <span
                  className="bg-orange-500 text-white font-bold rounded-full w-4 h-4 flex items-center justify-center"
                  style={{ marginRight: "8px" }}
                >
                  !
                </span>
                Please fill out this field.
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full mt-4">
          <label className="flex gap-2 items-center">
            <input
              type="checkbox"
              className="w-4 h-4 bg-white rounded border border-solid border-zinc-300"
              style={{ accentColor: "#08AA3B" }}
              required // Checkbox is required
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
        >
          Proceed
        </button>
      </div>
    </form>
  );
}

export default PaymentHistoryForm;
