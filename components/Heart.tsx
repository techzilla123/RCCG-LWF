"use client";
import React, { useEffect, useState } from "react";
import { ProductHeader } from "./Heart/ProductHeader";
import { ProductCard } from "./Heart/ProductCard";
import { ProductGrid } from "@/components/Users/Shop/MobileShop/ProductGrid";
import {SignUpModal} from "./Offer/SignUpModal";
import {LoginModal} from "./Offer/LoginModal";
import {SuccessModal} from "./Offer/SuccessModal";


export function Heart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [modalType, setModalType] = useState<"signup" | "login" | "success" | null>(null);

  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}customer/list-product`;

    async function fetchProducts() {
      try {
        const token = localStorage.getItem("accessToken"); // moved here, not always needed

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
          setProducts(json.data.product.map(p => ({ ...p, isAdded: false })));
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (e) {
        console.error("Fetch error:", e);
        setError(e.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

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

 const handleAddToCart = async (productId: string) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    setModalType("signup"); // or "login", based on UX preference
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
const handleLoginSuccess = () => {
  setModalType("success"); // Or close the modal and allow add to cart
};


  return (
    <section className="flex overflow-hidden flex-col justify-center self-stretch px-8 py-10 bg-sky-50 max-md:px-5">
      <ProductHeader
        rightArrowIcon="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/66d546e330544d515b682a58503bcbd12bbada55?placeholderIfAbsent=true"
      />

      <div className="hidden md:flex flex-wrap gap-6 items-start mt-6 w-full">
       {products.map((p) => (
  <ProductCard
    key={p.productId}
    image={p.imageOne}
    title={p.productName}
    rating={4.7}          // optionally replace with p.rating
    reviews={0}           // optionally replace with p.reviews
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

         <div className="block mt-6 md:hidden w-full">
  <ProductGrid />
</div>

        {/* ✅ Always render modals here so they show on all devices */}
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

    {modalType === "success" && (
      <SuccessModal onClose={handleClose} />
    )}
  </>
    </section>
  );
}

export default Heart;
