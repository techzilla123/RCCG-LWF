import React from "react";

interface StarRatingProps {
  rating: number;
  starUrls: {
    filled: string;
    empty: string;
  };
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, starUrls }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <img
          key={star}
          src={star <= rating ? starUrls.filled : starUrls.empty}
          alt={star <= rating ? "Filled star" : "Empty star"}
          className="w-4 h-4"
        />
      ))}
    </div>
  );
};
