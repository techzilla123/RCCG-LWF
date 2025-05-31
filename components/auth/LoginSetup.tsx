"use client";
import React, { useState } from "react";
import { Logo } from "./LoginSetup/Logo";
import { InputField } from "./LoginSetup/InputField";
import { Button } from "./LoginSetup/Button";
import { useRouter } from "next/navigation";

export const LoginSetup: React.FC = () => {
  const router = useRouter();

  const handleForgot = () => {
    router.push("/auth-forgot");
  };

  const handleCreate = () => {
    router.push("/auth-admin");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed, please try again.");
      }

      const data = await response.json();

      const userType = data.data.data.userType;
      if (userType === "admin" || userType === "subadmin") {
        const token = `Bearer ${data.data.token}`;
        localStorage.setItem("accessToken", token);

        // Navigate to dashboard
        router.push("/admin-dashboard");
      } else {
        alert("Access restricted: you are not an admin or subadmin.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

        <form className="mb-6 w-[480px] max-md:w-full" onSubmit={handleLogin}>
          <InputField label="Email" value={email} onChangeAction={setEmail} />
          <InputField
            label="Password"
            value={password}
            type="password"
            showPasswordToggle
            onChangeAction={setPassword}
          />
          <Button
            type="submit"
            variant="primary"
            className="mb-2 w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex justify-between w-full">
          <Button variant="secondary" onClick={handleCreate}>
            Create admin
          </Button>
          <Button variant="secondary" onClick={handleForgot}>
            Forgot password
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LoginSetup;
