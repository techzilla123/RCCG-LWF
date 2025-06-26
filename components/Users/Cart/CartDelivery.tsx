"use client";
import React, { useState, useEffect } from "react";

// 1. Define the LocationInfo type
type LocationInfo = {
  country: string;
  city: string;
  deliveryDate: string;
  deliveryTime: string;
  address: string;
  postalCode: string;
  specialInstructions: string;
  pickupLocation: string;
  pickupDate: string;
  pickupTime: string;
  phoneNumber: string;
};

// 2. Define the delivery methods
type DeliveryMethod = "pickup" | "local" | "shipping";

// 3. Define defaultLocations with proper typing
const defaultLocations: Record<DeliveryMethod, LocationInfo> = {
  pickup: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
  },
  local: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
  },
  shipping: {
    country: "USA",
    city: "Houston, Texas",
    deliveryDate: "",
    deliveryTime: "",
    address: "",
    postalCode: "",
    specialInstructions: "",
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "",
    phoneNumber: "",
  },
};

const DeliveryOptions = () => {
  const savedMethod =
    typeof window !== "undefined"
      ? (localStorage.getItem("deliveryMethod") as DeliveryMethod) || "pickup"
      : "pickup";

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>(
    savedMethod
  );

  const savedLocation =
    typeof window !== "undefined"
      ? localStorage.getItem("deliveryLocation")
      : null;

  const [location, setLocation] = useState<LocationInfo>(
    savedLocation
      ? JSON.parse(savedLocation)
      : defaultLocations[savedMethod]
  );

  useEffect(() => {
    localStorage.setItem("deliveryLocation", JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem("deliveryMethod", deliveryMethod);
    setLocation(defaultLocations[deliveryMethod]); // Reset location when method changes
  }, [deliveryMethod]);

  
  const handleLocationChange = (key: keyof LocationInfo, value: string) => {
    setLocation((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="mt-6">
      <h3 className="text-base font-semibold text-black mb-3">
        Choose Delivery Method
      </h3>

      {/* Delivery Method Options */}
      <div className="flex justify-between gap-4">
        {[
          {
            method: "pickup",
            label: "Pickup",
            icon: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          },
          {
            method: "local",
            label: "Local Delivery",
            icon: "/Branded_Van__1_-removebg-preview.png",
          },
          {
            method: "shipping",
            label: "Shipping",
            icon: "https://cdn-icons-png.flaticon.com/512/1239/1239525.png",
          },
        ].map(({ method, label, icon }) => (
          <button
            key={method}
            onClick={() => setDeliveryMethod(method as DeliveryMethod)}
            className={`flex-1 border border-gray-300 rounded-xl p-3 flex flex-col items-center hover:shadow-md ${
              deliveryMethod === method ? "border-black shadow-lg" : ""
            }`}
          >
            <img src={icon} alt={label} className="w-10 h-10 mb-2" />
            <span className="text-sm text-black font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Pickup Details */}
      {deliveryMethod === "pickup" && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-black">Pickup Location</h3>
          <div className="mt-2">
            <p className="text-sm text-black">
              <strong>Address:</strong> 1919 Faithon P Lucas Sr. Blvd, #135, Mesquite TX 75181
            </p>
          </div>

          <div className="mt-4">
            <label className="block text-sm">Pickup Date</label>
            <input
              type="date"
              value={location.pickupDate}
              onChange={(e) => handleLocationChange("pickupDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Pickup Time</label>
            <input
              type="time"
              value={location.pickupTime}
              onChange={(e) => handleLocationChange("pickupTime", e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm">Phone Number</label>
            <input
              type="tel"
              value={location.phoneNumber}
              onChange={(e) => handleLocationChange("phoneNumber", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter phone number"
            />
          </div>

        </div>
      )}

      {/* Local Delivery Details */}
      {deliveryMethod === "local" && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-black">Local Delivery</h3>
          <div className="mt-2">
            <label className="block text-sm">Delivery Date</label>
            <input
              type="date"
              value={location.deliveryDate}
              onChange={(e) => handleLocationChange("deliveryDate", e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Delivery Time</label>
            <input
              type="time"
              value={location.deliveryTime}
              onChange={(e) => handleLocationChange("deliveryTime", e.target.value)}
              className="p-2 border rounded-lg w-full"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Delivery Address</label>
            <input
              type="text"
              value={location.address}
              onChange={(e) => handleLocationChange("address", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter local address"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Phone Number</label>
            <input
              type="tel"
              value={location.phoneNumber}
              onChange={(e) => handleLocationChange("phoneNumber", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Zip Code</label>
            <input
              type="text"
              value={location.postalCode}
              onChange={(e) => handleLocationChange("postalCode", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter Zip code"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Special Instructions</label>
            <textarea
              value={location.specialInstructions}
              onChange={(e) => handleLocationChange("specialInstructions", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Any special instructions?"
            />
          </div>
        </div>
      )}

      {/* Shipping Details */}
      {deliveryMethod === "shipping" && (
        <div className="mt-6">
          <h3 className="text-base font-semibold text-black">Shipping Information</h3>
          <div className="mt-2">
            <label className="block text-sm">Shipping Address</label>
            <input
              type="text"
              value={location.address}
              onChange={(e) => handleLocationChange("address", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter shipping address"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Zip Code</label>
            <input
              type="text"
              value={location.postalCode}
              onChange={(e) => handleLocationChange("postalCode", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter Zip code"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Phone Number</label>
            <input
              type="tel"
              value={location.phoneNumber}
              onChange={(e) => handleLocationChange("phoneNumber", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Enter phone number"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm">Special Instructions</label>
            <textarea
              value={location.specialInstructions}
              onChange={(e) => handleLocationChange("specialInstructions", e.target.value)}
              className="p-2 border rounded-lg w-full"
              placeholder="Any special instructions?"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;
