import * as React from "react";

export const ShippingInfo = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);

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
              Shipped from: <span className="text-black">USA</span>
            </li>
            <li>
              Order now, get by:{" "}
              <span className="text-black">May 15, 2025</span>
            </li>
            <li>
              Return policy: <span className="text-black">within 7 days</span>
            </li>
            <li>
              Shipping cost: <span className="text-black">$24.00</span>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
};