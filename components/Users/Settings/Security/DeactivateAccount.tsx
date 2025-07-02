"use client";
import React from "react";
import { SecuritySection } from "./SecuritySection";
import { Button } from "./Button";

export const DeactivateAccount: React.FC = () => {
  return (
    <SecuritySection
      title="Deactivate account"
      description={
        <span className="font-inter text-base text-neutral-500">
          By deactivating your account, all data and records associated with this account will be erased. 
          Deactivated accounts can be retrieved within 30 days of deactivation by contacting our customer service team at{" "}
          <a
            href="mailto:contact@partyplace&rentals.com"
            className="underline text-[#007AFF] hover:text-blue-700 transition-colors"
          >
            contact@partyplace&rentals.com
          </a>.
        </span>
      }
      className="mt-10"
    >
      <div className="flex justify-start mt-1">
        <Button variant="danger" className="w-[220px]">
          Deactivate account
        </Button>
      </div>
    </SecuritySection>
  );
};
