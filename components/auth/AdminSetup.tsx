"use client";
import React, { useState } from "react";
import { Logo } from "./Admin/Logo";
import { InputField } from "./Admin/InputField";
import { Button } from "./Admin/Button";
import { useRouter } from "next/navigation";

export const AdminSetup: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBackClick = () => {
    router.push("/auth-verify");
  };

  const handleLogin = () => {
    router.push("/auth-login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Assuming your token is stored in localStorage as Bearer token for authorization if needed
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/create-sub-admin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({
            email,
            firstname: firstName,
            lastname: lastName,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create sub-admin.");
      }

      // Success: show modal
      setShowSuccessModal(true);

      // Optionally clear the form fields if you want
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong. Please try again.");
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
          <h1 className="text-4xl text-black max-sm:text-3xl">Setup Sub admin</h1>
          <p className="text-sm leading-6 text-center text-neutral-500 max-sm:text-xs">
            Setup Sub admin control to monitor your site activity. This can only be done once.
          </p>
        </div>

        <form className="mb-6 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[calc(50%-0.5rem)]">
              <InputField label="First Name" value={firstName} onChangeAction={setFirstName} />
            </div>
            <div className="flex-1 min-w-[calc(50%-0.5rem)]">
              <InputField label="Last Name" value={lastName} onChangeAction={setLastName} />
            </div>
          </div>
          <div className="mt-4">
            <InputField label="Email" value={email} onChangeAction={setEmail} />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <Button
            variant="primary"
            className="mt-6 w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Sub Admin"}
          </Button>
        </form>

        <div className="flex flex-col w-full mt-4">
         
          <Button variant="secondary" onClick={handleLogin}>
            Login instead
          </Button>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Success!</h2>
            <p className="mb-6">
              The sub admin has been created successfully, generated password has been sent to the sub admin's email.
            </p>
            <Button
  variant="primary"
  onClick={() => {
    setShowSuccessModal(false);
    router.push("/admin-dashboard"); // Navigate to /admin-dashboard when modal closes
  }}
>
  Close
</Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminSetup;
