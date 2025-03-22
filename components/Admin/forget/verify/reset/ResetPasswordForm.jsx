"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function InputField({ label, placeholder, type = "text", onChange }) {
  const [inputValue, setInputValue] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);
  const isPasswordField = type === "password";
 

  const handleClearInput = () => {
    setInputValue("");
    inputRef.current.focus();
  };

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e.target.value); // Pass value to parent
  };

  return (
    <div className="flex flex-col w-full min-h-[100px]">
      <label className="gap-2.5 self-start text-base text-neutral-500">
        {label}
      </label>
      <div
        className={`flex gap-3 items-center px-4 py-1.5 mt-2 w-full h-10 bg-white rounded-lg border-2 ${
          inputValue ? "border-[#08AA3B]" : "border-[#e0e0e0]"
        } border-solid min-h-[40px]`}
      >
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex justify-center items-center w-5 h-5"
          >
            <img
              src={isPasswordVisible ? "/eyeON.png" : "/eyeCLOSE.png"}
              alt="Toggle Password Visibility"
              className="w-5 h-5 object-contain"
            />
          </button>
        )}

        <input
          type={isPasswordField && !isPasswordVisible ? "password" : "text"}
          value={inputValue}
          placeholder={placeholder}
          ref={inputRef}
          onChange={handleChange}
          className="flex-1 text-base text-black outline-none bg-transparent"
          aria-label={label}
        />

        {inputValue && (
          <button
            type="button"
            onClick={handleClearInput}
            className="flex justify-center items-center w-5 h-5 text-black"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail");
    if (!email) {
      setError("User email not found in localStorage");
      return;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/reset/password`;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const text = await response.text(); // Get raw text response
        throw new Error(`Error: ${response.status} - ${text}`);
      }

      const data = await response.json().catch(() => null); // Handle empty JSON

      if (!data) {
        throw new Error("Empty response from server");
      }

      router.push("/auth/forgot-password/verify/success");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="flex flex-col justify-center px-10 py-6 max-w-full bg-white rounded-2xl min-h-[520px] w-[464px] max-md:px-5"
      style={{ marginTop: "-190px" }}
    >
      <nav className="flex flex-col items-start w-full">
        <Link
          href="/auth/forgot-password/verify"
          className="flex overflow-hidden gap-2 justify-start items-center px-0 py-2 h-8 border border-solid bg-black bg-opacity-0 border-black border-opacity-0 min-h-[32px] rounded-[1000px]"
        >
          <img
            loading="lazy"
            src="/arrow-left.png"
            alt=""
            className="object-contain self-stretch my-auto w-4 aspect-square"
          />
          <span className="self-stretch my-auto text-sm font-medium text-center text-neutral-500">
            Back
          </span>
        </Link>
      </nav>
      <div className="flex flex-col flex-1 justify-center self-center mt-4 w-full rounded-xl">
        <div className="flex flex-col items-start self-start text-center">
          <h1
            className="text-4xl font-semibold text-green-900"
            style={{ color: "#005E1E" }}
          >
            Reset Password
          </h1>
          <p className="mt-3 text-base text-neutral-500">
            Create a new password to continue
          </p>
        </div>
        <form className="flex flex-col mt-6 w-full" onSubmit={handleSubmit}>
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={setPassword}
          />
          <div className="flex items-center w-full mt-2">
            <label className="flex gap-2 items-center self-stretch my-auto">
              <input
                type="checkbox"
                className="w-4 h-4 bg-white rounded border border-solid border-zinc-300"
                style={{ accentColor: "#08AA3B" }}
              />
              <span className="self-stretch my-auto text-xs font-medium text-neutral-500">
                Agree to Terms of Service
              </span>
            </label>
          </div>
          {error && (
            <p className="mt-2 text-red-500 text-sm font-medium">{error}</p>
          )}
          <div className="flex flex-col mt-6 w-full font-medium">
            <button
              type="submit"
              disabled={loading}
              className="overflow-hidden gap-2 self-stretch px-4 py-3.5 w-full text-sm text-center text-white whitespace-nowrap bg-[#08AA3B] border border-solid border-black border-opacity-0 min-h-[44px] rounded-[1000px]"
            >
              {loading ? "Resetting..." : "Reset"}
            </button>
            <a
              href="/auth/register"
              className="self-stretch mt-4 w-full text-xs text-neutral-500 text-center"
            >
              Create Account
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ResetPasswordForm;
