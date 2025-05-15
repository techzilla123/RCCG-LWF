'use client';

import { useState } from 'react';
import Link from 'next/link'; // ⬅️ Add this
import { Product } from './types';
import { HeartIcon } from './HeartIcon';
import { CartIcon } from './CartIcon';
import { IconButton } from './IconButton';
import { OutOfStockBadge } from './OutOfStockBadge';

interface ProductCardProps {
  product: Product;
}

export const ProductCardM: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const [isInCart, setIsInCart] = useState(false); // Optional: initialize from props if needed

const handleAddToCart = () => {
  if (!product.isOutOfStock) {
    setIsInCart(!isInCart);
    console.log('Add to cart:', product.id);
  }
};


  return (
    <article className="flex relative flex-col items-start bg-white rounded-lg flex-grow h-[172px] w-full min-w-0">
      <Link href={`/preview`} className="w-full">
        <img
          src={product.image}
          alt={product.title}
          className="h-[100px] w-full object-cover rounded-t-[8px] cursor-pointer"
        />
      </Link>

      <div className="flex flex-col gap-1 items-start p-2 w-full">
        <Link href={`/preview`} className="w-full">
          <h3 className="w-full text-xs leading-4 text-black truncate cursor-pointer">
            {product.title}
          </h3>
        </Link>
        <div className="flex flex-col gap-2 justify-center items-start w-full">
          <p className="w-full text-base font-bold leading-5 text-black">
            ${product.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex absolute top-2 flex-col gap-1 items-end right-[6.5px]">
      <IconButton
  onClick={handleWishlist}
  ariaLabel={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
>
  <HeartIcon filled={isWishlisted} />
</IconButton>

{!product.isOutOfStock && (
  <IconButton
    onClick={handleAddToCart}
    ariaLabel="Add to cart"
  >
    <CartIcon filled={isInCart} />
  </IconButton>
)}

      </div>

      {product.isOutOfStock && <OutOfStockBadge />}
    </article>
  );
};
