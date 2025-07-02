import React from "react";

interface InvoiceItemProps {
  label: string;
  value: string;
  children?: React.ReactNode;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({
  label,
  value,
  children,
}) => (
  <div className="flex justify-between items-center py-2 w-full text-base tracking-normal leading-6 max-md:max-w-full">
    <div className="text-neutral-500">{label}</div>
    <div className="text-black font-semibold">{children || value}</div>
  </div>
);

export const InvoiceDetails: React.FC = () => {
  return (
    <section className="p-6 mt-6 w-full rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
      <InvoiceItem label="Items" value="3" />
      <InvoiceItem label="Total Amount" value="$605.00" />

      {/* Divider */}
      <div className="flex gap-4 items-center py-1 mt-4 w-full border-t border-solid border-t-[color:var(--colour-fill-transparent,rgba(0,0,0,0.00))] min-h-2 max-md:max-w-full">
        <div className="flex-1 shrink self-stretch my-auto w-full bg-gray-200 border border-gray-200 border-solid basis-0 min-h-px min-w-60 max-md:max-w-full" />
      </div>

      <InvoiceItem label="Transaction date" value="03-05-2025" />

      {/* Order ID with improved style */}
      <InvoiceItem label="Order ID" value="DEC-8492DK201">
        <div className="flex justify-end gap-2 w-full">
          <div className="text-base tracking-normal leading-6 text-black whitespace-nowrap">
            DEC-8492DK201
          </div>
        </div>
      </InvoiceItem>
    </section>
  );
};
