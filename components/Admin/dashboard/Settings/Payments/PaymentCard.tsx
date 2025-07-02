"use client";
import * as React from "react";

interface PaymentCardProps {
  cardType: string;
  cardNumber: string;
  holderName: string;
}

export function PaymentCard({ cardType, cardNumber, holderName }: PaymentCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl w-full max-w-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
          {/* Card Logo placeholder */}
          <img
          src="/fintechBrands.png"
          alt="card icon"
          className="w-10 h-10"
        />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-neutral-500">{cardType}</p>
          <p className="text-lg font-semibold text-black">{cardNumber}</p>
          <p className="text-sm text-neutral-500">{holderName}</p>
        </div>
      </div>

      <button className="p-2 rounded-full hover:bg-gray-200">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4a0f88a45245c3828ebf41b59fb38b7a784be234?placeholderIfAbsent=true"
          alt="Delete card"
          className="w-5 h-5"
        />
      </button>
    </div>
  );
}
