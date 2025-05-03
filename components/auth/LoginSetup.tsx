"use client";
import React, { useState } from "react";
import { Logo } from "./LoginSetup/Logo";
import { InputField } from "./LoginSetup/InputField";
import { Button } from "./LoginSetup/Button";
import { useRouter } from "next/navigation";

export const LoginSetup: React.FC = () => {
  const router = useRouter(); // Get router instance

  const handleBackClick = () => {
    router.push("/admin-dashboard"); // Navigate to /auth-LoginSetup when clicked
  };
  const handleforgot = () => {
    router.push("/auth-forgot"); // Navigate to /auth-LoginSetup when clicked
  };
 
  const handlecreate = () => {
    router.push("/auth-admin"); // Navigate to /auth-LoginSetup when clicked
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
          <h1 className="text-4xl text-black max-sm:text-3xl">Login</h1>
          <p className="text-sm leading-6 text-center text-neutral-500 max-sm:text-xs">
          Welcome back! Let&apos;s continue from where we left...
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
            Login
          </Button>
          <div className="flex justify-between w-full">
  <Button variant="secondary" onClick={handlecreate}>Create admin</Button>
  <Button variant="secondary" onClick={handleforgot}>Forgot password</Button>
</div>

        </div>
      </section>
    </main>
  );
};

export default LoginSetup;
