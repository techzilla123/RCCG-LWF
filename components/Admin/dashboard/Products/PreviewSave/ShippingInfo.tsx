import * as React from "react";

export const ShippingInfo = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [shippingData, setShippingData] = React.useState<{
    shippedFrom?: string;
    shippingFee?: string;
    returnPolicy?: string;
    waitingTime?: string;
  }>({});

  // Load shipping info from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("pricingFormData");
    if (saved) {
      const parsed = JSON.parse(saved);
      setShippingData({
        shippedFrom: parsed.shippedFrom || "N/A",
        shippingFee: parsed.shippingFee || "N/A",
        returnPolicy: parsed.returnPolicy || "N/A",
        waitingTime: parsed.waitingTime || "N/A",
      });
    }
  }, []);

  return (
    <section className="overflow-hidden pt-4 mt-6 w-full border-t border-solid border-t-[color:var(--colour-stroke-default,#D5D5D5)]">
      <button
        className="flex flex-wrap justify-between items-center w-full"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <h2 className="text-base font-semibold text-black leading-[20px]">
          Shipping information
        </h2>
        <span className="flex gap-2.5 justify-center items-center self-stretch my-auto w-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1662cc7878a14807a495bf21efd1ec7c/568c68eeaaa026fc9e65ee05b5849ad0b09003cc?placeholderIfAbsent=true"
            alt={isExpanded ? "Collapse" : "Expand"}
            className="object-contain self-stretch my-auto w-5 aspect-square"
          />
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 text-base tracking-normal leading-6 text-neutral-500">
          <ul>
            <li>
              Shipped from:{" "}
              <span className="text-black">{shippingData.shippedFrom}</span>
            </li>
            <li>
              Order now, get by:{" "}
              <span className="text-black">{shippingData.waitingTime}</span>
            </li>
            <li>
              Return policy:{" "}
              <span className="text-black">{shippingData.returnPolicy}</span>
            </li>
            <li>
              Shipping cost:{" "}
              <span className="text-black">${shippingData.shippingFee}</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};
