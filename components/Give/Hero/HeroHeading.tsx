import * as React from "react";

interface HeroHeadingProps {
  children: React.ReactNode;
}

function HeroHeading({ children }: HeroHeadingProps) {
  return (
    <h1 className="text-6xl font-extrabold leading-[64px] max-md:text-4xl max-md:leading-10">
      {children}
    </h1>
  );
}

export default HeroHeading;
