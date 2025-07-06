"use client";
import React, { useEffect, useState } from 'react';
import { ProductCardM } from './ProductCard';
import { Product } from './types';

interface RawProduct {
  productId: string;
  imageOne: string;
  productName: string;
  price: number;
  quantity: number;
}

// Interface for localStorage items (matching the desktop version)
interface LocalStorageWishlistItem {
  product_id: string;
  quantity: string;
  size: string;
  color: string;
  productName?: string;
  price?: number;
  discountPrice?: number;
  finalPrice?: number;
  imageOne?: string;
}

// Interface for cart localStorage items
interface LocalStorageCartItem {
  product_id: string;
  quantity: string;
  size: string;
  color: string;
  productName?: string;
  price?: number;
  discountPrice?: number;
  finalPrice?: number;
  imageOne?: string;
}

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // Helper function to calculate final price
  const calculateFinalPrice = (price: number, discountPrice: number): number => {
    return Math.max(0, price - discountPrice);
  };

  // Helper function to save cart items to localStorage
  const saveCartToLocalStorage = (productId: string, productData?: any) => {
    try {
      const existingCart = localStorage.getItem("localCart");
      const cartItems: LocalStorageCartItem[] = existingCart ? JSON.parse(existingCart) : [];
      
      // Check if item already exists
      const existingItemIndex = cartItems.findIndex((item) => item.product_id === productId);
      
      const price = typeof productData?.price === "number" ? productData.price : 0;
      const discountPrice = 0; // Default discount
      const finalPrice = calculateFinalPrice(price, discountPrice);
      
      const newItem: LocalStorageCartItem = {
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
        ...(productData && {
          productName: productData.title,
          price: price,
          discountPrice: discountPrice,
          finalPrice: finalPrice,
          imageOne: productData.image,
        }),
      };

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const currentQty = parseInt(cartItems[existingItemIndex].quantity) || 1;
        cartItems[existingItemIndex].quantity = (currentQty + 1).toString();
      } else {
        // Add new item
        cartItems.push(newItem);
      }

      localStorage.setItem("localCart", JSON.stringify(cartItems));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  // Function to sync localStorage wishlist to server
  const syncLocalWishlistToServer = async (token: string) => {
    try {
      setSyncing(true);
      const localWishlist = localStorage.getItem("localWishlist");
      if (!localWishlist) {
        setSyncing(false);
        return;
      }

      const localItems: LocalStorageWishlistItem[] = JSON.parse(localWishlist);
      if (localItems.length === 0) {
        setSyncing(false);
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      };

      // Sync each item to server
      const syncPromises = localItems.map(async (item) => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-wish-list`;
        const body = JSON.stringify({
          product_id: item.product_id,
          quantity: item.quantity || "1",
          size: item.size || "",
          color: item.color || "",
        });

        const res = await fetch(url, {
          method: "POST",
          headers,
          body,
        });
        return res.json();
      });

      await Promise.all(syncPromises);
      // Clear localStorage after successful sync
      localStorage.removeItem("localWishlist");
      console.log("Wishlist synced successfully");
    } catch (err) {
      console.error("Failed to sync wishlist:", err);
    } finally {
      setSyncing(false);
    }
  };

  // Watch for token changes and sync when token becomes available
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      syncLocalWishlistToServer(token);
    }
  }, []); // Run once on mount

  useEffect(() => {
    async function fetchProducts() {
      try {
        const token = localStorage.getItem("accessToken");
        
        if (!token) {
          // No token found, load from localStorage
          const localWishlist = localStorage.getItem("localWishlist");
          if (localWishlist) {
            const localItems: LocalStorageWishlistItem[] = JSON.parse(localWishlist);
            const formattedProducts: Product[] = localItems.map((item) => ({
              id: item.product_id,
              image: item.imageOne || "/placeholder.svg",
              title: item.productName || "Unknown Product",
              price: item.price || 0,
              isOutOfStock: false,
              isWishlisted: true,
            }));
            setProducts(formattedProducts);
          } else {
            setProducts([]);
          }
          setLoading(false);
          return;
        }

        // Token found, fetch from API
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}customer/wish-list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
            Authorization: token,
          },
        });

        const json: {
          statusCode: number;
          data: { productDetails?: RawProduct[] } | RawProduct[];
        } = await res.json();

        if (json.statusCode === 200) {
          let productArray: RawProduct[] = [];
          
          // Handle different response structures
          if (Array.isArray(json.data)) {
            productArray = json.data;
          } else if (json.data && 'productDetails' in json.data && Array.isArray(json.data.productDetails)) {
            productArray = json.data.productDetails;
          }

          const formatted: Product[] = productArray.map((p) => ({
            id: p.productId,
            image: p.imageOne,
            title: p.productName,
            price: p.price,
            isOutOfStock: p.quantity === 0,
            isWishlisted: true,
          }));
          setProducts(formatted);
        } else {
          console.error("Invalid response:", json);
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleRemoveFromWishlist = async (productId: string) => {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
      // Remove from localStorage only
      const localWishlist = localStorage.getItem("localWishlist");
      if (localWishlist) {
        const localItems: LocalStorageWishlistItem[] = JSON.parse(localWishlist);
        const updatedItems = localItems.filter((item) => item.product_id !== productId);
        localStorage.setItem("localWishlist", JSON.stringify(updatedItems));
      }
      // Update state
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      return;
    }

    // Remove from server if token exists
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      };

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/remove-from-wish-list`;
      const body = JSON.stringify({
        product_id: productId,
      });

      const res = await fetch(url, {
        method: "DELETE",
        headers,
        body,
      });

      const result = await res.json();
      if (res.ok && result.statusCode === 200) {
        // Update state after successful removal
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      } else {
        console.error("Failed to remove from wishlist:", result.message);
        alert("Failed to remove item from wishlist");
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      alert("Something went wrong while removing from wishlist");
    }
  };

  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem("accessToken");
    const productData = products.find((product) => product.id === productId);

    if (!token) {
      // Save to localStorage instead of showing login alert
      const saved = saveCartToLocalStorage(productId, productData);
      if (saved) {
        alert("Product saved to cart! Sign in to sync your cart.");
      } else {
        alert("Failed to save product to cart.");
      }
      return;
    }

    // Add to server cart if token exists
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart`;
      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      };

      const body = JSON.stringify({
        product_id: productId,
        quantity: "1",
        size: "",
        color: "",
      });

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });

      const result = await response.json();
      if (!response.ok || result.statusCode !== 200) {
        throw new Error(result.message || "Failed to add to cart");
      }

      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Could not add to cart.");
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <section className="w-full">
      {syncing && (
        <div className="text-center w-full mb-4 p-2 bg-blue-100 text-blue-800 rounded">
          Syncing your wishlist...
        </div>
      )}
      
      {products.length === 0 ? (
        <p className="text-center w-full p-4">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <ProductCardM 
                product={product} 
                onRemoveFromWishlist={handleRemoveFromWishlist}
                onAddToCart={handleAddToCart}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </section>
  );
};
