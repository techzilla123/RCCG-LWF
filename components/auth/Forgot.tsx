"use client";
import React, { useState } from "react";
import { Logo } from "./Forgot/Logo";
import { InputField } from "./Forgot/InputField";
import { Button } from "./Forgot/Button";
import { useRouter } from "next/navigation";

export const Forgot: React.FC = () => {
  const router = useRouter(); // Get router instance

  const handleBackClick = () => {
    router.push("/admin-dashboard"); // Navigate to /auth-Forgot when clicked
  };
 
 
  const handlecreate = () => {
    router.push("/auth-login"); // Navigate to /auth-Forgot when clicked
  };
 

  const [email, setEmail] = useState("");

  return (
    <main className="flex flex-col justify-center items-center px-0 py-10 mx-auto w-full max-w-none h-screen bg-neutral-100 max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <section className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[560px] max-md:p-8 max-md:w-[90%] max-sm:p-6 max-sm:w-full">
        <header className="flex justify-center items-center mb-6 w-20 h-[60px]">
          <Logo />
        </header>

        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl text-black max-sm:text-3xl">Forgot password </h1>
          <p className="text-sm leading-6 text-center text-neutral-500 max-sm:text-xs">
          Can&apos;t remember your password, we&apos;ve got you covered!
          </p>
        </div>

        <form className="mb-6 w-[480px] max-md:w-full">
          <InputField label="Email" value={email} onChangeAction={setEmail} />
       
        </form>

        <div className="flex flex-col w-full">
          <Button variant="primary" className="mb-2" onClick={handleBackClick}>
          Reset password
          </Button>
     
  <Button variant="secondary" onClick={handlecreate}>Back to Login</Button>


        </div>
      </section>
    </main>
  );
};

export default Forgot;
