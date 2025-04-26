import * as React from "react";

interface CategoryHeaderProps {
  title: string;
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  onScrollLeft,
  onScrollRight,
}) => {
  return (
    <header className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
      <h2 className="self-stretch my-auto text-2xl text-black">{title}</h2>
      <nav className="flex gap-2 justify-center items-center self-stretch my-auto">
      <button
  onClick={onScrollLeft}
  className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shadow-sm hover:bg-stone-100 transition"
  aria-label="Previous category"
>
  <img
    src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/7b04739618d40e74527b46b077dca7f56129afce?placeholderIfAbsent=true"
    alt="Previous"
    className="w-5 h-5 object-contain"
  />
</button>

<button
  onClick={onScrollRight}
  className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center shadow-sm hover:bg-stone-100 transition"
  aria-label="Next category"
>
  <img
    src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/a6c55d3c14bd32d2387d44d821614eb85b645549?placeholderIfAbsent=true"
    alt="Next"
    className="w-5 h-5 object-contain"
  />
</button>

      </nav>
    </header>
  );
};
