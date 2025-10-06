import * as React from "react";

interface HeroDescriptionProps {
  children: React.ReactNode;
}

function HeroDescription({ children }: HeroDescriptionProps) {
  return (
    <div className="mt-5 text-base max-w-2xl leading-relaxed">
      <p>{children}</p>
    </div>
  );
}

export default HeroDescription;
