"use client";

import * as React from "react";
import { OccasionGrid } from "./Occasions/OccasionGrid";

const Occasions: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col justify-center self-stretch p-10 bg-white max-md:px-5">
      <h2 className="self-center text-2xl text-black">
        Discover what fits every occasion
      </h2>
      <OccasionGrid />
    </section>
  );
};

export default Occasions;
