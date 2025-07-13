"use client";
import * as React from "react";

export const ProductInfo = () => {
  const [productName, setProductName] = React.useState("");
  const [keywords, setKeywords] = React.useState<string[]>([]);

  const [price, setPrice] = React.useState("");
  const [stock, setStock] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [discountExpires, setDiscountExpires] = React.useState("");

  // Load product name
  React.useEffect(() => {
    const storedName = localStorage.getItem("productName");
    if (storedName) setProductName(storedName);
  }, []);

  // Load keywords
  React.useEffect(() => {
    const storedTags = localStorage.getItem("productTags");
    if (storedTags) {
      const parsed = JSON.parse(storedTags);
      const textsOnly = parsed.map((tag: { text: string }) => tag.text);
      setKeywords(textsOnly);
    }
  }, []);

  // Load pricing data
  React.useEffect(() => {
    const saved = localStorage.getItem("pricingFormData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setPrice(parsed.price || "0");
      setStock(parsed.stock || "0");
      setDiscount(parsed.discount || "");
      setDiscountExpires(parsed.discountExpires || "");
    }
  }, []);

  const calculateDiscountedPrice = () => {
    if (!discount.includes("%")) return price;
    const raw = parseFloat(price);
    const percentage = parseFloat(discount.replace("%", ""));
    const discounted = raw - raw * (percentage / 100);
    return discounted.toFixed(2);
  };

  return (
    <section className="mt-6 w-full rounded-lg">
      <div className="flex flex-col justify-center w-full">
        <span className="gap-1 self-start px-1.5 py-px text-xs text-black bg-green-100 rounded">
          {stock || "0"} In-stock
        </span>

        <h1 className="mt-3 text-2xl text-black">
          {productName || "All-In-One Happy Birthday Bash Décor Kit"}
        </h1>

        <div className="flex flex-wrap gap-2 items-start mt-3 w-full text-sm text-black">
          {keywords.length > 0 ? (
            keywords.map((tag, index) => (
              <span key={index} className="text-sm leading-[24px]">
                {tag}
              </span>
            ))
          ) : (
            <>
              <span>Balloons</span>
              <span>Birthday</span>
              <span>Weddings</span>
            </>
          )}
        </div>

        <div className="pt-2 mt-3 w-full">
          <div className="flex flex-wrap gap-1 items-center w-full">
            <span className="text-xl font-semibold text-black leading-[24px]">
              ${calculateDiscountedPrice()}
            </span>

            {discount && (
              <>
                <span className="text-sm text-neutral-500 line-through">
                  ${price}
                </span>
                <span className="px-1.5 text-xs text-amber-500 bg-yellow-50 rounded">
                  {discount} off
                </span>
              </>
            )}
          </div>

          {discountExpires && (
            <p className="mt-1.5 text-sm font-medium">
              <span className="text-neutral-500">Ends on:</span>{" "}
              <span className="text-rose-600">{discountExpires}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
