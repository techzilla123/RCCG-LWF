import * as React from "react";

interface MinistryCardProps {
  image: string;
  title: string;
  description: string;
  altText?: string;
}

export const MinistryCard1: React.FC<MinistryCardProps> = ({
  image,
  title,
  description,
  altText = ""
}) => {
  return (
    <article className="flex flex-col flex-1 items-start bg-white rounded-lg shadow-sm h-[321px] max-sm:h-auto">
      <img
        src={image}
        alt={altText}
        className="object-cover w-full h-[140px] rounded-[8px_8px_0_0]"
      />
      <div className="flex flex-col flex-1 items-start px-4 py-6 w-full max-sm:px-4 max-sm:py-5">
        <div className="flex flex-col gap-6 items-start pb-4 w-full max-sm:gap-4">
          <header className="flex flex-col items-start w-full">
            <h2 className="w-full text-2xl font-bold leading-6 text-black max-md:text-xl max-sm:text-lg max-sm:leading-6">
              {title}
            </h2>
          </header>
          <div className="flex flex-col items-start w-full">
            <p className="w-full text-base leading-6 text-black max-md:text-sm max-md:leading-6 max-sm:text-sm max-sm:leading-5">
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
