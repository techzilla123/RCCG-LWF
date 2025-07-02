"use client";
import * as React from "react";

interface ProductCardProps {
  image: string;
  rating: number;
  reviews: number;
  title: string;
  price: string;
  isOutOfStock?: boolean;
  isAdded?: boolean;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  rating,
  reviews,
  title,
  price,
  isOutOfStock = false,
  isAdded = false,
  isFavorite = false,
}) => {
  return (
    <article className="overflow-hidden relative flex-1 shrink bg-white rounded-2xl basis-0 max-w-[360px] min-h-[440px] min-w-[280px]">
      <img
        src={image}
        className="object-contain z-0 w-full aspect-[1.19]"
        alt={title}
      />
      <div className="z-0 flex-1 px-4 pt-4 pb-6 w-full">
        <div className="flex flex-col flex-1 w-full">
          <div className="flex gap-1 items-center self-start">
            <span className="self-stretch my-auto text-sm font-medium tracking-normal leading-6 text-black">
              {rating}
            </span>
            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4 rotate-[3.141592653589793rad]">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
                className="object-contain self-stretch my-auto w-4 aspect-square"
                alt="Star rating"
              />
            </div>
            <span className="self-stretch my-auto text-sm tracking-normal leading-6 text-neutral-500">
              ({reviews})
            </span>
          </div>
          <h3 className="mt-1 text-xl font-semibold tracking-normal leading-6 text-black">
            {title}
          </h3>
        </div>
        <div className="flex gap-4 items-center mt-2 w-full">
          <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-black whitespace-nowrap">
            {price}
          </span>
          <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0">
            <button
              className={`flex gap-2 justify-center items-center self-stretch w-full rounded-[50px] py-4 px-6
                ${
                  isOutOfStock
                    ? "bg-gray-200 text-stone-300"
                    : isAdded
                      ? "bg-stone-50 text-black"
                      : "bg-blue-600 text-white shadow-lg"
                }`}
              disabled={isOutOfStock}
            >
              <img
                src={isOutOfStock ? "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/5cca25d278a8f322c0fa7b24894a2720cc1c8608?placeholderIfAbsent=true" : isAdded ? "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/eca0832f97fa9892ff22b425fee1e837d14f11ae?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true"}
                className="object-contain self-stretch my-auto w-5 aspect-square"
                alt=""
              />
              <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-center">
                {isOutOfStock
                  ? "Out of stock"
                  : isAdded
                    ? "Added"
                    : "Add to cart"}
              </span>
            </button>
          </div>
        </div>
      </div>
      <button className="flex absolute top-3 right-3 z-0 flex-col items-end w-10">
        <div className="flex gap-2 justify-center items-center p-4 w-10 h-10 bg-white min-h-10 rounded-[50px]">
          <img
            src={isFavorite ? "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f8668567263b1a81c44635a9440205c3f21f9c73?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true"}
            className="object-contain self-stretch my-auto w-6 aspect-square"
            alt="Favorite"
          />
        </div>
      </button>
      {isOutOfStock && (
        <div className="absolute top-0 left-0 px-8 py-4 text-base font-medium tracking-normal bg-[#F03] text-white">
          Out of stock
        </div>
      )}
    </article>
  );
};
