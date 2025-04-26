"use client";
import React, { useState } from "react";
import { ReviewsHeader } from "./Reviews/ReviewsHeader";
import { ReviewCard } from "./Reviews/ReviewCard";
import { ReviewsNavigation } from "./Reviews/ReviewsNavigation";

const reviewsData = [
  {
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/3bdd215ffeeda77df976fef6a422ea702734a5a5?placeholderIfAbsent=true",
    name: "Hannah Schmitt",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/3bdd215ffeeda77df976fef6a422ea702734a5a5?placeholderIfAbsent=true",
    name: "Hannah Schmitt",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/3bdd215ffeeda77df976fef6a422ea702734a5a5?placeholderIfAbsent=true",
    name: "John Maxwell",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f9fc1db9b3ce89e7743dc4fa14ca2b702b57b9cf?placeholderIfAbsent=true",
    name: "Cynthia Morgan",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f9fc1db9b3ce89e7743dc4fa14ca2b702b57b9cf?placeholderIfAbsent=true",
    name: "Hiroshima Jen",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/f9fc1db9b3ce89e7743dc4fa14ca2b702b57b9cf?placeholderIfAbsent=true",
    name: "Hiroshima Jen",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis",
    date: "May 8, 2020",
  },
];

const starUrls = {
  filled: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/05aaa6717b2a29b9e81e851ebfb186577c995aa4?placeholderIfAbsent=true",
  empty: "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/40fa4f1250509bf633465c5ef6634d816249bf6b?placeholderIfAbsent=true",
};

export const Reviews: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;

  const totalPages = Math.ceil(reviewsData.length / reviewsPerPage);
  const startIndex = currentPage * reviewsPerPage;
  const currentReviews = reviewsData.slice(startIndex, startIndex + reviewsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  return (
    <section className="relative w-full bg-blue-100 py-20 overflow-hidden">
      {/* Top-left SVG */}
      <img
        src="/Groups7.svg"
        alt=""
        className="absolute top-0 left-0 w-40 md:w-60 lg:w-72"
      />

      {/* Bottom-right SVG */}
      <img
        src="/Ornaments80.svg"
        alt=""
        className="absolute bottom-0 right-0 w-32 md:w-48 lg:w-56"
      />

      <div className="relative flex flex-col justify-center px-6 md:px-12 max-w-screen-xl mx-auto">
        <ReviewsHeader />

        <div className="flex justify-center gap-6 mt-8 w-full flex-nowrap">


          {currentReviews.map((review, index) => (
            <ReviewCard
              key={index}
              avatarUrl={review.avatarUrl}
              name={review.name}
              rating={review.rating}
              review={review.review}
              date={review.date}
              starUrls={starUrls}
            />
          ))}
        </div>

        <ReviewsNavigation
          prevIconUrl="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8fdee8c0654d5adfc1958ad9c26b7b69a44d1f29?placeholderIfAbsent=true"
          nextIconUrl="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0e545f12cda02d11dca9ca4809fa5f8de075dc30?placeholderIfAbsent=true"
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
        />
      </div>
    </section>
  );
};

export default Reviews;
