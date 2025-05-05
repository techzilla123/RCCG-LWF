"use client";
import * as React from "react";
import { Button } from "./Button";

interface ProductInfoProps {
  title: string;
  stock: number;
  price: number;
  originalPrice: number;
  discount: number;
  countdownTime: string;
  description: string;
  tags: string[];
}
interface LocationInfo {
  country: string;
  city: string;
  deliveryDate: string;
  deliveryTime: string;
  address: string;
  postalCode: string;
  specialInstructions: string;
  pickupLocation: string;
}



export const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  stock,
  price,
  originalPrice,
  discount,
  countdownTime,
  description,
  tags,
}) => {
  const [selectedSize, setSelectedSize] = React.useState("l");
  const [isInflated, setIsInflated] = React.useState(false);
  const [quantity, setQuantity] = React.useState("1");
  const [deliveryMethod, setDeliveryMethod] = React.useState("pickup");
// const [pickupLocation, setPickupLocation] = React.useState("");  // Pickup location
// const [deliveryDate, setDeliveryDate] = React.useState("");       // Delivery date
// const [deliveryTime, setDeliveryTime] = React.useState("");       // Delivery time
// const [deliveryNotes, setDeliveryNotes] = React.useState("");     // Delivery notes
const [location, setLocation] = React.useState<LocationInfo>({
  country: "USA",
  city: "Houston, Texas",
  deliveryDate: "",
  deliveryTime: "",
  address: "",
  postalCode: "",
  specialInstructions: "",
  pickupLocation: "",
});

  const [detailsOpen, setDetailsOpen] = React.useState(true);
 

  const colorOptions = [
    "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9d6e368c4d3f25e0a425b18c21b33b7db12f7743?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/95d1d28c85e373056f1732442e037b4707b45410?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/57da1085acf585de304c0c1368e86bd5a567772d?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8d33a4ba28188906d6b370494b704fc9b467e2d9?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9b1f1e8197863b741ae2b8143fe7c9aba8e95187?placeholderIfAbsent=true",
  ];

  return (
    <aside className="flex-1 shrink bg-white rounded-lg basis-0 min-w-60 p-4 max-md:max-w-full">
      {/* Stock and Title */}
      <div className="flex flex-col w-full leading-6 max-md:max-w-full">
        <span className="px-2 py-0.5 text-xs text-black bg-[#E1F7E6] w-[81px] rounded">
          {stock} In-stock
        </span>
        <h1 className="mt-3 text-2xl font-semibold text-black">{title}</h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 text-sm bg-stone-50 rounded-full text-black"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price Section */}
        <div className="pt-2 mt-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-black">${price}</span>
            <span className="text-sm line-through text-neutral-500">
              ${originalPrice}
            </span>
            <span className="px-2 py-0.5 text-xs text-amber-500 bg-yellow-50 rounded">
              {discount}% off
            </span>
          </div>
          <p className="mt-1.5 text-sm font-medium">
            <span className="text-neutral-500">Ends in:</span>{" "}
            <span className="text-rose-600">{countdownTime}</span>
          </p>
        </div>
      </div>

      {/* Size and Color Section */}
      <div className="p-4 mt-6 bg-stone-50 rounded-xl">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-black">Select size</label>
          <div className="flex justify-between mt-2">
            {["xl", "l", "md", "sm", "xs"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-14 h-10 rounded-full ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "border border-black bg-transparent text-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-black">
            Choose colour
          </label>
          <div className="flex gap-4 mt-2">
            {colorOptions.map((url, i) => (
              <button
                key={i}
                className="w-7 h-7 rounded-full overflow-hidden border"
              >
                <img src={url} alt={`Color ${i + 1}`} className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-black">Quantity</label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="px-4 py-2 mt-2 rounded-lg border bg-white"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Inflate Option */}
        <div className="flex gap-4 mt-4">
          <label className="flex items-center gap-2 text-neutral-500">
            <input
              type="radio"
              checked={!isInflated}
              onChange={() => setIsInflated(false)}
            />
            Not inflated
          </label>
          <label className="flex items-center gap-2 text-neutral-500">
            <input
              type="radio"
              checked={isInflated}
              onChange={() => setIsInflated(true)}
            />
            Inflated
          </label>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6">
        <Button
          variant="primary"
          icon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/c2e3bcd5e48ed2a421f734369de394c311fa0330?placeholderIfAbsent=true"
          fullWidth
        >
          Add to cart
        </Button>
      </div>

    



      {/* Expandable Sections */}
      <section className="pt-6 mt-6 border-t">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setDetailsOpen(!detailsOpen)}
        >
          <h3 className="text-base font-semibold text-black">
            Product details
          </h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/568c68eeaaa026fc9e65ee05b5849ad0b09003cc?placeholderIfAbsent=true"
            alt="toggle"
            className="w-5 h-5"
          />
        </div>
        {detailsOpen && (
          <div className="mt-4 text-sm text-neutral-500">{description}</div>
        )}
      </section>


       {/* Delivery Options */}
<div className="mt-6">
  <h3 className="text-base font-semibold text-black mb-3">Choose Delivery Method</h3>
  <div className="flex justify-between gap-4">
    {/* Pickup Option */}
    <button
      onClick={() => setDeliveryMethod("pickup")}
      className={`flex-1 border border-gray-300 rounded-xl p-3 flex flex-col items-center hover:shadow-md ${deliveryMethod === "pickup" ? "border-black shadow-lg" : ""}`}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
        alt="Pickup"
        className="w-10 h-10 mb-2"
      />
      <span className="text-sm text-black font-medium">Pickup</span>
    </button>

    {/* Local Delivery Option */}
    <button
      onClick={() => setDeliveryMethod("local")}
      className={`flex-1 border border-gray-300 rounded-xl p-3 flex flex-col items-center hover:shadow-md ${deliveryMethod === "local" ? "border-black shadow-lg" : ""}`}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/893/893226.png"
        alt="Local Delivery"
        className="w-10 h-10 mb-2"
      />
      <span className="text-sm text-black font-medium">Local Delivery</span>
    </button>

    {/* Shipping Option */}
    <button
      onClick={() => setDeliveryMethod("shipping")}
      className={`flex-1 border border-gray-300 rounded-xl p-3 flex flex-col items-center hover:shadow-md ${deliveryMethod === "shipping" ? "border-black shadow-lg" : ""}`}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/1239/1239525.png"
        alt="Shipping"
        className="w-10 h-10 mb-2"
      />
      <span className="text-sm text-black font-medium">Shipping</span>
    </button>
  </div>

  {/* Conditional Display for Pickup */}
  {deliveryMethod === "pickup" && (
    <div className="mt-4 text-sm text-black">
      <p>Pickup location: <strong>Houston Pickup Center</strong></p>
      
    </div>
  )}

{deliveryMethod === "local" && (
  <div className="mt-6">
    <h3 className="text-base font-semibold text-black">Local Delivery</h3>
    <div className="mt-2">
      <label className="block text-sm">Delivery Date</label>
      <input
        type="date"
        value={location.deliveryDate}
        onChange={(e) => setLocation({ ...location, deliveryDate: e.target.value })}
        className="p-2 border rounded-lg w-full"
      />
    </div>

    <div className="mt-4">
      <label className="block text-sm">Delivery Time</label>
      <input
        type="time"
        value={location.deliveryTime}
        onChange={(e) => setLocation({ ...location, deliveryTime: e.target.value })}
        className="p-2 border rounded-lg w-full"
      />
    </div>
    <div className="mt-2">
      <label className="block text-sm">Shipping Address</label>
      <input
        type="text"
        value={location.address}
        onChange={(e) => setLocation({ ...location, address: e.target.value })}
        className="p-2 border rounded-lg w-full"
        placeholder="Enter shipping address"
      />
    </div>

    <div className="mt-4">
      <label className="block text-sm">Postal Code</label>
      <input
        type="text"
        value={location.postalCode}
        onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
        className="p-2 border rounded-lg w-full"
        placeholder="Enter postal code"
      />
    </div>

    <div className="mt-4">
      <label className="block text-sm">Special Instructions</label>
      <textarea
        value={location.specialInstructions}
        onChange={(e) => setLocation({ ...location, specialInstructions: e.target.value })}
        className="p-2 border rounded-lg w-full"
        placeholder="Any special instructions?"
      />
    </div>
  </div>
)}

</div>

     {/* Conditionally render based on the selected delivery method */}
{deliveryMethod === "pickup" && (
  <div className="mt-6">
    <h3 className="text-base font-semibold text-black">Pickup Location</h3>
    <div className="mt-2">
      <label className="block text-sm">Select Pickup Location</label>
      <select
        className="p-2 border rounded-lg w-full"
        onChange={(e) => setLocation({ ...location, pickupLocation: e.target.value })}
      >
        <option value="Store A">Store A</option>
        <option value="Store B">Store B</option>
        <option value="Store C">Store C</option>
      </select>
    </div>
  </div>
)}


{deliveryMethod === "shipping" && (
  <div className="mt-6">
    <h3 className="text-base font-semibold text-black">Shipping Information</h3>
    <div className="mt-2">
      <label className="block text-sm">Shipping Address</label>
      <input
        type="text"
        value={location.address}
        onChange={(e) => setLocation({ ...location, address: e.target.value })}
        className="p-2 border rounded-lg w-full"
        placeholder="Enter shipping address"
      />
    </div>

    <div className="mt-4">
      <label className="block text-sm">Postal Code</label>
      <input
        type="text"
        value={location.postalCode}
        onChange={(e) => setLocation({ ...location, postalCode: e.target.value })}
        className="p-2 border rounded-lg w-full"
        placeholder="Enter postal code"
      />
    </div>

    <div className="mt-4">
      <label className="block text-sm">Delivery Date</label>
      <input
        type="date"
        value={location.deliveryDate}
        onChange={(e) => setLocation({ ...location, deliveryDate: e.target.value })}
        className="p-2 border rounded-lg w-full"
      />
    </div>

    <div className="mt-4">
      <label className="block text-sm">Delivery Time</label>
      <input
        type="time"
        value={location.deliveryTime}
        onChange={(e) => setLocation({ ...location, deliveryTime: e.target.value })}
        className="p-2 border rounded-lg w-full"
      />
    </div>

    <div className="mt-4">
      <label className="block text-sm">Special Instructions</label>
      <textarea
        value={location.specialInstructions}
        onChange={(e) => setLocation({ ...location, specialInstructions: e.target.value })}
        className="p-2 border rounded-lg w-full"
        placeholder="Any special instructions?"
      />
    </div>
  </div>
)}

    </aside>
  );
};
