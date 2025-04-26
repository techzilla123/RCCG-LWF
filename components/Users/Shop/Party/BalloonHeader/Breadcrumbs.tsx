import * as React from "react";


interface BreadcrumbItem {
  label: string;
  isActive?: boolean;
  onClick?: () => void; // Optional onClick for clickable breadcrumbs
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
 

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex overflow-hidden gap-1 items-center text-base leading-6 text-stone-300"
    >
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <span
            className={`overflow-hidden gap-2 self-stretch px-1 my-auto h-5 tracking-normal text-center rounded-lg ${
              item.isActive
                ? "text-neutral-500"
                : "text-stone-300 " // Add cursor-pointer to clickable breadcrumbs
            } ${item.onClick ? "cursor-pointer" : ""} user-select-none`} // Prevent text selection
            onClick={item.onClick} // Attach onClick handler
          >
            {item.label}
          </span>
          {index < items.length - 1 && (
            <span
              className="overflow-hidden self-stretch text-sm leading-loose rounded-lg"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
