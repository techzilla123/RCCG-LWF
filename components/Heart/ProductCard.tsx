"use client";

import * as React from "react";
import { ProductRating } from "./ProductRating";
import { ProductActions } from "./ProductActions";
import { FavoriteButton } from "./FavoriteButton";
import { Inter } from 'next/font/google';
import { useRouter } from "next/navigation"; 

const inter = Inter({
  weight: ['500', '600'],
  subsets: ['latin'],
  variable: '--font-inter',
});

interface ProductCardProps {
  id: string; // ✅ Added this line
  image: string;
  title: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice?: string;

  starIcon: string;
  cartIcon: string;
  favoriteIcon: string;
  isAdded?: boolean;
  isOutOfStock?: boolean;
  onAddToCart?: () => void;
   onAddToWishlist: () => void; 
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id, // ✅ Added this
  image,
  title,
  rating,
  reviews,
  price,
   originalPrice,

  starIcon,
  cartIcon,
  favoriteIcon,
  isAdded = false,
  isOutOfStock = false,
  onAddToCart,
   onAddToWishlist, 
}) => {
  const router = useRouter(); 

  const [isFavorited, setIsFavorited] = React.useState(false);

  const handleProductClick = () => {
    router.push(`/preview?${id}`); // ✅ Send ID in query param
  };

const handleFavoriteClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  setIsFavorited(prev => !prev);
  onAddToWishlist(); // ✅ trigger wishlist API call
};


  return (
    <article className="overflow-hidden relative flex-1 shrink bg-white rounded-2xl basis-0 max-w-[360px] min-h-[440px] min-w-[280px]">
      <img
        src={image}
        alt={title}
        className="cursor-pointer object-contain z-0 w-full aspect-[1.19]"
        onClick={handleProductClick}
      />
      <div className="z-0 flex-1 px-4 pt-4 pb-6 w-full">
        <div className="flex flex-col flex-1 w-full">
          <ProductRating
            rating={rating}
            reviews={reviews}
            starIcon={starIcon}
          />
          <h3
  title={title} // ✅ shows full name on hover
  className={`${inter.variable} font-[var(--font-inter)] font-semibold text-xl tracking-normal leading-[26px] text-black mt-2 mb-2`}
>
  {title.length > 26 ? `${title.slice(0, 23)}...` : title}
</h3>

        </div>
       <div className="flex flex-col gap-1 mb-2">
          {originalPrice && <span className="text-gray-500 line-through text-sm font-medium">{originalPrice}</span>}
          <ProductActions
            price={price}
            isAdded={isAdded}
            isDisabled={isOutOfStock}
            cartIcon={cartIcon}
            onAddToCart={onAddToCart}
          />
        </div>
  
      </div>

      <div onClick={handleFavoriteClick}>
  <FavoriteButton icon={isFavorited ? "/Vector(2).svg" : favoriteIcon} />
</div>


      {isOutOfStock && (
        <div className="absolute top-0 left-0 bg-[#F03] text-white text-[14px] font-medium px-2.5 py-1 rounded-tl-[6px] rounded-br-[6px] z-10">
          Out of stock
        </div>
      )}
    </article>
  );
};
