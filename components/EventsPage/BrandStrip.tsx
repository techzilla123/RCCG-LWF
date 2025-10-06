import * as React from "react";

export function BrandStrip() {
  return (
    <footer className="flex items-center justify-center w-full bg-slate-800/70 py-6 md:py-8">
      <img
        src="https://api.builder.io/api/v1/image/assets/d246cf715b99493b8c80af048d853869/375e1210268020180c6ab9aeaad9e24ea3b7b19b?placeholderIfAbsent=true"
        alt="Brand partners and sponsors"
        className="object-contain w-full max-w-[1000px] px-4"
      />
    </footer>
  );
}
