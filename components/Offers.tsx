"use client";

import * as React from "react";
import ActionButton from "./Offers/ActionButton";
import OfferImages from "./Offers/OfferImages";

const Offers: React.FC = () => {
  const handleSignUp = () => {
    // Handle sign up action
    console.log("Sign up clicked");
  };

  return (
    <section className="flex overflow-hidden flex-col justify-center items-center self-stretch px-32 text-xl tracking-normal leading-8 text-center text-white bg-yellow-400 max-md:px-5">
      <div className="flex flex-wrap justify-center items-center pt-6 w-full max-w-[1400px] max-md:max-w-full">
        <OfferImages firstImageUrl="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/0c4b41de8c8c252dbff2a164b2f9552456f29dc4?placeholderIfAbsent=true" secondImageUrl="https://cdn.builder.io/api/v1/image/assets/8508077b32c64a2d81a17cc6a85ba436/4828825885b07851dceda276ef48021429ee70e6?placeholderIfAbsent=true" />
        <ActionButton onClick={handleSignUp}>Sign up now</ActionButton>
      </div>
    </section>
  );
};

export default Offers;
