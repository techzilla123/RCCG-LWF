import * as React from "react";

interface ReviewCardProps {
  avatarUrl: string;
  name: string;
  rating: number;
  review: string;
  date: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  avatarUrl,
  name,
  rating,
  review,
  date,
}) => {
  return (
    <article className="flex overflow-hidden flex-wrap gap-6 px-10 py-6 w-full rounded-2xl bg-stone-50 max-md:px-5 max-md:max-w-full">
      <img
        src={avatarUrl}
        alt={`${name}'s avatar`}
        className="object-contain shrink-0 my-auto aspect-square rounded-[100px] w-[100px]"
      />
      <div className="flex flex-col flex-1 shrink justify-center basis-0 min-w-60 max-md:max-w-full">
        <div className="flex flex-wrap gap-2.5 items-center w-full max-md:max-w-full">
          <h3 className="self-stretch my-auto text-2xl font-semibold tracking-normal leading-7 text-black">
            {name}
          </h3>
          <div className="flex gap-1 items-center self-stretch my-auto">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex gap-2.5 justify-center items-center self-stretch my-auto w-4 rotate-[3.141592653589793rad]"
              >
                <img
                  src={i < rating ? "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/544c31ba36ee8fc60d58b0ba303f6b5e03fb1994?placeholderIfAbsent=true" : "https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/94f95729e43aa5b4b82847b69b8a8dfe07f0b2b3?placeholderIfAbsent=true"}
                  alt={i < rating ? "Full star" : "Empty star"}
                  className="object-contain self-stretch my-auto w-4 aspect-square"
                />
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-base tracking-normal leading-6 text-black max-md:max-w-full">
          {review}
        </p>
        <time className="mt-3 text-xs text-neutral-500 max-md:max-w-full">
          {date}
        </time>
      </div>
    </article>
  );
};
