import React from "react";
import { StarRating } from "./StarRating";

interface ReviewCardProps {
  avatarUrl: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  starUrls: {
    filled: string;
    empty: string;
  };
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  avatarUrl,
  name,
  rating,
  review,
  date,
  starUrls,
}) => {
  return (
    <article className="flex items-start gap-4 p-6 bg-white rounded-2xl w-[400px] min-w-[400px] shadow-md">
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">{name}</h2>
          <StarRating rating={rating} starUrls={starUrls} />
        </div>
        <p className="mt-2 text-sm text-gray-800">{review}</p>
        <time className="mt-2 text-xs text-gray-500">{date}</time>
      </div>
    </article>
  );
};
