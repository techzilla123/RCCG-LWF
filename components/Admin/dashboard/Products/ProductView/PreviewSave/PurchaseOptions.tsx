"use client";
import * as React from "react";

export const PurchaseOptions = () => {
  const [selectedSize, setSelectedSize] = React.useState("");
  const [selectedColor, setSelectedColor] = React.useState("");
  const [availableSizes, setAvailableSizes] = React.useState<string[]>([]);
  const [availableColors, setAvailableColors] = React.useState<string[]>([]);

  React.useEffect(() => {
    const savedSizes = JSON.parse(localStorage.getItem("selectedSizes") || "[]");
    const savedColors = JSON.parse(localStorage.getItem("selectedColors") || "[]");

    setAvailableSizes(savedSizes);
    setAvailableColors(savedColors);
  }, []);

  return (
    <section className="p-4 mt-6 w-full rounded-xl bg-stone-50">
      <div className="flex flex-col w-full font-medium text-center text-black">
        <label className="self-start text-sm text-black leading-[24px]">
          Select size
        </label>
        <div className="flex flex-wrap gap-10 justify-between items-center mt-1 w-full text-base tracking-normal">
          {availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`text-base text-black leading-[24px] ${
                selectedSize === size ? "font-bold" : ""
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col mt-4 w-full">
        <label className="self-start text-sm font-medium text-black leading-[24px]">
          Choose colour
        </label>
        <div className="flex flex-wrap gap-6 items-center mt-2 w-full">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className="flex flex-col items-center gap-1 focus:outline-none"
            >
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedColor === color ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
              <span className="text-xs text-black capitalize">{color}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
