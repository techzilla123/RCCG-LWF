"use client";
import * as React from "react";

interface RatingBarProps {
  rating: number;
  count: number;
  total: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ rating, count, total }) => (
  <div className="flex items-center w-full mb-2 last:mb-0">
    {/* Rating number and star */}
    <div className="flex gap-1 items-center w-20 shrink-0">
      <span className="text-sm font-medium text-black">{rating}</span>
      <div className="flex items-center rotate-180">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
          alt="Star"
          className="w-4 h-4"
        />
      </div>
      <span className="text-sm text-neutral-500">({count})</span>
    </div>

    {/* Background Bar */}
    <div className="flex-1 h-2 bg-stone-50 rounded-full ml-2 overflow-hidden">
      <div
        className="h-full bg-yellow-500 rounded-full"
        style={{ width: `${(count / total) * 100}%` }}
      />
    </div>
  </div>
);

export const ProductRatings: React.FC = () => {
  return (
    <section className="w-full mt-10">
      <div className="flex flex-col items-center w-full">
        {/* Ratings Title */}
        <h2 className="text-2xl text-black">Ratings</h2>

        {/* Average Rating */}
        <div className="flex flex-col items-center mt-4">
          <p className="text-7xl font-bold text-black leading-none max-md:text-5xl">4,5</p>

          {/* Stars */}
          <div className="flex gap-1 items-center pt-4 pb-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center rotate-180">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9281ad3c658331f9f093bb3a6f6187ae1c1e7ed2?placeholderIfAbsent=true"
                  alt="Full Star"
                  className="w-8 h-8"
                />
              </div>
            ))}
            <div className="flex items-center rotate-180">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/9ef8e0c139df68df04ab505a9e0a34cd16c7d105?placeholderIfAbsent=true"
                alt="Half Star"
                className="w-8 h-8"
              />
            </div>
          </div>

          {/* Total Reviews */}
          <p className="text-xl text-neutral-500 leading-8 text-center">
            27 total reviews
          </p>
        </div>

        {/* Rating Bars */}
        <div className="mt-6 w-80 max-w-full flex flex-col gap-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <RatingBar
              key={star}
              rating={star}
              count={
                star === 5 ? 28 :
                star === 4 ? 10 :
                star === 3 ? 8 :
                star === 2 ? 5 :
                2
              }
              total={27}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
