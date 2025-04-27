"use client";
import React, { useState } from "react";
import { SecuritySection } from "./SecuritySection";
import { Input } from "./Input";
import { Button } from "./Button";

export const PasswordForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SecuritySection
      title="Password"
      description="Create or update password and improve your account security"
    >
      <form className="flex flex-col items-start pt-6 w-full max-md:max-w-full">
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
          className="mb-6"
        />
        <Button variant="primary">Update password</Button>
      </form>
    </SecuritySection>
  );
};
