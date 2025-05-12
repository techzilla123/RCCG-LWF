"use client";
import * as React from "react";
import { ProductGallery } from "./ProductGallery";
import { ProductRatings } from "./ProductRatings";
import { ReviewCard } from "./ReviewCard";
import { ProductInfo } from "./ProductInfo";

export const ProductPage: React.FC = () => {
  const [showMoreReviews, setShowMoreReviews] = React.useState(false);

  const reviews = [
    {
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/c969b1ff03f45b83970a38d790cd00f6778622f6?placeholderIfAbsent=true",
      name: "Hannah Schmitt",
      rating: 4,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
      date: "May 8, 2020",
    },
    {
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9b611d85fb359c569e2c7cd2b952730bab5d4171?placeholderIfAbsent=true",
      name: "Hannah Schmitt",
      rating: 4,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
      date: "May 8, 2020",
    },
    {
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/3bdd215ffeeda77df976fef6a422ea702734a5a5?placeholderIfAbsent=true",
      name: "John Maxwell",
      rating: 4,
      review: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
      date: "May 8, 2020",
    },
  ];

  return (
    <main className="flex flex-col xl:flex-row gap-10 px-8 py-8 max-w-7xl mx-auto max-md:px-4">
      {/* Info first on small screens */}
      <div className="hidden xl:flex flex-col order-1 xl:order-2 w-full xl:w-[400px] shrink-0">
  <ProductInfo
    title="Transparent Bubble Balloon with Custom Sticker"
    stock={25}
    price={400}
    originalPrice={100}
    discount={25}
    countdownTime="4d 04h 25m 40s"
    description="Material: Premium Vinyl Material, Waterproof and Weatherproof, Strong Adhesive, Easy to Apply, Customizable Design, Residue Free Removal, Multiple Font and Color Options, Perfect for Balloons and Gifts, Versatile Use, Sleek and Professional Finish, Handcrafted Precision, Long Lasting Quality, Eco Friendly"
    tags={["Balloons", "Birthday", "Latex"]}
  />
</div>


      {/* Gallery + Reviews */}
      <div className="flex flex-col order-2 xl:order-1 w-full">
      <ProductGallery
  mainImage="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/73d2dbf0b84d36e89cbe74d0b6a0257b6aeef88b?placeholderIfAbsent=true"
  images={[
    {
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/eb6faa61a8c2d1212bc2c8edb1ec3086254695df?placeholderIfAbsent=true",
      full: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/73d2dbf0b84d36e89cbe74d0b6a0257b6aeef88b?placeholderIfAbsent=true",
    },
    {
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/7d52c8bbf33cee33f1f289d46230503a71b14cd6?placeholderIfAbsent=true",
      full: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/73d2dbf0b84d36e89cbe74d0b6a0257b6aeef88b?placeholderIfAbsent=true",
    },
    {
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/583aed74a3a6e24a071070b2706f7efb16b81476?placeholderIfAbsent=true",
      full: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/73d2dbf0b84d36e89cbe74d0b6a0257b6aeef88b?placeholderIfAbsent=true",
    },
    {
      thumbnail: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4c5b37fe4afed7bd2d6fb31bb8f53e9ab33ef7f9?placeholderIfAbsent=true",
      full: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/73d2dbf0b84d36e89cbe74d0b6a0257b6aeef88b?placeholderIfAbsent=true",
    },
  ]}
/>
<div className="flex xl:hidden flex-col">
  <ProductInfo
    title="Transparent Bubble Balloon with Custom Sticker"
    stock={25}
    price={400}
    originalPrice={100}
    discount={25}
    countdownTime="4d 04h 25m 40s"
    description="Material: Premium Vinyl Material, Waterproof and Weatherproof, Strong Adhesive, Easy to Apply, Customizable Design, Residue Free Removal, Multiple Font and Color Options, Perfect for Balloons and Gifts, Versatile Use, Sleek and Professional Finish, Handcrafted Precision, Long Lasting Quality, Eco Friendly"
    tags={["Balloons", "Birthday", "Latex"]}
  />
</div>


        <ProductRatings />

        {/* Reviews */}
        <section className="flex flex-col justify-center items-center mt-10 w-full">
          <h2 className="text-2xl text-black">Reviews</h2>

          {/* Review Cards */}
          <div className="w-full mt-6 flex flex-col gap-6 ">
            {reviews.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>

          {/* Show More Button */}
          {!showMoreReviews && (
            <button
              onClick={() => setShowMoreReviews(true)}
              className="px-6 py-2 mt-6 text-base font-medium text-black bg-stone-50 rounded-full hover:bg-stone-100 transition-all"
            >
              Show more
            </button>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
