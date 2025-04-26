"use client";
import React from "react";
import Rating from "./Rating";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
import { useRouter } from "next/navigation"; 

interface ProductCardProps {
  image: string;
  rating: number;
  reviews: number;
  title: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  rating,
  reviews,
  title,
  price,
}) => {
  const router = useRouter(); 
  const handleProductClick = () => {
    router.push("/preview");
  };

  return (
    <article className="overflow-hidden relative flex-1 shrink self-stretch my-auto bg-white rounded-2xl basis-0 max-w-[360px] min-h-[440px] min-w-80">
      <img
        src={image}
        alt={title}
        className="cursor-pointer object-contain z-0 w-full aspect-[1.33]"
        onClick={handleProductClick} 
      />

      <div className="z-0 flex-1 px-4 pt-4 pb-6 w-full">
        <div className="flex flex-col flex-1 w-full">
          <Rating rating={rating} reviews={reviews} />
          <h3 className="mt-1 text-xl font-semibold tracking-normal leading-6 text-black">
            {title}
          </h3>
        </div>

        <div className="flex gap-4 items-center mt-2 w-full">
          <span className="self-stretch my-auto text-base font-medium tracking-normal leading-6 text-black whitespace-nowrap">
            {price}
          </span>
          <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0">
            <AddToCartButton />
          </div>
        </div>
      </div>

      <div className="flex absolute top-3 right-3 z-0 flex-col items-end w-10">
        <WishlistButton />
      </div>
    </article>
  );
};

export default ProductCard;
