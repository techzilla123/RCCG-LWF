// ProductCardM.tsx
import { useState } from 'react';
import { Product } from './types';
import { HeartIcon } from './HeartIcon';
import { CartIcon } from './CartIcon';
import { IconButton } from './IconButton';
import { OutOfStockBadge } from './OutOfStockBadge';
import Link from 'next/link'; 

interface ProductCardProps {
  product: Product;
}

export const ProductCardM: React.FC<ProductCardProps> = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.isWishlisted || false);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleWishlist = () => setIsWishlisted(prev => !prev);

  const handleAddToCart = async () => {
    if (product.isOutOfStock || loading) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        // e.g. open login/signup modal
        console.warn("User not logged in");
        return;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart/${product.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token,
          },
        }
      );
      const json = await res.json();
      if (res.ok && json.statusCode === 200) {
        setIsInCart(true);
      } else {
        console.error("Add to cart failed:", json);
      }
    } catch (e) {
      console.error("Error adding to cart:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
 <article className="relative flex flex-col p-2 bg-white rounded-lg">
  <Link href={`/preview?${product.id}`} className="w-full block">
    <img
      src={product.image}
      alt={product.title}
      className="w-full h-auto object-contain rounded-t max-h-[150px] cursor-pointer"
    />
  </Link>

  <div className="mt-2 flex-1">
    <h3 className="text-xs font-semibold truncate">{product.title}</h3>
    <p className="mt-1 font-bold">${product.price.toLocaleString()}</p>
  </div>

  <div className="absolute top-2 right-2 flex flex-col gap-1">
    <IconButton onClick={handleWishlist} ariaLabel="Wishlist">
      <HeartIcon filled={isWishlisted} />
    </IconButton>
    {!product.isOutOfStock && (
      <IconButton onClick={handleAddToCart} ariaLabel="Add to cart" disabled={loading}>
        <CartIcon filled={isInCart} />
      </IconButton>
    )}
  </div>

  {product.isOutOfStock && <OutOfStockBadge />}
</article>

  );
};
