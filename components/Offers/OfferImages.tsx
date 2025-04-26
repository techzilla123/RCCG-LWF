import * as React from "react";

interface OfferImagesProps {
  firstImageUrl: string;
  secondImageUrl: string;
}

const OfferImages: React.FC<OfferImagesProps> = ({
  firstImageUrl,
  secondImageUrl,
}) => {
  return (
    <>
      {/* First image */}
      <img
        src={firstImageUrl}
        alt="Offer first image"
        className="object-contain self-stretch my-auto aspect-[1.13] min-w-60 w-[312px]"
      />

      {/* Second image with Subtract.svg as background */}
      <div className="relative flex items-center justify-center min-w-60 w-[293px] aspect-[0.81]">
        {/* Background image with 40% opacity */}
        <img
  src="/Subtract.svg"
  alt="Background decoration"
  className="absolute w-[600px] h-[600px] object-contain opacity-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
/>


        {/* Foreground image */}
        <img
          src={secondImageUrl}
          alt="Offer second image"
          className="relative z-10 object-contain w-full h-full"
        />
      </div>
    </>
  );
};

export default OfferImages;
