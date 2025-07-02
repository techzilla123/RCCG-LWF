"use client";
import React, { useEffect, useState } from "react";
import { ProductHeader } from "./Heart/ProductHeader";
import { ProductCard } from "./Heart/ProductCard";
import { ProductGrid } from "@/components/Users/Shop/MobileShop/ProductGrid";
import { SignUpModal } from "./Offer/SignUpModal";
import { LoginModal } from "./Offer/LoginModal";
import { SuccessModal } from "./Offer/SuccessModal";

// Define the product structure returned by the API
interface ProductApiResponse {
  productId: string;
  productName: string;
  imageOne: string;
  price: number;
  quantity: number;
}

// Extend the product with additional client-side fields
interface Product extends ProductApiResponse {
  isAdded: boolean;
}

export function Heart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null);

  function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

  useEffect(() => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`;

  async function fetchProducts() {
    try {
      const token = localStorage.getItem("accessToken");

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        ...(token ? { Authorization: token } : {}),
      };

      const res = await fetch(url, {
        method: "GET",
        headers,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const json = await res.json();

      if (json.statusCode === 200 && Array.isArray(json.data.product)) {
        const formatted: Product[] = json.data.product.map((p: ProductApiResponse) => ({
  ...p,
  isAdded: false,
}));

const shuffledAndLimited = shuffleArray(formatted).slice(0, 16);
setProducts(shuffledAndLimited);

        // setProducts(formatted); // remove this when needed  
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (e: unknown) {
      const errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred";
      console.error("Fetch error:", e);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  fetchProducts();
}, []);


  if (loading) {
    return (
      <div className="flex items-center  justify-center h-[80vh]">
        <div className="relative w-24 h-48">
          <div className="w-16 h-20 bg-pink-400 rounded-full shadow-lg mx-auto animate-bounce" />
          <div className="w-3 h-3 bg-pink-500 mx-auto mt-1 rotate-45" />
          <div className="absolute top-[88px] left-1/2 transform -translate-x-1/2 w-px h-24 bg-gray-300 animate-pulse" />
        </div>
      </div>

    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center p-8 bg-sky-50">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }
  const handleAddToWishlist = async (productId: string) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    setModalType("signup");
    return;
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-wish-list`;

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

    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      alert("Product added to wishlist");
      console.log("Wishlist response:", data);
    } else {
      console.error("Failed to add to wishlist:", data);
      alert("Could not add product to wishlist.");
    }
  } catch (err) {
    console.error("Wishlist error:", err);
    alert("Something went wrong while adding to wishlist.");
  }
};


 const handleAddToCart = async (productId: string) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    setModalType("signup");
    return;
  }

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

    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    if (data.statusCode === 200) {
      setProducts((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, isAdded: true } : p
        )
      );
    
    } else {
      console.error("Unexpected response:", data);
    }
  } catch (err) {
    console.error("Add to cart failed:", err);
  }
};

  const handleClose = () => setModalType(null);
  const handleLoginSuccess = () => setModalType("success");

  return (
    <section className="flex overflow-hidden flex-col justify-center self-stretch px-8 py-10 bg-sky-50 max-md:px-5">
      <ProductHeader
        rightArrowIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/66d546e330544d515b682a58503bcbd12bbada55?placeholderIfAbsent=true"
      />

      <div className="hidden md:flex flex-wrap gap-6 items-start mt-6 w-full">
        {products.map((p) => (
         <ProductCard
  key={p.productId}
  id={p.productId} // ✅ This line sends the productId to ProductCard
  image={p.imageOne}
  title={p.productName.length > 26 ? p.productName.slice(0, 23) + "..." : p.productName}
  rating={4.7}
  reviews={0}
  price={`$${p.price}`}
  starIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
  cartIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true"
  favoriteIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true"
  isOutOfStock={p.quantity === 0}
  isAdded={p.isAdded}
  onAddToCart={() => handleAddToCart(p.productId)}
    onAddToWishlist={() => handleAddToWishlist(p.productId)}
/>

        ))}
      </div>

      <div className="block mt-6 md:hidden w-full">
        <ProductGrid />
      </div>

      <>
        {modalType === "signup" && (
          <SignUpModal
            onClose={handleClose}
            onOpenLogin={() => setModalType("login")}
          />
        )}

        {modalType === "login" && (
          <LoginModal
            onClose={handleClose}
            onOpenSignUp={() => setModalType("signup")}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {modalType === "success" && <SuccessModal onClose={handleClose} />}
      </>
    </section>
  );
}

export default Heart;
