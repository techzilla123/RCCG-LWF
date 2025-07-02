import React from "react";

interface RatingProps {
  rating: number;
  reviews: number;
}

const Rating: React.FC<RatingProps> = ({ rating, reviews }) => {
  return (
    <div className="flex gap-1 items-center self-start">
      <span className="self-stretch my-auto text-sm font-medium tracking-normal leading-6 text-black">
        {rating}
      </span>
      <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4 rotate-[3.141592653589793rad]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true"
          alt="Star rating"
          className="object-contain self-stretch my-auto w-4 aspect-square"
        />
      </div>
      <span className="self-stretch my-auto text-sm tracking-normal leading-6 text-neutral-500">
        ({reviews})
      </span>
    </div>
  );
};

export default Rating;
