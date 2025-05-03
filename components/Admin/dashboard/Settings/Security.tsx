"use client";
import React from "react";
import { PasswordForm } from "./Security/PasswordForm";
import { ThirdPartyAccounts } from "./Security/ThirdPartyAccounts";
import { TwoFactorAuth } from "./Security/TwoFactorAuth";
import { DeactivateAccount } from "./Security/DeactivateAccount";

export const Security: React.FC = () => {
  return (
    <div className="bg-white w-full min-h-screen py-12">
      <div className="max-w-3xl bg-white mx-auto px-4">
        <PasswordForm />
        <ThirdPartyAccounts />
        <TwoFactorAuth />
        <DeactivateAccount />
      </div>
    </div>
  );
};

export default Security;
