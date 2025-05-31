"use client";

import React, { useState } from "react";
import { Logo } from "./Forgot/Logo";
import { InputField } from "./Forgot/InputField";
import { Button } from "./Forgot/Button";
import { useRouter } from "next/navigation";

export const Forgot: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send verification code.");
      }

      alert("Verification code sent to your email.");
      router.push("/auth-verify");
    } catch (error) {
      console.error(error);
      alert("Error: Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/auth-login");
  };

  return (
    <main className="flex flex-col justify-center items-center px-0 py-10 mx-auto w-full max-w-none h-screen bg-neutral-100 max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <section className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[560px] max-md:p-8 max-md:w-[90%] max-sm:p-6 max-sm:w-full">
        <header className="flex justify-center items-center mb-6 w-20 h-[60px]">
          <Logo />
        </header>

        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl text-black max-sm:text-3xl">Forgot password</h1>
          <p className="text-sm leading-6 text-center text-neutral-500 max-sm:text-xs">
            Can&apos;t remember your password? We&apos;ve got you covered!
          </p>
        </div>

        <form className="mb-6 w-[480px] max-md:w-full">
          <InputField label="Email" value={email} onChangeAction={setEmail} />
        </form>

        <div className="flex flex-col w-full">
          <Button variant="primary" className="mb-2" onClick={handleResetPassword} isLoading={isLoading}>
            {isLoading ? "Sending..." : "Reset password"}
          </Button>

          <Button variant="secondary" onClick={handleBackToLogin}>
            Back to Login
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Forgot;
