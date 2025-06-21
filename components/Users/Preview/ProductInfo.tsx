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
  sizes: string[];
  colors: string[];
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
  sizes,      // ✅ now passed in
  colors,     // ✅ now passed in
}) => {
  const [selectedSize, setSelectedSize] = React.useState("l");
  const [isInflated, setIsInflated] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
  const [detailsOpen, setDetailsOpen] = React.useState(true);
const [selectedColor, setSelectedColor] = React.useState<string | null>(null);

  // const colorOptions = [
  //   "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9d6e368c4d3f25e0a425b18c21b33b7db12f7743?placeholderIfAbsent=true",
  //   "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/95d1d28c85e373056f1732442e037b4707b45410?placeholderIfAbsent=true",
  //   "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/57da1085acf585de304c0c1368e86bd5a567772d?placeholderIfAbsent=true",
  //   "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8d33a4ba28188906d6b370494b704fc9b467e2d9?placeholderIfAbsent=true",
  //   "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9b1f1e8197863b741ae2b8143fe7c9aba8e95187?placeholderIfAbsent=true",
  // ];

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= stock) {
      setQuantity(value);
    }
  };

  return (
    <aside className="flex-1 shrink bg-white rounded-lg basis-0 min-w-60 p-4 max-md:max-w-full">
      <div className="flex flex-col w-full leading-6 max-md:max-w-full">
        <span className="px-2 py-0.5 text-xs text-black bg-[#E1F7E6] w-[100px] rounded">
          {stock} In-stock
        </span>
        <h1 className="mt-3 text-2xl font-semibold text-black">{title}</h1>

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

      <div className="p-4 mt-6 bg-stone-50 rounded-xl">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-black">Select size</label>
          <div className="flex justify-between mt-2">
            {sizes.map((size) => (

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

        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-black">Choose colour</label>
          <div className="flex gap-4 mt-2">
          {colors.map((color, i) => (
  <button
    key={i}
    onClick={() => setSelectedColor(color)}
    className={`w-7 h-7 rounded-full border transition-all duration-200 ${
      selectedColor === color ? "border-2 border-black scale-110" : "border-gray-300"
    }`}
    style={{ backgroundColor: color }}
    title={color}
  />
))}


          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-sm font-medium text-black">Quantity</label>
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={stock}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
              className="w-12 text-center border rounded"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              +
            </button>
          </div>
        </div>

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

      <div className="mt-6">
        <Button variant="primary" fullWidth>
          Add to cart
        </Button>
      </div>

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
    </aside>
  );
};
