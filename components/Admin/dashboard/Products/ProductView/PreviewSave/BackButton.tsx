"use client";
import * as React from "react";

type BackButtonProps = {
  onPrevious: () => void;
};

export const BackButton = ({ onPrevious }: BackButtonProps) => {
  return (
    <button
      onClick={onPrevious}
      className="flex items-center gap-2 pt-2 pb-4 px-2 bg-transparent rounded-full"
      aria-label="Go back"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/cad23a664a73df2541fd46164967f413d351ed3a?placeholderIfAbsent=true"
        alt="Back arrow"
        className="w-4 h-4"
      />
      <span className="text-base font-medium text-black leading-6">Back</span>
    </button>
  );
};
