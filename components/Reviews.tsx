"use client";
import React, { useState } from "react";
import { ReviewsHeader } from "./Reviews/ReviewsHeader";
import { ReviewCard } from "./Reviews/ReviewCard";
import { ReviewsNavigation } from "./Reviews/ReviewsNavigation";

const reviewsData = [
  {
    avatarUrl: "https://lh3.googleusercontent.com/a-/ALV-UjUW1eKVsfxuE0ByeyHK4Ll0VlUVu0vbijFQe2PqwNqxpzzwoFdP=w72-h72-p-rp-mo-ba3-br100",
    name: "Grace Chambers",
    rating: 5,
    review:
      "I have loved all the interactions I've had thru ordering tables and chairs from this store. Due to the heavy rain, I ended up having to postpone my event, and finally cancel our reservations. Through all of the inconveniences, Elizabeth has been wonderful in helping me out. She was understanding of the situation and gladly made a refund. I highly recommend this business just because they offer an amazing customer experience!",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://lh3.googleusercontent.com/a-/ALV-UjXjygGdDpexKIPQDyYtxB8-PoeQZPlawK3_bWLSawlNqvJDA6akTA=w72-h72-p-rp-mo-ba3-br100",
    name: "Chakra Jam ..",
    rating: 5,
    review:
      "Family owned business who cares deeply about their customers. Elizabeth is such an empathic human who is always giving. God bless",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocI3HIjNKTJScxJyWooIhqqiq68_3Idx418SAHdDINrJTEDoig=w72-h72-p-rp-mo-br100",
    name: "Trisha Zaldana",
    rating: 5,
    review:
      "Elizabeth and her work is outstanding! She created a gorgeous balloon arch around a backdrop we already had and it turned out better than the inspiration pictures. Needless to say it was a bit at my sister's babyshower.",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocJe5G87zvpaIWDSWdqrQWJ8eOXGCvYuDyaWb64J4DEV1oEWrg=w72-h72-p-rp-mo-br100",
    name: "Jayden Jones",
    rating: 5,
    review:
      "I had a great experience here. The employers were kind and respectful. I had a great time",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://lh3.googleusercontent.com/a-/ALV-UjWYLV1ZMPkSRWrf_ESxnY_onMbgSATTCQsIIbJcqDj1sraFCm0=w72-h72-p-rp-mo-br100",
    name: "Camilo Mba",
    rating: 5,
    review:
      "This the best place in the DFW to get all your party needs or your kids and adult parties as well. Got Mickey Mouse for my son and loved it.",
    date: "May 8, 2020",
  },
  {
    avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocLay9h63B8tP-HEchLLBEEdAi-ckRCXBReCXYwqU5WW3i0Khw=w72-h72-p-rp-mo-br100",
    name: "Berenice Ambro..",
    rating: 5,
    review:
      "I love this store, you can find everything and they have good prices and the person who works there is a sweetheart Elizabeth 😍😍😍😍😍😍😍😍",
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
