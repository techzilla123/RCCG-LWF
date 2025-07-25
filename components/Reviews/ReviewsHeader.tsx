"use client";
import React from "react";

export const ReviewsHeader: React.FC = () => {
  const handleSeeMoreClick = () => {
    window.open(
      "https://www.google.com/search?sca_esv=94df89eb67e77729&rlz=1C1CHBF_enUS1005US1005&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-EwZMQIiuXACltc_6I1gNeWHKRn0KPxhotV7Cwu3iTpVJ1ElOMUv-iuAdMOKLRkCitEQjn_EYic84GPy6XrAT00NqdNJpFGFC4pBBVIr-pHmd_FsrTA%3D%3D&q=PARTY+PLACE+and+Rentals+Reviews&sa=X&ved=2ahUKEwjNy5T1mtaOAxXzkyYFHV_wGQoQ0bkNegQIMBAE&biw=1920&bih=929&sei=IoeCaLb1A5u2qtsPyaWasQ4",
      "_blank"
    );
  };

  return (
    <header className="relative flex flex-col items-start w-full mb-4">
      <h1 className="text-4xl font-bold text-black">Reviews</h1>
      <p className="mt-1 text-gray-700 font-semibold">
        See what our customers are saying
      </p>
      <button
        onClick={handleSeeMoreClick}
        className="absolute top-0 right-0 px-4 py-1 text-sm font-medium bg-white rounded-full shadow hover:bg-gray-100 transition"
      >
        See more
      </button>
    </header>
  );
};
