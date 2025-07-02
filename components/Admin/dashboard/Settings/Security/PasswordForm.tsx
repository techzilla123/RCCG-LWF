"use client";
import React, { useState } from "react";
import { SecuritySection } from "./SecuritySection";
import { Input } from "./Input";
import { Button } from "./Button";

export const PasswordForm: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("accessToken") || "";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/update-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            ...(token && { Authorization: token }),
          },
          body: JSON.stringify({
            password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password.");
      }

      setShowSuccessModal(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const err = error as Error;
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SecuritySection
      title="Password"
      description="Create or update password and improve your account security"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start pt-6 w-full max-md:max-w-full"
      >
        <Input
          label="Current password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mb-4"
        />
        <Input
          label="New password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mb-4"
        />
        <Input
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4"
        />
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update password"}
        </Button>
      </form>

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
              Your password has been updated successfully.
            </p>
            <Button
              variant="primary"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </SecuritySection>
  );
};
