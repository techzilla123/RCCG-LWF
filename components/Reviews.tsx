"use client";
import React, { useState, useEffect } from "react";
import { ReviewsHeader } from "./Reviews/ReviewsHeader";
import { ReviewCard } from "./Reviews/ReviewCard";
import { ReviewsNavigation } from "./Reviews/ReviewsNavigation";

// --- Combined Reviews ---
const extraReviews = [
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjVjiGzVfZu40NzdlAuCoIuenM9XZDvGtbL0492V_bywOrJ2a2BBiw=w72-h72-p-rp-mo-br100",
    name: "Precious Boyd",
    rating: 5,
    review:
      "Party Place is my go to location to shop for any event my family is hosting! Whether it’s a baby shower, birthday or preparing for a football game I know I’ll find what I need with ease. The store owner Elizabeth is so friendly and greets all her customers with a warming smile. She even offers party rentals such as chairs, tables, linens. We needed to get some cute tea party settings for my baby girl’s first birthday and she had everything from the paper plates to balloon garlands. Party Place is literally a ONE STOP SHOP!!!",
    date: "2 years ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocLKStMkRSNs2R-qDDjIIWnAzJPBs9UKLwIs-RtbFkOpQatALg=w72-h72-p-rp-mo-br100",
    name: "Jeffrey Knight",
    rating: 5,
    review:
      "This store has everything you could need for a birthday party, very well priced and customer service was outstanding! Highly recommend this company! 5 stars all the way!!!",
    date: "1 year ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocJ-arRThT4ZFCLppqg_RruGFe6vqlyi094t7ivetexsg3oDFw=w72-h72-p-rp-mo-br100",
    name: "Chadric Jackson",
    rating: 5,
    review:
      "Love this place. They have everything you need for a party or event. Customer service is excellent. Very nice people. Also black owned. I highly recommend this place. Check them out for your next event or party.",
    date: "1 year ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXRoWFiSwsfw4xTY4o9CdKh4-e9kxH9xKwhf7NWmOXYUvtr16Ep=w72-h72-p-rp-mo-br100",
    name: "J Terrell",
    rating: 5,
    review:
      "Wow! Wow! Wow! Is all I can say! The store was clean + refreshing and the customer service was great! In comparison to other party stores, I am happy to say that the price for these three balloons was AFFORDABLE ($3.99 each)! I’m definitely coming back and you should too! Shoutout to Elizabeth for helping me with my purchase!",
    date: "1 year ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUUHwzKX-Z_n6gSz_UGQpqpyqUyODta4WUTFrnPxUY0eywTOX63bQ=w72-h72-p-rp-mo-br100",
    name: "Jamie Jackson",
    rating: 5,
    review: "I love this party place. Selection and customer service.",
    date: "5 days ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUn00K_PIDMe5W6SPCu6-Jf3Rvzr3EfWtIKeLpXMWpAbtpclgn4=w72-h72-p-rp-mo-br100",
    name: "Janet Alize Dickinson",
    rating: 5,
    review: "The staff is very friendly, and they have everything you need for your party!",
    date: "1 year ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjVt4pPQfY-WjRiJB5l8sPmiPoYUkv5OAdPRzDeO0k4rjfMkKMk=w72-h72-p-rp-mo-br100",
    name: "Kern Hagley",
    rating: 5,
    review:
      "Kay and his family helped me find everything I needed for a last minute photoshoot. Def will come back!",
    date: "1 week ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocLtoWKQg41MCKLnIYmGqqFtlqFn_D0PnfFt_Ar6vuUE-vZhIg=w72-h72-p-rp-mo-br100",
    name: "Roberto Meza",
    rating: 5,
    review: "Amazing customer service and gives good feedback. I will be coming back.",
    date: "5 days ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXIUZv8EmKNZtj7D9NT2FF161FhBDDkyI8WYuKyLa6Uj4qvpOQo=w72-h72-p-rp-mo-br100",
    name: "Malaika Murrell",
    rating: 5,
    review: "Great place and definitely great customer service! 10/10 would recommend.",
    date: "1 week ago",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocIef8Pl1fdeXw2DzDGDpxGtjvqES72ctuelOI0aecMGMzF5NQ=w72-h72-p-rp-mo-br100",
    name: "Candy",
    rating: 5,
    review:
      "Great service, reasonable prices, and great variety. They also have packages and balloon arches.",
    date: "1 year ago",
  },
];

// Original reviews array
const reviewsData = [
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjUW1eKVsfxuE0ByeyHK4Ll0VlUVu0vbijFQe2PqwNqxpzzwoFdP=w72-h72-p-rp-mo-ba3-br100",
    name: "Grace Chambers",
    rating: 5,
    review:
      "I have loved all the interactions I've had thru ordering tables and chairs from this store. Due to the heavy rain, I ended up having to postpone my event, and finally cancel our reservations. Through all of the inconveniences, Elizabeth has been wonderful in helping me out. She was understanding of the situation and gladly made a refund. I highly recommend this business just because they offer an amazing customer experience!",
    date: "25/04/2025",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXjygGdDpexKIPQDyYtxB8-PoeQZPlawK3_bWLSawlNqvJDA6akTA=w72-h72-p-rp-mo-ba3-br100",
    name: "Chakra Jam ..",
    rating: 5,
    review:
      "Family owned business who cares deeply about their customers. Elizabeth is such an empathic human who is always giving. God bless",
    date: "18/07/2025",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocI3HIjNKTJScxJyWooIhqqiq68_3Idx418SAHdDINrJTEDoig=w72-h72-p-rp-mo-br100",
    name: "Trisha Zaldana",
    rating: 5,
    review:
      "Elizabeth and her work is outstanding! She created a gorgeous balloon arch around a backdrop we already had and it turned out better than the inspiration pictures. Needless to say it was a hit at my sister's baby shower.",
    date: "25/10/2024",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocJe5G87zvpaIWDSWdqrQWJ8eOXGCvYuDyaWb64J4DEV1oEWrg=w72-h72-p-rp-mo-br100",
    name: "Jayden Jones",
    rating: 5,
    review:
      "I had a great experience here. The employers were kind and respectful. I had a great time.",
    date: "20/07/2025",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjWYLV1ZMPkSRWrf_ESxnY_onMbgSATTCQsIIbJcqDj1sraFCm0=w72-h72-p-rp-mo-br100",
    name: "Camilo Mba",
    rating: 5,
    review:
      "This the best place in the DFW to get all your party needs or your kids and adult parties as well. Got Mickey Mouse for my son and loved it.",
    date: "25/06/2025",
  },
  {
    avatarUrl:
      "https://lh3.googleusercontent.com/a/ACg8ocLay9h63B8tP-HEchLLBEEdAi-ckRCXBReCXYwqU5WW3i0Khw=w72-h72-p-rp-mo-br100",
    name: "Berenice Ambro..",
    rating: 5,
    review:
      "I love this store, you can find everything and they have good prices and the person who works there is a sweetheart Elizabeth 😍😍😍😍😍😍😍😍",
    date: "25/10/2024",
  },
];

// Merge all reviews
const mergedReviews = [...extraReviews, ...reviewsData];

const starUrls = {
  filled:
    "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/05aaa6717b2a29b9e81e851ebfb186577c995aa4",
  empty:
    "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/40fa4f1250509bf633465c5ef6634d816249bf6b",
};

export const Reviews: React.FC = () => {
  const [randomizedReviews, setRandomizedReviews] = useState<typeof mergedReviews>([]);

  useEffect(() => {
    // shuffle only on client to avoid hydration mismatch
    const shuffled = [...mergedReviews].sort(() => Math.random() - 0.5).slice(0, 6);
    setRandomizedReviews(shuffled);
  }, []);

  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(randomizedReviews.length / reviewsPerPage);
  const startIndex = currentPage * reviewsPerPage;
  const currentReviews = randomizedReviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <section className="relative w-full bg-blue-100 py-20 overflow-hidden">
      <img src="/Groups7.svg" alt="" className="absolute top-0 left-0 w-40 md:w-60 lg:w-72" />
      <img src="/Ornaments80.svg" alt="" className="absolute bottom-0 right-0 w-32 md:w-48 lg:w-56" />

      <div className="relative flex flex-col justify-center px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto">
        <ReviewsHeader />
        <div className="flex flex-wrap justify-center gap-6 mt-8 md:flex-nowrap md:w-full">
          {currentReviews.map((review) => (
            <ReviewCard
              key={review.name + review.date}
              avatarUrl={review.avatarUrl}
              name={review.name}
              rating={review.rating}
              review={review.review}
              date={review.date}
              starUrls={starUrls}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <ReviewsNavigation
            prevIconUrl="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/8fdee8c0654d5adfc1958ad9c26b7b69a44d1f29"
            nextIconUrl="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0e545f12cda02d11dca9ca4809fa5f8de075dc30"
            onPrevClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            onNextClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
