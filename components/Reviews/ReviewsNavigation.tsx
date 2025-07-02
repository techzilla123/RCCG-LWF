import React from "react";

interface ReviewsNavigationProps {
  prevIconUrl: string;
  nextIconUrl: string;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const ReviewsNavigation: React.FC<ReviewsNavigationProps> = ({
  prevIconUrl,
  nextIconUrl,
  onPrevClick,
  onNextClick,
}) => {
  return (
    <nav className="flex justify-center gap-4 mt-6">
      <button
        onClick={onPrevClick}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow"
        aria-label="Previous reviews"
      >
        <img src={prevIconUrl} alt="Previous" className="w-4 h-4" />
      </button>
      <button
        onClick={onNextClick}
        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow"
        aria-label="Next reviews"
      >
        <img src={nextIconUrl} alt="Next" className="w-4 h-4" />
      </button>
    </nav>
  );
};
