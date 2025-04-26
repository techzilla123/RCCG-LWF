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
  const [location, setLocation] = React.useState({
    country: "USA",
    city: "Houston, Texas",
  });
  const [detailsOpen, setDetailsOpen] = React.useState(true);
  const [shippingOpen, setShippingOpen] = React.useState(true);
  const [shipToMe, setShipToMe] = React.useState(false);

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

      <section className="pt-6 mt-6 border-t">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setShippingOpen(!shippingOpen)}
        >
          <h3 className="text-base font-semibold text-black">
            Shipping information
          </h3>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/568c68eeaaa026fc9e65ee05b5849ad0b09003cc?placeholderIfAbsent=true"
            alt="toggle"
            className="w-5 h-5"
          />
        </div>
        {shippingOpen && (
          <div className="mt-4 text-sm text-neutral-500">
            <ul className="space-y-2">
              <li>
                Shipped from: <span className="text-black">USA</span>
              </li>
              <li>
                Order now, get by:{" "}
                <span className="text-black">May 15, 2025</span>
              </li>
              <li>
                Return policy:{" "}
                <span className="text-black">within 7 days</span>
              </li>
              <li>
                Shipping cost: <span className="text-black">$24.00</span>
              </li>
            </ul>
          </div>
        )}
      </section>

      {/* Location Selector */}
      <div className="mt-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={shipToMe}
            onChange={(e) => setShipToMe(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-neutral-500">
            I want this to be shipped to me
          </span>
        </label>

        {shipToMe && (
          <div className="flex flex-col gap-3 mt-3">
            <select
              value={location.country}
              onChange={(e) =>
                setLocation({ ...location, country: e.target.value })
              }
              className="px-4 py-2 rounded-lg border bg-white"
            >
              <option value="USA">USA</option>
            </select>
            <select
              value={location.city}
              onChange={(e) =>
                setLocation({ ...location, city: e.target.value })
              }
              className="px-4 py-2 rounded-lg border bg-white"
            >
              <option value="Houston, Texas">Houston, Texas</option>
            </select>
          </div>
        )}
      </div>
    </aside>
  );
};
