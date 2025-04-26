"use client";
import * as React from "react";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessIcon: React.FC = () => {
  return (
    <figure className="flex z-0 gap-2.5 items-center self-center p-10 w-52 bg-green-50 aspect-square rounded-[1000px] max-md:px-5">
      <img
        src="/icon.svg"
        alt="Success checkmark"
        className="object-contain self-stretch my-auto w-32 aspect-square"
      />
    </figure>
  );
};

const MessageSection: React.FC = () => {
  return (
    <header className="flex z-0 flex-col justify-center mt-6 w-full max-md:max-w-full">
      <h1 className="self-center text-4xl text-black">You're all set!</h1>
      <p className="mt-1 text-base tracking-normal leading-6 text-center text-neutral-500 max-md:max-w-full">
        Your account is ready, you can now make memorable shopping choices
      </p>
    </header>
  );
};

const ActionButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="z-0 gap-2 self-stretch p-4 mt-6 w-full h-14 text-base font-medium tracking-normal leading-6 text-center text-white bg-blue-600 min-h-14 rounded-[50px] max-md:max-w-full hover:bg-blue-700 transition-colors"
    >
      Shop now
    </button>
  );
};

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className="flex absolute top-0 right-0 z-0 gap-2 justify-center items-center p-4 w-14 h-14 bg-black bg-opacity-0 min-h-14 rounded-[50px] hover:bg-black hover:bg-opacity-5 transition-colors"
    >
      <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-6">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/7c9a8921af402fe2c615894676c0ed9939ac943c?placeholderIfAbsent=true"
          alt="Close icon"
          className="object-contain self-stretch my-auto w-6 aspect-square"
        />
      </span>
    </button>
  );
};

export const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <section className="flex relative flex-col px-10 pt-16 pb-10 bg-white rounded-3xl max-w-[560px] max-md:px-5 w-full animate-fadeIn">
        <SuccessIcon />
        <MessageSection />
        <ActionButton onClick={onClose} />
        <CloseButton onClick={onClose} />
      </section>
    </div>
  );
};
