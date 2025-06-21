"use client";

import React, { useEffect, useState, useRef } from "react";
import { ProductHeader } from "./New/ProductHeader";
import { ProductCard } from "./New/ProductCard";
import { ProductGrid } from "./New/MobileShop/ProductGrid";
import { SignUpModal } from "./Offer/SignUpModal";
import { LoginModal } from "./Offer/LoginModal";
import { SuccessModal } from "./Offer/SuccessModal";

// --- Define API and UI product types ---
interface ProductApiResponse {
  productId: string;
  productName: string;
  imageOne: string;
  price: number;
  quantity: number;
}

interface Product extends ProductApiResponse {
  isAdded: boolean;
}

export function New() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null);

  const desktopScrollRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollMobile = (direction: "left" | "right") => {
    if (mobileScrollRef.current) {
      const scrollAmount = 200;
      mobileScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
          const formattedProducts: Product[] = json.data.product.map((p: ProductApiResponse) => ({
            ...p,
            isAdded: false,
          }));
          setProducts(formattedProducts);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "An unknown error occurred";
        console.error("Fetch error:", e);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setModalType("signup");
      return;
    }

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/add-to-cart/${productId}`;

      const headers = {
        "Content-Type": "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_SECRET_KEY || "",
        Authorization: token,
      };

      const res = await fetch(url, {
        method: "GET",
        headers,
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
        setModalType("success");
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  };

  const handleClose = () => setModalType(null);
  const handleLoginSuccess = () => setModalType("success");

  const scroll = (direction: "left" | "right") => {
    if (desktopScrollRef.current) {
      const scrollAmount = 300;
      desktopScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <section className="flex justify-center items-center p-8 bg-sky-50">
        <p>Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center p-8 bg-sky-50">
        <p className="text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="relative px-8 py-10 bg-sky-50 max-md:px-5">
      <ProductHeader />

      {/* Mobile scroll buttons */}
      <div className="flex md:hidden justify-end gap-4 mt-4 pr-4">
        <button
          onClick={() => scrollMobile("left")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">‹</span>
        </button>
        <button
          onClick={() => scrollMobile("right")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">›</span>
        </button>
      </div>

      {/* Desktop scroll buttons */}
      <div className="hidden md:flex justify-end gap-4 mt-4 pr-4">
        <button
          onClick={() => scroll("left")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">‹</span>
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100"
        >
          <span className="text-lg text-black">›</span>
        </button>
      </div>

      {/* Desktop scrollable row */}
      <div
        ref={desktopScrollRef}
        className="hidden md:flex gap-6 overflow-x-auto scroll-smooth no-scrollbar mt-4 px-12"
      >
        {products.map((p) => (
          <ProductCard
            key={p.productId}
            image={p.imageOne}
            title={p.productName}
            rating={4.7}
            reviews={0}
            price={`$${p.price}`}
            starIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
            cartIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true"
            favoriteIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true"
            isOutOfStock={p.quantity === 0}
            isAdded={p.isAdded}
            onAddToCart={() => handleAddToCart(p.productId)}
          />
        ))}
      </div>

      {/* Mobile scrollable ProductGrid */}
      <div className="block md:hidden mt-6 w-full">
        <ProductGrid scrollRef={mobileScrollRef} />
      </div>

      {/* Modals */}
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

export default New;
