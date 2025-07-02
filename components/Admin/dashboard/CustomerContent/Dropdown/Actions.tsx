"use client";
import React from "react";
import Link from "next/link";

type Props = {
  direction?: "up" | "down";
  isLoading: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
  currentStatus: string;
  customerId: string;
};

const Actions = ({
  direction = "down",
  isLoading,
  onActivate,
  onDeactivate,
  onDelete,
  currentStatus,
  customerId,
}: Props) => {
  return (
    <div
      className={`w-32 bg-white shadow-lg border rounded-xl py-2 text-sm text-black ${
        direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
      } absolute right-0 z-50`}
    >
<Link href={`/admin-customer/order?customerId=${customerId}`}>
        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View</div>
      </Link>

      <div
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={currentStatus === "Active" ? onDeactivate : onActivate}
      >
        {isLoading ? "..." : currentStatus === "Active" ? "Deactivate" : "Activate"}
      </div>

      <div
        className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer"
        onClick={onDelete}
      >
        {isLoading ? "..." : "Delete"}
      </div>
    </div>
  );
};

export default Actions;
