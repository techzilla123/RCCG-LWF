"use client";
import React, { useState } from "react";
import { Logo } from "./Admin/Logo";
import { InputField } from "./Admin/InputField";
import { Button } from "./Admin/Button";
import { useRouter } from "next/navigation";

export const AdminSetup: React.FC = () => {
  const router = useRouter(); // Get router instance

  const handleBackClick = () => {
    router.push("/auth-verify"); // Navigate to /auth-admin when clicked
  };
  const handleLogin = () => {
    router.push("/auth-login"); // Navigate to /auth-LoginSetup when clicked
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex flex-col justify-center items-center px-0 py-10 mx-auto w-full max-w-none h-screen bg-neutral-100 max-md:max-w-[991px] max-sm:max-w-screen-sm">
      <section className="flex flex-col items-center p-10 bg-white rounded-3xl shadow-[0_4px_6px_rgba(0,0,0,0.1)] w-[560px] max-md:p-8 max-md:w-[90%] max-sm:p-6 max-sm:w-full">
        <header className="flex justify-center items-center mb-6 w-20 h-[60px]">
          <Logo />
        </header>

        <div className="flex flex-col items-center mb-6">
          <h1 className="text-4xl text-black max-sm:text-3xl">Setup admin</h1>
          <p className="text-sm leading-6 text-center text-neutral-500 max-sm:text-xs">
            Setup admin control to monitor your site activity. This can only be
            done once
          </p>
        </div>

        <form className="mb-6 w-[480px] max-md:w-full">
          <InputField label="Email" value={email} onChangeAction={setEmail} />
          <InputField
            label="Password"
            value={password}
            type="password"
            showPasswordToggle
            onChangeAction={setPassword}
          />
        </form>

        <div className="flex flex-col w-full">
          <Button variant="primary" className="mb-2" onClick={handleBackClick}>
            Create admin
          </Button>
          <Button variant="secondary" onClick={handleLogin}>Login instead</Button>
        </div>
      </section>
    </main>
  );
};

export default AdminSetup;
