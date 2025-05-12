"use client";
import React, { useState } from "react";
import  FiltersDefault  from "./Shop/FiltersDefault";
import { ProductCard } from "./Shop/ProductCard";
import { Pagination } from "./Shop/Pagination";
import { X } from "lucide-react";
const products = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f06e2469f60dcf69c58e22967019fa4149988610?placeholderIfAbsent=true",
    title: "Colourful Kids Birthday Latex Balloons",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cb390dce5451e2e781d761e03e8beb8ba033458?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/659be93a7c406efa8073a635c7fb839f349ddff8?placeholderIfAbsent=true",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/6bd3320c78972703d7c34d6d67c2049c51abf6c1?placeholderIfAbsent=true",
    title: "Transparent Bubble Balloon with Custom Sti...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/057374aad3f176f674a5d460fde109d940ab3ecb?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/93c875b96d14af05838420f074f8f210f0e96359?placeholderIfAbsent=true",
    isAdded: true,
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/355208e8951835bcab4b9a74aec7484770476d88?placeholderIfAbsent=true",
    title: "Elegant Golden Age Birthday Celebration Se...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/90050c11fb15de678054befb8201346fb2059e7f?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f47d567bb0bea8866be751f7746e5d3e6385902f?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/adf8737dee8b2f0bcc06cf30467a87ff7a020e9c?placeholderIfAbsent=true",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/aef92c183f5abac4d898816d141b41d64ab743f3?placeholderIfAbsent=true",
    title: "All-In-One Happy Birthday Bash Décor Kit...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/90050c11fb15de678054befb8201346fb2059e7f?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/5cca25d278a8f322c0fa7b24894a2720cc1c8608?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/5ad48c7571ffe9d475588a71106ddb8b7b8ed6f7?placeholderIfAbsent=true",
    isOutOfStock: true,
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/1f567a89328d5280863f16997cf9bf8ce582f6c8?placeholderIfAbsent=true",
    title: "Deluxe Dessert Station Setup Kit – For Insta...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/5c34b6ce08b959c30c4db9a02e9226c6ef39fdde?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/fe53f1f225afcd869b74edac8c283aba622c050a?placeholderIfAbsent=true",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/d19379726cb326f40bd088f574386879d5752a63?placeholderIfAbsent=true",
    title: "Sparkle & Shine Birthday Cake Topper Set with...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/eca0832f97fa9892ff22b425fee1e837d14f11ae?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f8668567263b1a81c44635a9440205c3f21f9c73?placeholderIfAbsent=true",
    isAdded: true,
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/91f5437e2bd8c65c0396e14c5e41de7b5824ffd0?placeholderIfAbsent=true",
    title: "Transparent Bubble Balloon with Custom Sti...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/90050c11fb15de678054befb8201346fb2059e7f?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/2ffbc07c3b4810264406b7aeadf59821ffd1ca72?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/b0e2542cefa52a839aaa07db6889d34b053c466d?placeholderIfAbsent=true",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/24dc37ff0efa9d1bacc0d332c22f09f9d953078c?placeholderIfAbsent=true",
    title: "Magical Number Celebration Balloon Kit...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/90050c11fb15de678054befb8201346fb2059e7f?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/a5972bb174752f1f8e512e63aadc853ee58f2e94?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/fc3d9f08c94eaf658d6d0dbdfc9876baf72c01cc?placeholderIfAbsent=true",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9701adafc1e199145a7cc740fff0909da6e10983?placeholderIfAbsent=true",
    title: "Sweet Treats Birthday Table Display Set Confe...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/410bc26380950af284003bd423cde84bdb4fcf6f?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f8bd1b005f74400f7ee696b8d20ec14a99b25029?placeholderIfAbsent=true",
    isOutOfStock: true,
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/565bccda9add7db9fe3c91f2ef5b1accb220045a?placeholderIfAbsent=true",
    title: "Boho Bliss Birthday Accessory Kit with Stre...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/20ba25afe941cf331864165c819502648d4c960b?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/6008ffb85fdd748e23b2b69fcf18009a270bbeee?placeholderIfAbsent=true",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/49b41f16b99ea75ea77125444f70eb443b8e9001?placeholderIfAbsent=true",
    title: "Color Explosion Birthday Party Decoration Meg...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/90050c11fb15de678054befb8201346fb2059e7f?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/11c79c5dbf56d7e904c23c32467d0261ac660752?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8cd3e85ce042eaa9a5965ae3d85e1f6e73054643?placeholderIfAbsent=true",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/98cce869caa2d0f6ac45eb685b81c33e6f8e6a4c?placeholderIfAbsent=true",
    title: "Royal Celebration Birthday Décor Box – F...",
    rating: 4.7,
    reviews: 400,
    price: "$40,000",
    starIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/90050c11fb15de678054befb8201346fb2059e7f?placeholderIfAbsent=true",
    cartIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/569faed34843ac33003c3e81975555e493000508?placeholderIfAbsent=true",
    favoriteIcon: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/bf868aabd8a4d05c016ccedd693f795c6c6979a3?placeholderIfAbsent=true",
    isAdded: true,
  },
];

export function Shop() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <main className="flex flex-wrap gap-6 px-8 py-6 max-md:px-5" style={{ background: "#F8F8F8" }}>
      
      {/* Show filter button only on mobile */}
      <div className="max-md:flex max-md:justify-center max-md:w-full max-md:block hidden">
        <button
          className="max-md:w-32 max-md:px-4 max-md:py-2 max-md:bg-blue-500 max-md:text-white max-md:rounded-lg max-md:my-4"
          onClick={toggleModal}
        >
          Filters
        </button>
      </div>

      {/* Show FiltersDefault as a modal on mobile or as a permanent component on desktop */}
      {isModalVisible && (
      <div className="max-md:flex max-md:fixed max-md:top-0 max-md:left-0 max-md:right-0 max-md:bottom-0 max-md:bg-opacity-50 max-md:bg-black max-md:z-50 max-md:justify-center max-md:items-center max-md:overflow-y-auto">
  <div className="max-md:w-full max-md:h-auto ml-[60px] max-md:max-h-[90vh] max-md:overflow-y-scroll">
  <button
          className="fixed md:hidden ml-[100px] p-2 bg-blue-100 rounded-full hover:bg-gray-100 -mt-2 transition"
          onClick={() => setIsModalVisible(!isModalVisible)}
          aria-label="Close Menu" 
        >
        <X className="w-6 h-6" />
        </button>
    <FiltersDefault />
  </div>
</div>

      )}

      {/* Filters are permanently visible on desktop */}
      <div className="max-md:hidden">
        <FiltersDefault />
      </div>

      <section className="flex flex-col flex-1 shrink justify-center self-start basis-8 min-w-60 max-md:max-w-full">
        <div className="flex flex-wrap gap-6 items-start w-full max-md:max-w-full">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <Pagination />
      </section>
    </main>
  );
}